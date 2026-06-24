import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const [
      enrollments,
      lessonProgress,
      quizAttempts,
      achievements,
    ] = await Promise.all([
      prisma.enrollment.findMany({ where: { userId: user.id } }),
      prisma.lessonProgress.findMany({ where: { userId: user.id, isCompleted: true } }),
      prisma.quizAttempt.findMany({ where: { userId: user.id, completedAt: { not: null } } }),
      prisma.userAchievement.findMany({
        where: { userId: user.id },
        include: { achievement: true },
        orderBy: { earnedAt: "desc" },
      }),
    ]);

    const completedCourses = enrollments.filter((e) => e.status === "COMPLETED").length;
    const inProgressCourses = enrollments.filter((e) => e.status === "ACTIVE").length;
    const totalTimeSpent = lessonProgress.reduce((acc, p) => acc + p.timeSpent, 0);
    const totalQuizzesTaken = quizAttempts.length;
    const avgQuizScore = quizAttempts.length > 0
      ? quizAttempts.reduce((acc, a) => acc + a.score, 0) / quizAttempts.length
      : 0;
    const totalPoints = achievements.reduce((acc, ua) => acc + ua.achievement.points, 0);

    // Weekly progress (last 7 days)
    const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
    const today = new Date();
    const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      const dayStr = days[d.getDay()];
      const completedThatDay = lessonProgress.filter((p) => {
        if (!p.completedAt) return false;
        const pDate = new Date(p.completedAt);
        return pDate.toDateString() === d.toDateString();
      }).length;
      return { day: dayStr, lessonsCompleted: completedThatDay, timeSpent: 0 };
    });

    return apiSuccess({
      totalCourses: enrollments.length,
      completedCourses,
      inProgressCourses,
      totalLessonsCompleted: lessonProgress.length,
      totalQuizzesTaken,
      averageQuizScore: avgQuizScore,
      totalTimeSpent,
      streakDays: 0,
      totalPoints,
      achievements,
      recentActivity: [],
      weeklyProgress,
    });
  } catch (err) {
    console.error("[USER STATS]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
