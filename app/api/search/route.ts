import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    if (!q || q.length < 1) return apiError("กรุณาพิมพ์คำค้นหา", 400);

    const [courses, lessons] = await Promise.all([
      prisma.course.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 10,
        include: { _count: { select: { enrollments: true } } },
      }),
      prisma.lesson.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: q } },
            { content: { contains: q } },
          ],
        },
        take: 10,
        include: {
          section: { include: { course: { select: { title: true, slug: true } } } },
        },
      }),
    ]);

    return apiSuccess({
      courses,
      lessons,
      total: courses.length + lessons.length,
    });
  } catch (err) {
    console.error("[SEARCH]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
