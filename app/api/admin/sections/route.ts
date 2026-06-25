import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  const courseId = req.nextUrl.searchParams.get("courseId");
  if (!courseId) return apiError("courseId is required", 400);
  try {
    const sections = await prisma.section.findMany({
      where: { courseId },
      orderBy: { order: "asc" },
      include: { _count: { select: { lessons: true } } },
    });
    return apiSuccess(sections);
  } catch (err) {
    console.error("[ADMIN SECTIONS GET]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const body = await req.json();
    const { courseId, title, description, order } = body;
    if (!courseId || !title?.trim()) return apiError("กรุณากรอก courseId และชื่อ Section", 400);
    const section = await prisma.section.create({
      data: {
        courseId,
        title: title.trim(),
        description: description || null,
        order: Number(order) || 0,
      },
      include: { _count: { select: { lessons: true } } },
    });
    return apiSuccess(section);
  } catch (err) {
    console.error("[ADMIN SECTION CREATE]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
