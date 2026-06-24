import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import {
  hashPassword, generateAccessToken, generateRefreshToken, setAuthCookies,
} from "@/lib/auth";
import { registerSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.errors[0].message, 400);
    }

    const { email, username, displayName, password } = parsed.data;

    const [existingEmail, existingUsername] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.user.findUnique({ where: { username } }),
    ]);

    if (existingEmail) return apiError("อีเมลนี้ถูกใช้งานแล้ว", 400);
    if (existingUsername) return apiError("ชื่อผู้ใช้นี้ถูกใช้งานแล้ว", 400);

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, username, displayName, passwordHash, role: "STUDENT" },
      select: {
        id: true, email: true, username: true, displayName: true,
        avatar: true, bio: true, role: true, isActive: true,
        emailVerified: true, createdAt: true, updatedAt: true,
      },
    });

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    setAuthCookies(accessToken, refreshToken);

    return apiSuccess({ user, accessToken }, "สมัครสมาชิกสำเร็จ", 201);
  } catch (err) {
    console.error("[REGISTER]", err);
    return apiError("เกิดข้อผิดพลาดในการสมัครสมาชิก", 500);
  }
}
