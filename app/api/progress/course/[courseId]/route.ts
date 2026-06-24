import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: { courseId: string } }) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiSuccess([]);

  try {
    const progress = await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        lesson: { section: { courseId: params.courseId } },
      },
      select: {
        lessonId: true,
        isCompleted: true,
        completedAt: true,
        timeSpent: true,
      },
    });
    return apiSuccess(progress);
  } catch {
    return apiSuccess([]);
  }
}
