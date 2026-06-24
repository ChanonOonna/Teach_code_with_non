export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, CheckCircle2, XCircle } from "lucide-react";

export default async function AdminQuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      lesson: {
        include: { section: { include: { course: { select: { title: true, slug: true } } } } },
      },
      _count: { select: { questions: true, attempts: true } },
    },
  });

  const totalAttempts = quizzes.reduce((acc, q) => acc + q._count.attempts, 0);
  const totalQuestions = quizzes.reduce((acc, q) => acc + q._count.questions, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">จัดการ Quiz</h1>
        <p className="text-muted-foreground mt-1">Quiz ทั้งหมด {quizzes.length} ชุด</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Quiz ทั้งหมด", value: quizzes.length, icon: HelpCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "คำถามทั้งหมด", value: totalQuestions, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
          { label: "ครั้งที่ทำ", value: totalAttempts, icon: XCircle, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{s.value.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" /> รายการ Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {["Quiz", "บทเรียน", "คอร์ส", "คำถาม", "คะแนนผ่าน", "ครั้งที่ทำ", ""].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {quizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-sm">{quiz.title}</p>
                    </td>
                    <td className="py-3 px-4 text-sm">{quiz.lesson.title}</td>
                    <td className="py-3 px-4 text-sm">{quiz.lesson.section.course.title}</td>
                    <td className="py-3 px-4 text-sm">{quiz._count.questions}</td>
                    <td className="py-3 px-4">
                      <Badge variant={quiz.passingScore >= 70 ? "warning" : "success"}>
                        {quiz.passingScore}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{quiz._count.attempts.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <button className="text-xs text-primary hover:underline">แก้ไข</button>
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
