import { type NextFunction, type Request, type Response } from "express";
import { verifyAccessToken } from "./tokens";

export type AuthenticatedRequest = Request & {
  auth?: {
    userId: string;
    email: string;
  };
};

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorization = req.header("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Missing bearer token" });
  }

  try {
    const payload = verifyAccessToken(token);
    if (payload.type !== "access") {
      return res.status(401).json({ message: "Invalid access token type" });
    }

    req.auth = {
      userId: payload.sub,
      email: payload.email,
    };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
}
