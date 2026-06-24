import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const courses = await prisma.course.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { enrollments: true, sections: true } } },
    });
    return apiSuccess(courses);
  } catch (err) {
    console.error("[ADMIN COURSES LIST]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
