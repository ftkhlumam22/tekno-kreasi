import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production";
const TOKEN_EXPIRY = "7d";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function createToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function setAuthCookie(res: NextApiResponse, token: string) {
  const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  };
  res.setHeader("Set-Cookie", serialize("auth_token", token, cookieOptions));
}

export function clearAuthCookie(res: NextApiResponse) {
  const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  };
  res.setHeader("Set-Cookie", serialize("auth_token", "", cookieOptions));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
