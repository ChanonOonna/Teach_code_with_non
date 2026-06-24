import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError(error ?? "Unauthorized", 401);

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));
  const search = searchParams.get("q") ?? "";

  const where = search
    ? {
        role: "STUDENT" as const,
        OR: [
          { displayName: { contains: search } },
          { email: { contains: search } },
          { username: { contains: search } },
        ],
      }
    : { role: "STUDENT" as const };

  const [students, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        displayName: true,
        email: true,
        username: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        enrollments: {
          orderBy: { enrolledAt: "desc" },
          select: {
            id: true,
            progress: true,
            status: true,
            enrolledAt: true,
            completedAt: true,
            course: { select: { id: true, title: true, slug: true, language: true, totalLessons: true } },
          },
        },
        lessonProgress: {
          where: { isCompleted: true },
          select: { completedAt: true },
          orderBy: { completedAt: "desc" },
          take: 1,
        },
        _count: {
          select: { enrollments: true, lessonProgress: true, quizAttempts: true },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const stats = await prisma.$transaction([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.enrollment.count(),
    prisma.enrollment.count({ where: { status: "COMPLETED" } }),
    prisma.lessonProgress.count({ where: { isCompleted: true } }),
  ]);

  return apiSuccess({
    students: students.map(s => ({
      ...s,
      lastActive: s.lessonProgress[0]?.completedAt ?? null,
      lessonProgress: undefined,
    })),
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    stats: {
      totalStudents: stats[0],
      totalEnrollments: stats[1],
      completedCourses: stats[2],
      completedLessons: stats[3],
    },
  });
}
