"use client";

import React, { useState, useEffect } from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/useAuthStore";
import toast from "react-hot-toast";

interface NoteEditorProps { lessonId: string }

export default function NoteEditor({ lessonId }: NoteEditorProps) {
  const { user, accessToken } = useAuthStore();
  const [content, setContent] = useState("");
  const [noteId, setNoteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) { setLoading(false); return; }
    fetch(`/api/notes/${lessonId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setContent(data.data.content ?? "");
          setNoteId(data.data.id ?? null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [lessonId, accessToken]);

  const handleSave = async () => {
    if (!accessToken) { toast.error("กรุณาเข้าสู่ระบบ"); return; }
    setSaving(true);
    try {
      const method = noteId ? "PUT" : "POST";
      const url = noteId ? `/api/notes/${noteId}` : "/api/notes";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ lessonId, content }),
      });
      const data = await res.json();
      if (data.success) {
        setNoteId(data.data?.id ?? noteId);
        toast.success("บันทึกโน้ตแล้ว");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!noteId || !accessToken) return;
    const res = await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (res.ok) {
      setContent("");
      setNoteId(null);
      toast.success("ลบโน้ตแล้ว");
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">📝</div>
        <p className="text-muted-foreground">
          <a href="/login" className="text-primary hover:underline">เข้าสู่ระบบ</a> เพื่อบันทึกโน้ต
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="h-40 bg-muted animate-pulse rounded-xl" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">โน้ตส่วนตัว</h3>
        <div className="flex gap-2">
          {noteId && (
            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          <Button size="sm" onClick={handleSave} loading={saving} leftIcon={<Save className="h-4 w-4" />}>
            บันทึก
          </Button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="เขียนโน้ตของคุณที่นี่... รองรับ Markdown"
        className="w-full h-64 p-4 rounded-xl border bg-background text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <p className="text-xs text-muted-foreground">
        {content.length}/5000 ตัวอักษร — รองรับ Markdown
      </p>
    </div>
  );
}
