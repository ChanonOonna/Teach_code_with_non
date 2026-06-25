"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HelpCircle, CheckCircle2, XCircle, Pencil, Trash2, X, Save, AlertTriangle, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/hooks/useAuthStore";

interface AdminQuiz {
  id: string;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimit: number | null;
  _count: { questions: number; attempts: number };
  lesson: { title: string; section: { course: { title: string; slug: string } } };
}

interface LessonOption {
  id: string;
  title: string;
  section: { title: string; course: { title: string } };
}

const emptyCreate = {
  lessonId: "",
  title: "",
  description: "",
  passingScore: 70,
  timeLimit: "" as string | number,
};

export default function AdminQuizzesPage() {
  const { accessToken } = useAuthStore();
  const [quizzes, setQuizzes] = useState<AdminQuiz[]>([]);
  const [lessons, setLessons] = useState<LessonOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminQuiz | null>(null);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState(emptyCreate);
  const [deleteConfirm, setDeleteConfirm] = useState<AdminQuiz | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const headers = { Authorization: `Bearer ${accessToken}` };

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/quizzes-list", { headers }).then(r => r.json()),
      fetch("/api/admin/lessons-list", { headers }).then(r => r.json()),
    ]).then(([qd, ld]) => {
      if (qd.success) setQuizzes(qd.data);
      if (ld.success) setLessons(ld.data);
    }).finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const totalAttempts = quizzes.reduce((acc, q) => acc + q._count.attempts, 0);
  const totalQuestions = quizzes.reduce((acc, q) => acc + q._count.questions, 0);

  const saveQuiz = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/quizzes/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          title: editing.title,
          description: editing.description,
          passingScore: editing.passingScore,
          timeLimit: editing.timeLimit,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setQuizzes(prev => prev.map(q => q.id === editing.id ? { ...q, ...editing } : q));
        setEditing(null);
        toast.success("บันทึกแล้ว");
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  const createQuiz = async () => {
    if (!createForm.lessonId || !createForm.title.trim()) {
      toast.error("กรุณาเลือกบทเรียนและกรอกชื่อ Quiz");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          lessonId: createForm.lessonId,
          title: createForm.title.trim(),
          description: createForm.description || null,
          passingScore: Number(createForm.passingScore) || 70,
          timeLimit: createForm.timeLimit ? Number(createForm.timeLimit) : null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setQuizzes(prev => [data.data, ...prev]);
        setCreating(false);
        setCreateForm(emptyCreate);
        toast.success("สร้าง Quiz แล้ว");
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  const deleteQuiz = async () => {
    if (!deleteConfirm) return;
    setDeleting(deleteConfirm.id);
    try {
      const res = await fetch(`/api/admin/quizzes/${deleteConfirm.id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (data.success) {
        setQuizzes(prev => prev.filter(q => q.id !== deleteConfirm.id));
        toast.success("ลบ Quiz แล้ว");
        setDeleteConfirm(null);
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">จัดการ Quiz</h1>
          <p className="text-muted-foreground mt-1">Quiz ทั้งหมด {quizzes.length} ชุด</p>
        </div>
        <Button variant="gradient" onClick={() => setCreating(true)} className="gap-2">
          <Plus className="h-4 w-4" /> สร้าง Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Quiz ทั้งหมด", value: quizzes.length, icon: HelpCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "คำถามทั้งหมด", value: totalQuestions, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
          { label: "ครั้งที่ทำ", value: totalAttempts, icon: XCircle, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
        ].map(s => (
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
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">กำลังโหลด...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    {["Quiz", "บทเรียน", "คอร์ส", "คำถาม", "คะแนนผ่าน", "ครั้งที่ทำ", ""].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {quizzes.map(quiz => (
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
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => setEditing(quiz)} title="แก้ไข">
                            <Pencil className="h-4 w-4 text-primary" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setDeleteConfirm(quiz)}
                            disabled={deleting === quiz.id}
                            title="ลบ"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Modal */}
      {creating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-xl w-full max-w-md space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">สร้าง Quiz ใหม่</h2>
              <Button variant="ghost" size="icon-sm" onClick={() => { setCreating(false); setCreateForm(emptyCreate); }}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">บทเรียน <span className="text-destructive">*</span></label>
                <select
                  value={createForm.lessonId}
                  onChange={e => setCreateForm(f => ({ ...f, lessonId: e.target.value }))}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">— เลือกบทเรียน —</option>
                  {lessons.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.section.course.title} › {l.section.title} › {l.title}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="ชื่อ Quiz *"
                value={createForm.title}
                onChange={e => setCreateForm(f => ({ ...f, title: e.target.value }))}
                placeholder="เช่น Quiz: Variables and Data Types"
              />

              <Input
                label="คำอธิบาย (ถ้ามี)"
                value={createForm.description}
                onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))}
                placeholder="อธิบายเนื้อหาที่ทดสอบ..."
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="คะแนนผ่าน (%)"
                  type="number"
                  min={0}
                  max={100}
                  value={createForm.passingScore}
                  onChange={e => setCreateForm(f => ({ ...f, passingScore: Number(e.target.value) }))}
                />
                <Input
                  label="เวลา (นาที, ว่าง = ไม่จำกัด)"
                  type="number"
                  min={0}
                  value={createForm.timeLimit}
                  onChange={e => setCreateForm(f => ({ ...f, timeLimit: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" onClick={() => { setCreating(false); setCreateForm(emptyCreate); }}>ยกเลิก</Button>
              <Button variant="gradient" onClick={createQuiz} disabled={saving} className="gap-2">
                <Plus className="h-4 w-4" /> {saving ? "กำลังสร้าง..." : "สร้าง Quiz"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h2 className="font-semibold text-base">ยืนยันการลบ Quiz</h2>
                <p className="text-sm text-muted-foreground">การกระทำนี้ไม่สามารถยกเลิกได้</p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg px-4 py-3 text-sm">
              <p className="font-medium">{deleteConfirm.title}</p>
              <p className="text-muted-foreground text-xs">{deleteConfirm.lesson.section.course.title} · {deleteConfirm._count.questions} คำถาม</p>
            </div>
            <div className="flex gap-2 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)} disabled={!!deleting}>
                ยกเลิก
              </Button>
              <Button variant="destructive" className="flex-1" onClick={deleteQuiz} disabled={!!deleting}>
                {deleting ? "กำลังลบ..." : "ลบ Quiz"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-xl w-full max-w-md space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">แก้ไข Quiz</h2>
              <Button variant="ghost" size="icon-sm" onClick={() => setEditing(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <Input
                label="ชื่อ Quiz"
                value={editing.title}
                onChange={e => setEditing({ ...editing, title: e.target.value })}
              />
              <Input
                label="คำอธิบาย (ถ้ามี)"
                value={editing.description ?? ""}
                onChange={e => setEditing({ ...editing, description: e.target.value || null })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="คะแนนผ่าน (%)"
                  type="number"
                  min={0}
                  max={100}
                  value={editing.passingScore}
                  onChange={e => setEditing({ ...editing, passingScore: Number(e.target.value) })}
                />
                <Input
                  label="เวลา (นาที, ว่าง = ไม่จำกัด)"
                  type="number"
                  min={0}
                  value={editing.timeLimit ?? ""}
                  onChange={e => setEditing({ ...editing, timeLimit: e.target.value ? Number(e.target.value) : null })}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button>
              <Button variant="gradient" onClick={saveQuiz} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" /> {saving ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
