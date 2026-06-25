import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const lesson = await prisma.lesson.findUnique({ where: { id: params.id } });
    if (!lesson) return apiError("ไม่พบบทเรียน", 404);
    return apiSuccess(lesson);
  } catch (err) {
    console.error("[ADMIN LESSON GET]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const body = await req.json();
    const { title, content, videoUrl, duration, order, type, isPublished, isFree } = body;
    const updated = await prisma.lesson.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(duration !== undefined && { duration: Number(duration) }),
        ...(order !== undefined && { order: Number(order) }),
        ...(type !== undefined && { type }),
        ...(isPublished !== undefined && { isPublished }),
        ...(isFree !== undefined && { isFree }),
      },
    });
    return apiSuccess(updated);
  } catch (err) {
    console.error("[ADMIN LESSON PATCH]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    await prisma.lesson.delete({ where: { id: params.id } });
    return apiSuccess({ deleted: true });
  } catch (err) {
    console.error("[ADMIN LESSON DELETE]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
