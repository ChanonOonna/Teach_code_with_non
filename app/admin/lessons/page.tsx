"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Clock, Lock, Unlock, Pencil, Trash2, X, Save, AlertTriangle, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/hooks/useAuthStore";

interface AdminLesson {
  id: string;
  title: string;
  type: string;
  duration: number;
  order: number;
  isPublished: boolean;
  isFree: boolean;
  videoUrl: string | null;
  _count: { progress: number; codeExamples: number };
  section: { title: string; course: { title: string; slug: string } };
}

interface Section {
  id: string;
  title: string;
  course: { id: string; title: string };
}

interface EditState extends AdminLesson {
  content: string;
}

const LESSON_TYPES = ["TEXT", "VIDEO", "INTERACTIVE", "PROJECT"] as const;
const typeLabel: Record<string, string> = { TEXT: "บทความ", VIDEO: "วิดีโอ", INTERACTIVE: "Interactive", PROJECT: "Project" };

const emptyCreate = {
  sectionId: "",
  title: "",
  content: "",
  type: "TEXT" as string,
  duration: 0,
  order: 0,
  videoUrl: "",
  isFree: false,
  isPublished: false,
};

export default function AdminLessonsPage() {
  const { accessToken } = useAuthStore();
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EditState | null>(null);
  const [editContentLoading, setEditContentLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState(emptyCreate);
  const [deleteConfirm, setDeleteConfirm] = useState<AdminLesson | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const headers = { Authorization: `Bearer ${accessToken}` };

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/lessons-list", { headers }).then(r => r.json()),
      fetch("/api/admin/sections-list", { headers }).then(r => r.json()),
    ]).then(([ld, sd]) => {
      if (ld.success) setLessons(ld.data);
      if (sd.success) setSections(sd.data);
    }).finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const openEdit = async (lesson: AdminLesson) => {
    setEditing({ ...lesson, content: "" });
    setEditContentLoading(true);
    try {
      const res = await fetch(`/api/admin/lessons/${lesson.id}`, { headers });
      const data = await res.json();
      if (data.success) setEditing(prev => prev ? { ...prev, content: data.data.content ?? "" } : prev);
    } catch {
      // content stays empty — still editable
    } finally {
      setEditContentLoading(false);
    }
  };

  const saveLesson = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/lessons/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          title: editing.title,
          content: editing.content,
          videoUrl: editing.videoUrl,
          duration: editing.duration,
          order: editing.order,
          type: editing.type,
          isPublished: editing.isPublished,
          isFree: editing.isFree,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLessons(prev => prev.map(l => l.id === editing.id ? { ...l, ...editing } : l));
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

  const createLesson = async () => {
    if (!createForm.sectionId || !createForm.title.trim()) {
      toast.error("กรุณาเลือก Section และกรอกชื่อบทเรียน");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          ...createForm,
          videoUrl: createForm.videoUrl || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLessons(prev => [data.data, ...prev]);
        setCreating(false);
        setCreateForm(emptyCreate);
        toast.success("สร้างบทเรียนแล้ว");
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  const deleteLesson = async () => {
    if (!deleteConfirm) return;
    setDeleting(deleteConfirm.id);
    try {
      const res = await fetch(`/api/admin/lessons/${deleteConfirm.id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (data.success) {
        setLessons(prev => prev.filter(l => l.id !== deleteConfirm.id));
        toast.success("ลบบทเรียนแล้ว");
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
          <h1 className="text-3xl font-bold">จัดการบทเรียน</h1>
          <p className="text-muted-foreground mt-1">บทเรียนทั้งหมด {lessons.length} บท</p>
        </div>
        <Button variant="gradient" onClick={() => setCreating(true)} className="gap-2">
          <Plus className="h-4 w-4" /> สร้างบทเรียน
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> รายการบทเรียน
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
                    {["บทเรียน", "คอร์ส", "ประเภท", "ระยะเวลา", "Code Examples", "ผู้เรียนผ่านแล้ว", "สถานะ", ""].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {lessons.map(lesson => (
                    <tr key={lesson.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-sm">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">{lesson.section.title}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{lesson.section.course.title}</td>
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
                          {lesson.isFree
                            ? <Badge variant="success" className="gap-1"><Unlock className="h-3 w-3" />ฟรี</Badge>
                            : <Badge variant="secondary" className="gap-1"><Lock className="h-3 w-3" />พรีเมียม</Badge>}
                          {!lesson.isPublished && <Badge variant="outline">ร่าง</Badge>}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => openEdit(lesson)} title="แก้ไข">
                            <Pencil className="h-4 w-4 text-primary" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setDeleteConfirm(lesson)}
                            disabled={deleting === lesson.id}
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
          <div className="bg-background rounded-xl shadow-xl w-full max-w-2xl space-y-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">สร้างบทเรียนใหม่</h2>
              <Button variant="ghost" size="icon-sm" onClick={() => { setCreating(false); setCreateForm(emptyCreate); }}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Section <span className="text-destructive">*</span></label>
                <select
                  value={createForm.sectionId}
                  onChange={e => setCreateForm(f => ({ ...f, sectionId: e.target.value }))}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">— เลือก Section —</option>
                  {sections.map(s => (
                    <option key={s.id} value={s.id}>{s.course.title} › {s.title}</option>
                  ))}
                </select>
              </div>

              <Input
                label="ชื่อบทเรียน *"
                value={createForm.title}
                onChange={e => setCreateForm(f => ({ ...f, title: e.target.value }))}
                placeholder="เช่น Introduction to Variables"
              />

              <div className="space-y-1.5">
                <label className="text-sm font-medium">ประเภทบทเรียน</label>
                <select
                  value={createForm.type}
                  onChange={e => setCreateForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {LESSON_TYPES.map(t => <option key={t} value={t}>{typeLabel[t]}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">เนื้อหาบทเรียน (Markdown)</label>
                <textarea
                  value={createForm.content}
                  onChange={e => setCreateForm(f => ({ ...f, content: e.target.value }))}
                  rows={10}
                  placeholder="เขียนเนื้อหาบทเรียนในรูปแบบ Markdown..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                />
              </div>

              <Input
                label="Video URL (ถ้ามี)"
                value={createForm.videoUrl}
                onChange={e => setCreateForm(f => ({ ...f, videoUrl: e.target.value }))}
                placeholder="https://youtube.com/..."
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="ระยะเวลา (นาที)"
                  type="number"
                  min={0}
                  value={createForm.duration}
                  onChange={e => setCreateForm(f => ({ ...f, duration: Number(e.target.value) }))}
                />
                <Input
                  label="ลำดับ"
                  type="number"
                  min={0}
                  value={createForm.order}
                  onChange={e => setCreateForm(f => ({ ...f, order: Number(e.target.value) }))}
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={createForm.isFree}
                    onChange={e => setCreateForm(f => ({ ...f, isFree: e.target.checked }))}
                    className="rounded"
                  />
                  บทเรียนฟรี
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={createForm.isPublished}
                    onChange={e => setCreateForm(f => ({ ...f, isPublished: e.target.checked }))}
                    className="rounded"
                  />
                  เผยแพร่ทันที
                </label>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" onClick={() => { setCreating(false); setCreateForm(emptyCreate); }}>ยกเลิก</Button>
              <Button variant="gradient" onClick={createLesson} disabled={saving} className="gap-2">
                <Plus className="h-4 w-4" /> {saving ? "กำลังสร้าง..." : "สร้างบทเรียน"}
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
                <h2 className="font-semibold text-base">ยืนยันการลบบทเรียน</h2>
                <p className="text-sm text-muted-foreground">การกระทำนี้ไม่สามารถยกเลิกได้</p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg px-4 py-3 text-sm">
              <p className="font-medium">{deleteConfirm.title}</p>
              <p className="text-muted-foreground text-xs">{deleteConfirm.section.course.title} · {deleteConfirm.section.title}</p>
            </div>
            <div className="flex gap-2 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)} disabled={!!deleting}>
                ยกเลิก
              </Button>
              <Button variant="destructive" className="flex-1" onClick={deleteLesson} disabled={!!deleting}>
                {deleting ? "กำลังลบ..." : "ลบบทเรียน"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-xl w-full max-w-2xl space-y-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">แก้ไขบทเรียน</h2>
              <Button variant="ghost" size="icon-sm" onClick={() => setEditing(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <Input
                label="ชื่อบทเรียน"
                value={editing.title}
                onChange={e => setEditing({ ...editing, title: e.target.value })}
              />

              <div className="space-y-1.5">
                <label className="text-sm font-medium">ประเภทบทเรียน</label>
                <select
                  value={editing.type}
                  onChange={e => setEditing({ ...editing, type: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {LESSON_TYPES.map(t => <option key={t} value={t}>{typeLabel[t]}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">เนื้อหาบทเรียน (Markdown)</label>
                {editContentLoading ? (
                  <div className="w-full h-48 rounded-md border border-input bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
                    กำลังโหลดเนื้อหา...
                  </div>
                ) : (
                  <textarea
                    value={editing.content}
                    onChange={e => setEditing({ ...editing, content: e.target.value })}
                    rows={12}
                    placeholder="เขียนเนื้อหาบทเรียนในรูปแบบ Markdown..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                  />
                )}
              </div>

              <Input
                label="Video URL (ถ้ามี)"
                value={editing.videoUrl ?? ""}
                onChange={e => setEditing({ ...editing, videoUrl: e.target.value || null })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="ระยะเวลา (นาที)"
                  type="number"
                  value={editing.duration}
                  onChange={e => setEditing({ ...editing, duration: Number(e.target.value) })}
                />
                <Input
                  label="ลำดับ"
                  type="number"
                  value={editing.order}
                  onChange={e => setEditing({ ...editing, order: Number(e.target.value) })}
                />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editing.isPublished}
                    onChange={e => setEditing({ ...editing, isPublished: e.target.checked })}
                    className="rounded"
                  />
                  เผยแพร่แล้ว
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editing.isFree}
                    onChange={e => setEditing({ ...editing, isFree: e.target.checked })}
                    className="rounded"
                  />
                  บทเรียนฟรี
                </label>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button>
              <Button variant="gradient" onClick={saveLesson} disabled={saving || editContentLoading} className="gap-2">
                <Save className="h-4 w-4" /> {saving ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
