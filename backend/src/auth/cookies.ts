import type { Response } from "express";
import { env } from "../config/env";
import { decodeTokenExpiry } from "./tokens";

export const REFRESH_COOKIE_PATH = "/api/auth";
export const REFRESH_COOKIE_NAME = env.REFRESH_COOKIE_NAME;

export function setRefreshCookie(res: Response, refreshToken: string) {
  const expiresAt = decodeTokenExpiry(refreshToken);
  const maxAge = Math.max(0, expiresAt.getTime() - Date.now());
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: REFRESH_COOKIE_PATH,
    maxAge,
  });
}

export function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    path: REFRESH_COOKIE_PATH,
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
