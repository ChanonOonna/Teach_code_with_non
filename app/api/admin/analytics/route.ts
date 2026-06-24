import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";

const MONTH_LABELS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

export async function GET(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalUsers, usersThisMonth, usersLastMonth,
      totalEnrollments, enrollThisMonth, enrollLastMonth,
      completedEnrollments, totalQuizAttempts, quizThisMonth, quizLastMonth,
      topCourses, recentEnrollments, recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.user.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } } }),
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { enrolledAt: { gte: startOfMonth } } }),
      prisma.enrollment.count({ where: { enrolledAt: { gte: startOfLastMonth, lt: startOfMonth } } }),
      prisma.enrollment.count({ where: { status: "COMPLETED" } }),
      prisma.quizAttempt.count(),
      prisma.quizAttempt.count({ where: { startedAt: { gte: startOfMonth } } }),
      prisma.quizAttempt.count({ where: { startedAt: { gte: startOfLastMonth, lt: startOfMonth } } }),
      prisma.course.findMany({
        where: { isPublished: true },
        orderBy: { enrollments: { _count: "desc" } },
        take: 5,
        include: { _count: { select: { enrollments: true } } },
      }),
      prisma.enrollment.findMany({
        orderBy: { enrolledAt: "desc" },
        take: 3,
        include: { user: { select: { displayName: true, email: true } }, course: { select: { title: true } } },
      }),
      prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 2, select: { displayName: true, email: true, createdAt: true } }),
    ]);

    const completionRate = totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0;

    const pct = (curr: number, prev: number) => {
      if (prev === 0) return curr > 0 ? "+100%" : "0%";
      const p = Math.round(((curr - prev) / prev) * 100);
      return `${p >= 0 ? "+" : ""}${p}%`;
    };

    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const mStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const [enrollments, completions] = await Promise.all([
        prisma.enrollment.count({ where: { enrolledAt: { gte: mStart, lt: mEnd } } }),
        prisma.enrollment.count({ where: { completedAt: { gte: mStart, lt: mEnd } } }),
      ]);
      monthlyData.push({ month: MONTH_LABELS[mStart.getMonth()], enrollments, completions });
    }

    const recentActivity = [
      ...recentUsers.map(u => ({
        action: "ผู้ใช้ใหม่ลงทะเบียน",
        detail: u.email,
        time: formatDistanceToNow(u.createdAt, { addSuffix: true, locale: th }),
        color: "bg-green-500",
      })),
      ...recentEnrollments.map(e => ({
        action: `ลงทะเบียนเรียน ${e.course.title}`,
        detail: e.user.displayName,
        time: formatDistanceToNow(e.enrolledAt, { addSuffix: true, locale: th }),
        color: "bg-blue-500",
      })),
    ].slice(0, 5);

    return apiSuccess({
      stats: [
        { label: "ผู้ใช้ทั้งหมด", value: totalUsers.toLocaleString(), change: pct(usersThisMonth, usersLastMonth), positive: usersThisMonth >= usersLastMonth },
        { label: "การลงทะเบียน (เดือนนี้)", value: enrollThisMonth.toLocaleString(), change: pct(enrollThisMonth, enrollLastMonth), positive: enrollThisMonth >= enrollLastMonth },
        { label: "Quiz Attempts ทั้งหมด", value: totalQuizAttempts.toLocaleString(), change: pct(quizThisMonth, quizLastMonth), positive: quizThisMonth >= quizLastMonth },
        { label: "Completion Rate", value: `${completionRate}%`, change: "", positive: completionRate >= 30 },
      ],
      monthlyData,
      courseData: topCourses.map(c => ({ name: c.title.split(" ").slice(0, 2).join(" "), students: c._count.enrollments })),
      recentActivity,
    });
  } catch (err) {
    console.error("[ADMIN ANALYTICS]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
