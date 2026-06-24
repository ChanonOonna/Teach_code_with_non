export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Users } from "lucide-react";
import Link from "next/link";

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: "มือใหม่",
  INTERMEDIATE: "ปานกลาง",
  ADVANCED: "ขั้นสูง",
};

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: { select: { enrollments: true, sections: true } },
    },
  });

  const published = courses.filter((c) => c.isPublished).length;
  const totalEnrollments = courses.reduce((acc, c) => acc + c._count.enrollments, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">จัดการคอร์ส</h1>
          <p className="text-muted-foreground mt-1">
            คอร์สทั้งหมด {courses.length} คอร์ส (เผยแพร่แล้ว {published} คอร์ส)
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Plus className="h-4 w-4" /> เพิ่มคอร์ส
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{courses.length}</div>
              <div className="text-xs text-muted-foreground">คอร์สทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{published}</div>
              <div className="text-xs text-muted-foreground">เผยแพร่แล้ว</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalEnrollments.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">การลงทะเบียนรวม</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> รายการคอร์ส
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {["#", "คอร์ส", "ระดับ", "Sections", "บทเรียน", "ผู้เรียน", "สถานะ", ""].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-muted-foreground">{course.order}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-sm">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.language}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">
                        {LEVEL_LABELS[course.level] ?? course.level}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{course._count.sections}</td>
                    <td className="py-3 px-4 text-sm">{course.totalLessons}</td>
                    <td className="py-3 px-4 text-sm font-medium">{course._count.enrollments.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant={course.isPublished ? "success" : "secondary"}>
                        {course.isPublished ? "เผยแพร่" : "ร่าง"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link href={`/courses/${course.slug}`}>
                          <Button variant="ghost" size="sm">ดู</Button>
                        </Link>
                        <Button variant="outline" size="sm">แก้ไข</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
