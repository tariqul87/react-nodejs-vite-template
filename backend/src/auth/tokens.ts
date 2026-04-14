import crypto from "node:crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export type AccessTokenPayload = {
  sub: string;
  email: string;
  type: "access";
};

export type RefreshTokenPayload = {
  sub: string;
  tokenId: string;
  type: "refresh";
};

type JwtResult<T> = {
  token: string;
  payload: T;
};

function signToken<T extends object>(payload: T, secret: string, expiresIn: string): string {
  return jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
}

export function issueAccessToken(userId: string, email: string): JwtResult<AccessTokenPayload> {
  const payload: AccessTokenPayload = { sub: userId, email, type: "access" };
  return {
    token: signToken(payload, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES_IN),
    payload,
  };
}

export function issueRefreshToken(userId: string, tokenId = crypto.randomUUID()): JwtResult<RefreshTokenPayload> {
  const payload: RefreshTokenPayload = { sub: userId, tokenId, type: "refresh" };
  return {
    token: signToken(payload, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES_IN),
    payload,
  };
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function decodeTokenExpiry(token: string): Date {
  const decoded = jwt.decode(token, { json: true }) as { exp?: number } | null;
  if (!decoded?.exp) {
    throw new Error("Token does not contain exp claim");
  }

  return new Date(decoded.exp * 1000);
}
