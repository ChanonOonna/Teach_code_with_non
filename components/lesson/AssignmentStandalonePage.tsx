"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import CodeEditor from "@/components/lesson/CodeEditor";
import toast from "react-hot-toast";

interface Assignment {
  id: string;
  title: string;
  description: string;
  starterCode: string | null;
  language: string;
  hints: string | null;
  lesson: { title: string; slug: string };
}

export default function AssignmentStandalonePage({ assignment }: { assignment: Assignment }) {
  const [showHints, setShowHints] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedCode, setSubmittedCode] = useState("");

  const hints: string[] = assignment.hints
    ? JSON.parse(assignment.hints).catch?.() ?? assignment.hints.split("\n").filter(Boolean)
    : [];

  const handleSubmit = async (code: string) => {
    if (!code.trim()) {
      toast.error("กรุณาเขียนโค้ดก่อนส่ง");
      return;
    }
    setSubmitting(true);
    setSubmittedCode(code);
    try {
      const res = await fetch("/api/assignments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId: assignment.id, code, language: assignment.language }),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("ส่ง Assignment สำเร็จ! 🎉");
      } else {
        toast.error("เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("ไม่สามารถส่งได้");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="text-xl font-bold">ส่งสำเร็จแล้ว!</h3>
        <p className="text-muted-foreground">อาจารย์จะตรวจและให้คะแนนเร็วๆ นี้</p>
        <Button variant="outline" asChild>
          <Link href={`/lesson/${assignment.lesson.slug}`}>
            <ArrowLeft className="h-4 w-4 mr-2" /> กลับบทเรียน
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/lesson/${assignment.lesson.slug}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{assignment.title}</h1>
          <p className="text-sm text-muted-foreground">{assignment.lesson.title}</p>
        </div>
        <Badge variant="outline" className="ml-auto">{assignment.language}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">โจทย์</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{assignment.description}</p>
        </CardContent>
      </Card>

      {hints.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <button
              onClick={() => setShowHints(!showHints)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                <Lightbulb className="h-4 w-4" /> Hints ({hints.length})
              </span>
              {showHints ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showHints && (
              <div className="px-4 pb-4 space-y-2">
                {hints.map((hint, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <span className="font-mono text-muted-foreground shrink-0">{i + 1}.</span>
                    <span>{hint}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <CodeEditor
        initialCode={assignment.starterCode ?? ""}
        language={assignment.language}
        readOnly={false}
        showRunButton
        height="350px"
        onRun={(code) => handleSubmit(code)}
      />

      <div className="flex justify-end">
        <Button
          variant="gradient"
          loading={submitting}
          className="gap-2"
          onClick={() => {
            const editorEl = document.querySelector(".cm-content") as HTMLElement;
            const code = editorEl?.innerText ?? assignment.starterCode ?? "";
            handleSubmit(code);
          }}
        >
          <Send className="h-4 w-4" /> ส่ง Assignment
        </Button>
      </div>
    </div>
  );
}
