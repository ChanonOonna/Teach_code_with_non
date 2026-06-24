export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Lock, Unlock } from "lucide-react";
import Link from "next/link";

export default async function AdminLessonsPage() {
  const lessons = await prisma.lesson.findMany({
    orderBy: [{ section: { course: { order: "asc" } } }, { order: "asc" }],
    include: {
      section: { include: { course: { select: { title: true, slug: true } } } },
      _count: { select: { progress: true, codeExamples: true } },
    },
    take: 100,
  });

  const typeLabel: Record<string, string> = {
    TEXT: "บทความ",
    VIDEO: "วิดีโอ",
    INTERACTIVE: "Interactive",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">จัดการบทเรียน</h1>
          <p className="text-muted-foreground mt-1">บทเรียนทั้งหมด {lessons.length} บท</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> รายการบทเรียน
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {["บทเรียน", "คอร์ส", "ประเภท", "ระยะเวลา", "Code Examples", "ผู้เรียนผ่านแล้ว", "สถานะ", ""].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-sm">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.section.title}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Link href={`/courses/${lesson.section.course.slug}`} className="hover:text-primary transition-colors">
                        {lesson.section.course.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">{typeLabel[lesson.type] ?? lesson.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" /> {lesson.duration}m
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{lesson._count.codeExamples}</td>
                    <td className="py-3 px-4 text-sm">{lesson._count.progress.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {lesson.isFree ? (
                          <Badge variant="success" className="gap-1"><Unlock className="h-3 w-3" />ฟรี</Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1"><Lock className="h-3 w-3" />พรีเมียม</Badge>
                        )}
                        {!lesson.isPublished && <Badge variant="outline">ร่าง</Badge>}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">แก้ไข</Button>
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
