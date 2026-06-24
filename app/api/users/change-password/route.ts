import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { changePasswordSchema } from "@/lib/validations";
import { apiError, apiSuccess } from "@/lib/utils";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const body = await req.json();
    const parsed = changePasswordSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const { currentPassword, newPassword } = parsed.data;

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) return apiError("User not found", 404);

    if (!dbUser.passwordHash) return apiError("บัญชีนี้ใช้ Google Login ไม่สามารถเปลี่ยนรหัสผ่านได้", 400);
    const valid = await bcrypt.compare(currentPassword, dbUser.passwordHash);
    if (!valid) return apiError("รหัสผ่านปัจจุบันไม่ถูกต้อง", 400);

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashed },
    });

    // Revoke all refresh tokens to force re-login on other devices
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

    return apiSuccess({ message: "เปลี่ยนรหัสผ่านสำเร็จ" });
  } catch (e) {
    console.error(e);
    return apiError("Server error", 500);
  }
}
