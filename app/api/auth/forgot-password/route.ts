import { NextRequest } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/utils";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email("อีเมลไม่ถูกต้อง"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 400);

    const { email } = parsed.data;

    // Delete old tokens for this email
    await prisma.passwordReset.deleteMany({ where: { email } });

    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });

    // Always return success to prevent email enumeration
    if (!user) {
      return apiSuccess(null, "หากอีเมลนี้มีในระบบ คุณจะได้รับลิงก์รีเซ็ตรหัสผ่าน");
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordReset.create({
      data: { email, token, expiresAt },
    });

    // In production: send email with reset link
    // For demo: log the token (visible in dev server console)
    const resetUrl = `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/reset-password?token=${token}`;
    console.log(`[RESET PASSWORD] ${email} → ${resetUrl}`);

    return apiSuccess({ resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined }, "หากอีเมลนี้มีในระบบ คุณจะได้รับลิงก์รีเซ็ตรหัสผ่าน");
  } catch (err) {
    console.error("[FORGOT_PASSWORD]", err);
    return apiError("เกิดข้อผิดพลาด กรุณาลองใหม่", 500);
  }
}
