import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, clearAuthCookies, getTokenFromHeader } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { user } = await requireAuth(req);
    if (user) {
      await prisma.refreshToken.deleteMany({ where: { userId: user.id } });
    }
    clearAuthCookies();
    return apiSuccess(null, "ออกจากระบบสำเร็จ");
  } catch (err) {
    console.error("[LOGOUT]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
