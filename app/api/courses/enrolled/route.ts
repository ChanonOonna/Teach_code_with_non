import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: { course: true },
      orderBy: { enrolledAt: "desc" },
    });
    return apiSuccess(enrollments);
  } catch (err) {
    console.error("[ENROLLED COURSES]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
