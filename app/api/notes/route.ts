import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { noteSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const body = await req.json();
    const parsed = noteSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 400);

    const { lessonId, content } = parsed.data;
    const note = await prisma.note.upsert({
      where: { id: `${user.id}_${lessonId}` },
      update: { content },
      create: { userId: user.id, lessonId, content },
    });
    return apiSuccess(note, "บันทึกโน้ตแล้ว", 201);
  } catch {
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
