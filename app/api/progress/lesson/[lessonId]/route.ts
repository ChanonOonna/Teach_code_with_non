import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest, { params }: { params: { lessonId: string } }) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const body = await req.json();
    const { isCompleted = true, timeSpent = 0 } = body;

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId: params.lessonId } },
      update: {
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
        timeSpent: { increment: timeSpent },
      },
      create: {
        userId: user.id,
        lessonId: params.lessonId,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
        timeSpent,
      },
    });

    // Update course enrollment progress
    const lesson = await prisma.lesson.findUnique({
      where: { id: params.lessonId },
      include: { section: { include: { course: true } } },
    });

    if (lesson) {
      const courseId = lesson.section.course.id;
      const totalLessons = await prisma.lesson.count({
        where: { section: { courseId }, isPublished: true },
      });
      const completedLessons = await prisma.lessonProgress.count({
        where: {
          userId: user.id,
          isCompleted: true,
          lesson: { section: { courseId } },
        },
      });
      const progressPct = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

      await prisma.enrollment.updateMany({
        where: { userId: user.id, courseId },
        data: {
          progress: progressPct,
          status: progressPct === 100 ? "COMPLETED" : "ACTIVE",
          completedAt: progressPct === 100 ? new Date() : null,
        },
      });
    }

    return apiSuccess(progress);
  } catch (err) {
    console.error("[LESSON PROGRESS]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
