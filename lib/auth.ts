import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { prisma } from "./db";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateAccessToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "30d" } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export function getTokenFromHeader(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}

export function getTokenFromCookie(): string | null {
  try {
    const cookieStore = cookies();
    return (cookieStore as unknown as { get: (name: string) => { value: string } | undefined }).get("access_token")?.value ?? null;
  } catch {
    return null;
  }
}

export async function getCurrentUser(req?: NextRequest) {
  let token: string | null = null;

  if (req) {
    token = getTokenFromHeader(req);
    if (!token) {
      token = req.cookies.get("access_token")?.value ?? null;
    }
  } else {
    token = getTokenFromCookie();
  }

  if (!token) return null;

  const payload = verifyAccessToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId, isActive: true },
    select: {
      id: true,
      email: true,
      username: true,
      displayName: true,
      avatar: true,
      bio: true,
      role: true,
      isActive: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

export async function requireAuth(req: NextRequest) {
  const user = await getCurrentUser(req);
  if (!user) {
    return { user: null, error: "Unauthorized" };
  }
  return { user, error: null };
}

export async function requireAdmin(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return { user: null, error: "Unauthorized" };
  if (user.role !== "ADMIN") return { user: null, error: "Forbidden" };
  return { user, error: null };
}

export function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();
  const store = cookieStore as unknown as { set: (name: string, value: string, options: object) => void };

  store.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  store.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export function clearAuthCookies() {
  const cookieStore = cookies();
  const store = cookieStore as unknown as { set: (name: string, value: string, options: object) => void };
  store.set("access_token", "", { maxAge: 0, path: "/" });
  store.set("refresh_token", "", { maxAge: 0, path: "/" });
}
