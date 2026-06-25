import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return `${base}-${Date.now().toString(36)}`;
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const body = await req.json();
    const { sectionId, title, content, type, duration, order, videoUrl, isFree, isPublished } = body;
    if (!sectionId || !title?.trim()) return apiError("กรุณากรอก sectionId และชื่อบทเรียน", 400);

    const slug = generateSlug(title.trim());
    const lesson = await prisma.lesson.create({
      data: {
        sectionId,
        slug,
        title: title.trim(),
        content: content ?? "",
        type: type ?? "TEXT",
        duration: Number(duration) || 0,
        order: Number(order) || 0,
        videoUrl: videoUrl || null,
        isFree: isFree ?? false,
        isPublished: isPublished ?? false,
      },
      include: {
        section: { include: { course: { select: { title: true, slug: true } } } },
        _count: { select: { progress: true, codeExamples: true } },
      },
    });
    return apiSuccess(lesson);
  } catch (err) {
    console.error("[ADMIN LESSON CREATE]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
