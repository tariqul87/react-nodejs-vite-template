import express, { type Request, type Response } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "../../db/client";
import { hashPassword, verifyPassword } from "../../auth/password";
import {
  decodeTokenExpiry,
  hashToken,
  issueAccessToken,
  issueRefreshToken,
  verifyRefreshToken,
} from "../../auth/tokens";
import { requireAuth, type AuthenticatedRequest } from "../../auth/middleware";
import { clearRefreshCookie, REFRESH_COOKIE_NAME, setRefreshCookie } from "../../auth/cookies";
import { authLoginLimiter, authRefreshLimiter, authSignupLimiter } from "../../middleware/rateLimitAuth";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(1).max(80).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SessionUser = { id: string; email: string; displayName: string | null };

type TokenPair = {
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
};

function sendSession(res: Response, status: number, pair: TokenPair) {
  setRefreshCookie(res, pair.refreshToken);
  return res.status(status).json({
    accessToken: pair.accessToken,
    user: pair.user,
  });
}

async function createTokenPair(
  user: SessionUser,
  context: { userAgent?: string; ipAddress?: string },
): Promise<TokenPair> {
  const access = issueAccessToken(user.id, user.email);
  const refresh = issueRefreshToken(user.id);

  await prisma.refreshSession.create({
    data: {
      userId: user.id,
      tokenId: refresh.payload.tokenId,
      tokenHash: hashToken(refresh.token),
      expiresAt: decodeTokenExpiry(refresh.token),
      userAgent: context.userAgent,
      ipAddress: context.ipAddress,
    },
  });

  return {
    accessToken: access.token,
    refreshToken: refresh.token,
    user,
  };
}

function readRefreshFromRequest(req: Request): string | undefined {
  const raw = req.cookies?.[REFRESH_COOKIE_NAME];
  return typeof raw === "string" && raw.length > 0 ? raw : undefined;
}

const authRouter = express.Router();

authRouter.post("/signup", authSignupLimiter, async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid signup payload", errors: parsed.error.flatten() });
  }

  const { email, password, displayName } = parsed.data;
  try {
    const createdUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: await hashPassword(password),
        displayName,
      },
      select: {
        id: true,
        email: true,
        displayName: true,
      },
    });

    const tokenPair = await createTokenPair(createdUser, {
      userAgent: req.header("user-agent"),
      ipAddress: req.ip,
    });
    return sendSession(res, 201, tokenPair);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Failed to create account" });
  }
});

authRouter.post("/login", authLoginLimiter, async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid login payload", errors: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const tokenPair = await createTokenPair(
    {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
    },
    { userAgent: req.header("user-agent"), ipAddress: req.ip },
  );

  return sendSession(res, 200, tokenPair);
});

authRouter.post("/refresh", authRefreshLimiter, async (req: Request, res: Response) => {
  const refreshToken = readRefreshFromRequest(req);
  if (!refreshToken) {
    return res.status(401).json({ message: "Missing refresh session" });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    if (payload.type !== "refresh") {
      clearRefreshCookie(res);
      return res.status(401).json({ message: "Invalid refresh token type" });
    }

    const existingSession = await prisma.refreshSession.findUnique({
      where: { tokenId: payload.tokenId },
      include: { user: true },
    });

    if (!existingSession || existingSession.revokedAt || existingSession.expiresAt <= new Date()) {
      clearRefreshCookie(res);
      return res.status(401).json({ message: "Refresh token is no longer valid" });
    }

    if (existingSession.tokenHash !== hashToken(refreshToken)) {
      clearRefreshCookie(res);
      return res.status(401).json({ message: "Refresh token mismatch" });
    }

    const nextRefresh = issueRefreshToken(existingSession.userId);
    await prisma.$transaction([
      prisma.refreshSession.update({
        where: { id: existingSession.id },
        data: {
          revokedAt: new Date(),
          replacedByTokenId: nextRefresh.payload.tokenId,
        },
      }),
      prisma.refreshSession.create({
        data: {
          userId: existingSession.userId,
          tokenId: nextRefresh.payload.tokenId,
          tokenHash: hashToken(nextRefresh.token),
          expiresAt: decodeTokenExpiry(nextRefresh.token),
          userAgent: req.header("user-agent"),
          ipAddress: req.ip,
        },
      }),
    ]);

    const nextAccess = issueAccessToken(existingSession.user.id, existingSession.user.email);
    return sendSession(res, 200, {
      accessToken: nextAccess.token,
      refreshToken: nextRefresh.token,
      user: {
        id: existingSession.user.id,
        email: existingSession.user.email,
        displayName: existingSession.user.displayName,
      },
    });
  } catch {
    clearRefreshCookie(res);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
});

authRouter.post("/logout", async (req: Request, res: Response) => {
  const refreshToken = readRefreshFromRequest(req);
  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      await prisma.refreshSession.updateMany({
        where: {
          tokenId: payload.tokenId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });
    } catch {
      // Still clear cookie client-side.
    }
  }

  clearRefreshCookie(res);
  return res.status(204).send();
});

authRouter.get("/me", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.auth?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, displayName: true },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user });
});

authRouter.get("/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.auth?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      displayName: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user });
});

export default authRouter;
