import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: { lessonId: string } }) {
  const { user } = await requireAuth(req);
  if (!user) return apiSuccess(null);

  try {
    const note = await prisma.note.findFirst({
      where: { userId: user.id, lessonId: params.lessonId },
    });
    return apiSuccess(note);
  } catch {
    return apiSuccess(null);
  }
}

export async function PUT(req: NextRequest, { params }: { params: { lessonId: string } }) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const { content } = await req.json();
    const note = await prisma.note.updateMany({
      where: { id: params.lessonId, userId: user.id },
      data: { content },
    });
    return apiSuccess(note);
  } catch {
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { lessonId: string } }) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    await prisma.note.deleteMany({
      where: { id: params.lessonId, userId: user.id },
    });
    return apiSuccess(null, "ลบโน้ตแล้ว");
  } catch {
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
