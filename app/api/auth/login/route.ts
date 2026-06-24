import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import {
  verifyPassword, generateAccessToken, generateRefreshToken, setAuthCookies,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 400);

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true, email: true, username: true, displayName: true,
        avatar: true, bio: true, role: true, isActive: true,
        emailVerified: true, passwordHash: true, createdAt: true, updatedAt: true,
      },
    });

    if (!user || !user.isActive) return apiError("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 401);

    if (!user.passwordHash) return apiError("บัญชีนี้ใช้ Google Login กรุณาเข้าสู่ระบบด้วย Google", 401);

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) return apiError("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 401);

    const { passwordHash: _, ...safeUser } = user;

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.upsert({
      where: { token: refreshToken },
      update: { expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
      create: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    setAuthCookies(accessToken, refreshToken);

    // บันทึก login history
    await prisma.loginHistory.create({
      data: {
        userId: user.id,
        method: "password",
        ip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown",
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    return apiSuccess({ user: safeUser, accessToken }, "เข้าสู่ระบบสำเร็จ");
  } catch (err) {
    console.error("[LOGIN]", err);
    return apiError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", 500);
  }
}
