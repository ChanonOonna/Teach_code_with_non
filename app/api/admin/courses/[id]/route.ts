import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const body = await req.json();
    const { title, slug, description, language, level, estimatedHours, isPublished } = body;
    const updated = await prisma.course.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(language !== undefined && { language }),
        ...(level !== undefined && { level }),
        ...(estimatedHours !== undefined && { estimatedHours }),
        ...(isPublished !== undefined && { isPublished }),
      },
      include: { _count: { select: { enrollments: true, sections: true } } },
    });
    return apiSuccess(updated);
  } catch (err) {
    console.error("[ADMIN COURSE PATCH]", err);
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
    await prisma.course.delete({ where: { id: params.id } });
    return apiSuccess({ deleted: true });
  } catch (err) {
    console.error("[ADMIN COURSE DELETE]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
