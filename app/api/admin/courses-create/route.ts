import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const body = await req.json();
    const { title, slug, description, language, level, estimatedHours } = body;
    if (!title || !slug || !language || !level) return apiError("กรุณากรอกข้อมูลให้ครบ", 400);
    const exists = await prisma.course.findUnique({ where: { slug } });
    if (exists) return apiError("slug นี้มีอยู่แล้ว", 409);
    const maxOrder = await prisma.course.aggregate({ _max: { order: true } });
    const course = await prisma.course.create({
      data: {
        title, slug, description: description ?? "", language, level,
        estimatedHours: estimatedHours ?? 0,
        order: (maxOrder._max.order ?? 0) + 1,
        isPublished: false,
      },
      include: { _count: { select: { enrollments: true, sections: true } } },
    });
    return apiSuccess(course);
  } catch (err) {
    console.error("[ADMIN COURSES CREATE]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
