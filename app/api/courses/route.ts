import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get("language");
    const level = searchParams.get("level");
    const featured = searchParams.get("featured");
    const q = searchParams.get("q");

    const where: Record<string, unknown> = { isPublished: true };
    if (language) where.language = language;
    if (level) where.level = level;
    if (featured === "true") where.isFeatured = true;
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { description: { contains: q } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
      include: { _count: { select: { enrollments: true } } },
    });

    return apiSuccess(courses);
  } catch (err) {
    console.error("[COURSES GET]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
