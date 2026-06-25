import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const body = await req.json();
    const { lessonId, title, description, passingScore, timeLimit } = body;
    if (!lessonId || !title?.trim()) return apiError("กรุณากรอก lessonId และชื่อ Quiz", 400);

    const quiz = await prisma.quiz.create({
      data: {
        lessonId,
        title: title.trim(),
        description: description || null,
        passingScore: Number(passingScore) || 70,
        timeLimit: timeLimit ? Number(timeLimit) : null,
      },
      include: {
        lesson: {
          include: { section: { include: { course: { select: { title: true, slug: true } } } } },
        },
        _count: { select: { questions: true, attempts: true } },
      },
    });
    return apiSuccess(quiz);
  } catch (err) {
    console.error("[ADMIN QUIZ CREATE]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
