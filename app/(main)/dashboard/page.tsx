"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen, CheckCircle2, Trophy, Flame, Clock,
  TrendingUp, Star, ArrowRight, Target, BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/hooks/useAuthStore";
import { formatTimeSpent, formatDate } from "@/lib/utils";
import type { DashboardStats, Enrollment } from "@/types";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function DashboardPage() {
  const { user, accessToken } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    Promise.all([
      fetch("/api/users/stats", { headers: { Authorization: `Bearer ${accessToken}` } }).then(r => r.json()),
      fetch("/api/courses/enrolled", { headers: { Authorization: `Bearer ${accessToken}` } }).then(r => r.json()),
    ]).then(([statsData, enrollData]) => {
      if (statsData.success) setStats(statsData.data);
      if (enrollData.success) setEnrollments(enrollData.data ?? []);
    }).finally(() => setLoading(false));
  }, [accessToken]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h2>
        <Button variant="gradient" asChild>
          <Link href="/login">เข้าสู่ระบบ</Link>
        </Button>
      </div>
    );
  }

  const statCards = [
    {
      title: "คอร์สที่เรียนอยู่", value: stats?.inProgressCourses ?? 0,
      icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "คอร์สที่เรียนจบ", value: stats?.completedCourses ?? 0,
      icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "บทเรียนที่เสร็จ", value: stats?.totalLessonsCompleted ?? 0,
      icon: Star, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "เวลาเรียนรวม", value: stats ? formatTimeSpent(stats.totalTimeSpent) : "0h",
      icon: Clock, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Dashboard Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-violet-500/5 border-b">
        <div className="absolute inset-0 dot-pattern opacity-20 dark:opacity-10" />
        <div className="container mx-auto px-4 py-10 relative max-w-6xl">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-muted-foreground mb-1">แดชบอร์ด</p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                สวัสดี, <span className="brand-gradient-text">{user.displayName}</span>!
              </h1>
              <p className="text-muted-foreground mt-1.5">ติดตามความก้าวหน้าและเริ่มเรียนได้เลย</p>
            </div>
            {stats && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{stats.streakDays}</div>
                    <div className="text-xs text-muted-foreground leading-none">Day Streak</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-violet-500/10 border border-violet-500/20">
                  <Trophy className="h-5 w-5 text-violet-500" />
                  <div>
                    <div className="text-xl font-bold text-violet-600 dark:text-violet-400">{stats.totalPoints.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground leading-none">คะแนน</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    <div className="container mx-auto px-4 py-8 max-w-6xl">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
          : statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-5">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.title}</div>
              </CardContent>
            </Card>
          ))
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* In Progress Courses */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" /> คอร์สที่กำลังเรียน
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
                </div>
              ) : enrollments.filter(e => e.status === "ACTIVE" && e.progress < 100).length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">ยังไม่ได้ลงทะเบียนคอร์สไหน</p>
                  <Button variant="gradient" size="sm" className="mt-3" asChild>
                    <Link href="/courses">ดูคอร์สทั้งหมด</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments
                    .filter(e => e.status === "ACTIVE" && e.progress < 100)
                    .slice(0, 5)
                    .map((enrollment) => (
                      <div key={enrollment.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 brand-gradient rounded-lg flex items-center justify-center shrink-0">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/courses/${enrollment.course?.slug}`}
                            className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
                          >
                            {enrollment.course?.title ?? "คอร์ส"}
                          </Link>
                          <div className="mt-1.5">
                            <Progress value={enrollment.progress} className="h-1.5" />
                            <span className="text-xs text-muted-foreground mt-0.5 block">
                              {Math.round(enrollment.progress)}% เสร็จแล้ว
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon-sm" asChild>
                          <Link href={`/courses/${enrollment.course?.slug}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Progress Chart */}
          {stats?.weeklyProgress && stats.weeklyProgress.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" /> ความก้าวหน้ารายสัปดาห์
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={stats.weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="lessonsCompleted" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="บทเรียน" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-yellow-500" /> Achievements ล่าสุด
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 rounded-lg" />)}
                </div>
              ) : !stats?.achievements?.length ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  ยังไม่มี Achievement ลองเรียนบทแรกดูสิ!
                </p>
              ) : (
                <div className="space-y-3">
                  {stats.achievements.slice(0, 5).map((ua) => (
                    <div key={ua.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <span className="text-2xl shrink-0">{ua.achievement.icon}</span>
                      <div className="min-w-0">
                        <div className="font-medium text-sm line-clamp-1">{ua.achievement.name}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(ua.earnedAt)}</div>
                      </div>
                      <Badge variant="warning" className="shrink-0 text-[10px]">
                        +{ua.achievement.points}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quiz Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-green-500" /> สถิติ Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Quiz ที่ทำ</span>
                <span className="font-bold">{stats?.totalQuizzesTaken ?? 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">คะแนนเฉลี่ย</span>
                <span className="font-bold text-green-500">
                  {stats ? `${Math.round(stats.averageQuizScore)}%` : "0%"}
                </span>
              </div>
              {stats && (
                <Progress
                  value={stats.averageQuizScore}
                  color={stats.averageQuizScore >= 70 ? "success" : "warning"}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
}
