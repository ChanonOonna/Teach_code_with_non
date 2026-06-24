import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const course = await prisma.course.findUnique({ where: { id: params.id, isPublished: true } });
    if (!course) return apiError("ไม่พบคอร์ส", 404);

    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: params.id } },
    });
    if (existing) return apiSuccess(existing, "ลงทะเบียนแล้ว");

    const enrollment = await prisma.enrollment.create({
      data: { userId: user.id, courseId: params.id },
    });

    return apiSuccess(enrollment, "ลงทะเบียนเรียนสำเร็จ", 201);
  } catch (err) {
    console.error("[ENROLL]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
