export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, CheckCircle2, TrendingUp, GraduationCap } from "lucide-react";

async function getAdminStats() {
  const [totalUsers, totalCourses, totalLessons, totalEnrollments, recentUsers, topCourses] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.lesson.count(),
    prisma.enrollment.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, displayName: true, email: true, role: true, createdAt: true },
    }),
    prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { enrollments: { _count: "desc" } },
      take: 5,
      include: { _count: { select: { enrollments: true } } },
    }),
  ]);

  return { totalUsers, totalCourses, totalLessons, totalEnrollments, recentUsers, topCourses };
}

export default async function AdminPage() {
  const stats = await getAdminStats();

  const statCards = [
    { title: "ผู้ใช้ทั้งหมด", value: stats.totalUsers, icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "คอร์สทั้งหมด", value: stats.totalCourses, icon: BookOpen, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
    { title: "บทเรียนทั้งหมด", value: stats.totalLessons, icon: CheckCircle2, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { title: "การลงทะเบียนทั้งหมด", value: stats.totalEnrollments, icon: GraduationCap, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">ภาพรวมของแพลตฟอร์ม TeachCode</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-5">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" /> ผู้ใช้ล่าสุด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    user.role === "ADMIN" ? "bg-red-100 text-red-600" :
                    user.role === "INSTRUCTOR" ? "bg-blue-100 text-blue-600" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" /> คอร์สยอดนิยม
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topCourses.map((course, idx) => (
                <div key={course.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                  <span className="w-6 h-6 rounded-full bg-muted text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.language}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    {course._count.enrollments}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
