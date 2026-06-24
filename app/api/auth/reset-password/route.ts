import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  token: z.string().min(1, "Token ไม่ถูกต้อง"),
  password: z
    .string()
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
    .regex(/[A-Z]/, "รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
    .regex(/[0-9]/, "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 400);

    const { token, password } = parsed.data;

    const reset = await prisma.passwordReset.findUnique({ where: { token } });

    if (!reset || reset.used) {
      return apiError("ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุแล้ว", 400);
    }

    if (reset.expiresAt < new Date()) {
      await prisma.passwordReset.delete({ where: { token } });
      return apiError("ลิงก์รีเซ็ตรหัสผ่านหมดอายุแล้ว กรุณาขอใหม่", 400);
    }

    const passwordHash = await hashPassword(password);

    await prisma.$transaction([
      prisma.user.update({
        where: { email: reset.email },
        data: { passwordHash },
      }),
      prisma.passwordReset.update({
        where: { token },
        data: { used: true },
      }),
      // Revoke all refresh tokens
      prisma.refreshToken.deleteMany({
        where: { user: { email: reset.email } },
      }),
    ]);

    return apiSuccess(null, "เปลี่ยนรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบใหม่");
  } catch (err) {
    console.error("[RESET_PASSWORD]", err);
    return apiError("เกิดข้อผิดพลาด กรุณาลองใหม่", 500);
  }
}

// Verify token validity (GET)
export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) return apiError("ไม่มี token", 400);

  const reset = await prisma.passwordReset.findUnique({ where: { token } });

  if (!reset || reset.used || reset.expiresAt < new Date()) {
    return apiError("ลิงก์ไม่ถูกต้องหรือหมดอายุแล้ว", 400);
  }

  return apiSuccess({ email: reset.email }, "Token ถูกต้อง");
}
