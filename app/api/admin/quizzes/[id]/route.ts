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
    const { title, description, passingScore, timeLimit } = body;
    const updated = await prisma.quiz.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(passingScore !== undefined && { passingScore: Number(passingScore) }),
        ...(timeLimit !== undefined && { timeLimit: timeLimit === null ? null : Number(timeLimit) }),
      },
    });
    return apiSuccess(updated);
  } catch (err) {
    console.error("[ADMIN QUIZ PATCH]", err);
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
    await prisma.quiz.delete({ where: { id: params.id } });
    return apiSuccess({ deleted: true });
  } catch (err) {
    console.error("[ADMIN QUIZ DELETE]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
