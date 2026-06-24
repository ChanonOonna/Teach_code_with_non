"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus, Users, Edit, Trash2, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuthStore } from "@/hooks/useAuthStore";

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: "มือใหม่", INTERMEDIATE: "ปานกลาง", ADVANCED: "ขั้นสูง",
};
const LANG_OPTIONS = ["C", "C++", "Python", "JavaScript", "Java", "HTML/CSS", "React", "Next.js", "Vue", "Angular", "Node.js", "SQL", "Flutter"];
const LEVEL_OPTIONS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

interface AdminCourse {
  id: string; title: string; slug: string; language: string; level: string;
  isPublished: boolean; order: number; totalLessons: number;
  estimatedHours: number | null;
  _count: { enrollments: number; sections: number };
}

interface CourseForm {
  title: string; slug: string; description: string;
  language: string; level: string; estimatedHours: string;
}

const emptyForm = (): CourseForm => ({
  title: "", slug: "", description: "", language: "Python", level: "BEGINNER", estimatedHours: "0",
});

export default function AdminCoursesPage() {
  const { accessToken } = useAuthStore();
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminCourse | null>(null);
  const [form, setForm] = useState<CourseForm>(emptyForm());
  const [saving, setSaving] = useState(false);

  const authHeader = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

  useEffect(() => {
    fetch("/api/admin/courses-list", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(r => r.json())
      .then(d => { if (d.success) setCourses(d.data); })
      .finally(() => setLoading(false));
  }, [accessToken]);

  const openAdd = () => { setEditTarget(null); setForm(emptyForm()); setShowModal(true); };
  const openEdit = (c: AdminCourse) => {
    setEditTarget(c);
    setForm({ title: c.title, slug: c.slug, description: "", language: c.language, level: c.level, estimatedHours: String(c.estimatedHours ?? 0) });
    setShowModal(true);
  };

  const handleSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast.error("กรุณากรอกชื่อและ slug"); return; }
    setSaving(true);
    try {
      const payload = { ...form, estimatedHours: parseInt(form.estimatedHours) || 0 };
      let res;
      if (editTarget) {
        res = await fetch(`/api/admin/courses/${editTarget.id}`, { method: "PATCH", headers: authHeader, body: JSON.stringify(payload) });
      } else {
        res = await fetch("/api/admin/courses-create", { method: "POST", headers: authHeader, body: JSON.stringify(payload) });
      }
      const data = await res.json();
      if (data.success) {
        toast.success(editTarget ? "อัพเดตคอร์สแล้ว" : "สร้างคอร์สแล้ว");
        setShowModal(false);
        if (editTarget) {
          setCourses(prev => prev.map(c => c.id === editTarget.id ? { ...c, ...data.data } : c));
        } else {
          setCourses(prev => [...prev, data.data]);
        }
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`ลบคอร์ส "${title}"? การกระทำนี้ไม่สามารถยกเลิกได้`)) return;
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE", headers: authHeader });
      const data = await res.json();
      if (data.success) {
        setCourses(prev => prev.filter(c => c.id !== id));
        toast.success("ลบคอร์สแล้ว");
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  const published = courses.filter(c => c.isPublished).length;
  const totalEnrollments = courses.reduce((acc, c) => acc + c._count.enrollments, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">จัดการคอร์ส</h1>
          <p className="text-muted-foreground mt-1">คอร์สทั้งหมด {courses.length} คอร์ส (เผยแพร่แล้ว {published} คอร์ส)</p>
        </div>
        <Button variant="gradient" className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" /> เพิ่มคอร์ส
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: BookOpen, color: "blue", value: courses.length, label: "คอร์สทั้งหมด" },
          { icon: BookOpen, color: "green", value: published, label: "เผยแพร่แล้ว" },
          { icon: Users, color: "purple", value: totalEnrollments.toLocaleString(), label: "การลงทะเบียนรวม" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-10 h-10 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-lg flex items-center justify-center`}>
                <item.icon className={`h-5 w-5 text-${item.color}-500`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> รายการคอร์ส
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
                    {["#", "คอร์ส", "ระดับ", "Sections", "บทเรียน", "ผู้เรียน", "สถานะ", ""].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {courses.map(course => (
                    <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-muted-foreground">{course.order}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-sm">{course.title}</p>
                          <p className="text-xs text-muted-foreground">{course.language}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">{LEVEL_LABELS[course.level] ?? course.level}</Badge>
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
                        <div className="flex gap-1">
                          <Link href={`/courses/${course.slug}`}>
                            <Button variant="ghost" size="sm">ดู</Button>
                          </Link>
                          <Button variant="outline" size="icon-sm" onClick={() => openEdit(course)} title="แก้ไข">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(course.id, course.title)} title="ลบ">
                            <Trash2 className="h-4 w-4" />
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold">{editTarget ? "แก้ไขคอร์ส" : "เพิ่มคอร์สใหม่"}</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Input
                label="ชื่อคอร์ส *"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: editTarget ? f.slug : handleSlug(e.target.value) }))}
                placeholder="เช่น เรียน Python สำหรับมือใหม่"
              />
              <Input
                label="Slug *"
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                placeholder="เช่น learn-python-beginner"
              />
              <div>
                <label className="block text-sm font-medium mb-1.5">คำอธิบาย</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full h-20 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="อธิบายเนื้อหาคอร์ส..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">ภาษา</label>
                  <select
                    value={form.language}
                    onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {LANG_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">ระดับ</label>
                  <select
                    value={form.level}
                    onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {LEVEL_OPTIONS.map(l => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
                  </select>
                </div>
              </div>
              <Input
                label="ชั่วโมงเรียนโดยประมาณ"
                type="number"
                value={form.estimatedHours}
                onChange={e => setForm(f => ({ ...f, estimatedHours: e.target.value }))}
              />
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>ยกเลิก</Button>
              <Button variant="gradient" className="flex-1" onClick={handleSave} disabled={saving}>
                {saving ? "กำลังบันทึก..." : editTarget ? "บันทึก" : "สร้างคอร์ส"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
