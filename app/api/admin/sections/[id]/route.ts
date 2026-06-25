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
    const { title, description, order } = body;
    const updated = await prisma.section.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order: Number(order) }),
      },
      include: { _count: { select: { lessons: true } } },
    });
    return apiSuccess(updated);
  } catch (err) {
    console.error("[ADMIN SECTION PATCH]", err);
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
    await prisma.section.delete({ where: { id: params.id } });
    return apiSuccess({ deleted: true });
  } catch (err) {
    console.error("[ADMIN SECTION DELETE]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
