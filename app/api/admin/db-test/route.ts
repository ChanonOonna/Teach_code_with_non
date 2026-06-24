import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    await prisma.$queryRaw`SELECT 1`;
    const [userCount, courseCount, enrollCount] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.enrollment.count(),
    ]);
    return apiSuccess({ ok: true, userCount, courseCount, enrollCount });
  } catch (err) {
    console.error("[DB TEST]", err);
    return apiError("ไม่สามารถเชื่อมต่อฐานข้อมูลได้", 500);
  }
}
