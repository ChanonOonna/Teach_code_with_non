"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Users, BookOpen, Trophy, GraduationCap, Search, ChevronDown, ChevronUp, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Enrollment {
  id: string;
  progress: number;
  status: string;
  enrolledAt: string;
  completedAt: string | null;
  course: { id: string; title: string; slug: string; language: string; totalLessons: number };
}

interface Student {
  id: string;
  displayName: string;
  email: string;
  username: string;
  avatar: string | null;
  isActive: boolean;
  createdAt: string;
  lastActive: string | null;
  enrollments: Enrollment[];
  _count: { enrollments: number; lessonProgress: number; quizAttempts: number };
}

interface Stats {
  totalStudents: number;
  totalEnrollments: number;
  completedCourses: number;
  completedLessons: number;
}

const LANG_COLORS: Record<string, string> = {
  JAVASCRIPT: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  PYTHON: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  TYPESCRIPT: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  REACT: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  DEVOPS: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  GENERAL: "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300",
};

function ProgressBar({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  const color = pct === 100 ? "bg-green-500" : pct >= 50 ? "bg-blue-500" : "bg-amber-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium w-8 text-right">{pct}%</span>
    </div>
  );
}

export default function AdminStudentsPage() {
  const { accessToken } = useAuthStore();
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("q", search);
    fetch(`/api/admin/student-progress?${params}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setStudents(data.data.students);
          setStats(data.data.stats);
          setTotalPages(data.data.pagination.totalPages);
          setTotal(data.data.pagination.total);
        }
      })
      .finally(() => setLoading(false));
  }, [accessToken, page, search, refreshKey]);

  const handleSearch = () => { setSearch(searchInput); setPage(1); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ความก้าวหน้าของนักเรียน</h1>
          <p className="text-muted-foreground mt-1">ติดตามว่าแต่ละคนเรียนไปถึงไหนแล้ว</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setRefreshKey(k => k + 1)}>
          <RefreshCw className="h-4 w-4" /> รีเฟรช
        </Button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "นักเรียนทั้งหมด", value: stats.totalStudents, icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "การลงทะเบียน", value: stats.totalEnrollments, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
            { label: "คอร์สที่เสร็จแล้ว", value: stats.completedCourses, icon: Trophy, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
            { label: "บทเรียนที่เรียนแล้ว", value: stats.completedLessons, icon: GraduationCap, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center shrink-0`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <div className="text-xl font-bold">{s.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาชื่อ อีเมล หรือ username..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              className="pl-9"
            />
          </div>
          <Button onClick={handleSearch}>ค้นหา</Button>
          {search && (
            <Button variant="outline" onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }}>ล้าง</Button>
          )}
          <span className="text-sm text-muted-foreground self-center ml-auto whitespace-nowrap">{total.toLocaleString()} คน</span>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" /> รายชื่อนักเรียน
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">กำลังโหลด...</div>
          ) : students.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">ไม่พบนักเรียน</div>
          ) : (
            <div className="divide-y divide-border">
              {students.map(student => (
                <div key={student.id}>
                  {/* Student row */}
                  <div
                    className="flex items-center gap-4 p-4 hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => setExpanded(expanded === student.id ? null : student.id)}
                  >
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={student.avatar ?? ""} />
                      <AvatarFallback className="brand-gradient text-white text-sm font-bold">
                        {student.displayName.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm truncate">{student.displayName}</p>
                        {!student.isActive && <Badge variant="destructive" className="text-xs">ถูกระงับ</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-6 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary">{student._count.enrollments}</div>
                        <div className="text-[10px] text-muted-foreground">คอร์ส</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{student._count.lessonProgress}</div>
                        <div className="text-[10px] text-muted-foreground">บทเรียน</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-amber-600">{student._count.quizAttempts}</div>
                        <div className="text-[10px] text-muted-foreground">Quiz</div>
                      </div>
                    </div>

                    {/* Last active */}
                    <div className="hidden md:block text-right">
                      {student.lastActive ? (
                        <p className="text-xs text-muted-foreground">
                          เรียนล่าสุด<br />
                          {formatDistanceToNow(new Date(student.lastActive), { addSuffix: true, locale: th })}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">ยังไม่เริ่มเรียน</p>
                      )}
                    </div>

                    <div className="text-muted-foreground shrink-0">
                      {expanded === student.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </div>

                  {/* Expanded: course details */}
                  {expanded === student.id && (
                    <div className="px-4 pb-4 bg-muted/20 border-t">
                      {student.enrollments.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-3">ยังไม่ได้ลงทะเบียนคอร์สใด</p>
                      ) : (
                        <div className="pt-3 space-y-3">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">คอร์สที่ลงทะเบียน ({student.enrollments.length})</p>
                          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                            {student.enrollments.map(en => (
                              <div key={en.id} className="bg-background rounded-lg border p-3 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm font-medium leading-tight line-clamp-2">{en.course.title}</p>
                                  {en.status === "COMPLETED" ? (
                                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 shrink-0 text-[10px]">
                                      <Trophy className="h-3 w-3 mr-1" /> เสร็จแล้ว
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary" className="shrink-0 text-[10px]">กำลังเรียน</Badge>
                                  )}
                                </div>
                                <ProgressBar value={en.progress} />
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className={cn("text-[10px]", LANG_COLORS[en.course.language] ?? "")}>
                                    {en.course.language}
                                  </Badge>
                                  <span className="text-[10px] text-muted-foreground">
                                    ลงทะเบียน {formatDistanceToNow(new Date(en.enrolledAt), { addSuffix: true, locale: th })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">หน้า {page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
