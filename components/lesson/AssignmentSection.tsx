"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Lightbulb, CheckCircle2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CodeEditor from "./CodeEditor";
import { useAuthStore } from "@/hooks/useAuthStore";
import toast from "react-hot-toast";
import type { Assignment } from "@/types";

interface AssignmentSectionProps {
  assignment: Pick<Assignment, "id" | "title" | "description" | "starterCode" | "language" | "hints" | "maxScore">;
}

export default function AssignmentSection({ assignment }: AssignmentSectionProps) {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();
  const [code, setCode] = useState(assignment.starterCode ?? "");
  const [output, setOutput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [running, setRunning] = useState(false);

  const runJSInBrowser = (src: string): string => {
    const lines: string[] = [];
    const capture = (...args: unknown[]) => {
      lines.push(args.map(a => {
        if (a === null) return "null";
        if (a === undefined) return "undefined";
        if (typeof a === "object") { try { return JSON.stringify(a, null, 2); } catch { return String(a); } }
        return String(a);
      }).join(" "));
    };
    const orig = { log: console.log, error: console.error, warn: console.warn, info: console.info };
    console.log = capture;
    console.error = (...a: unknown[]) => capture("❌", ...a);
    console.warn = (...a: unknown[]) => capture("⚠️", ...a);
    console.info = capture;
    try { new Function(src)(); }
    catch (e) { lines.push(`❌ ${e instanceof Error ? e.message : String(e)}`); }
    finally { Object.assign(console, orig); }
    return lines.length > 0 ? lines.join("\n") : "(ไม่มี output)";
  };

  const handleRun = async () => {
    setRunning(true);
    const lang = assignment.language.toLowerCase();
    if (["javascript", "js", "typescript", "ts"].includes(lang)) {
      setTimeout(() => {
        setOutput(runJSInBrowser(code));
        setRunning(false);
      }, 50);
      return;
    }
    try {
      const res = await fetch("/api/playground/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: assignment.language }),
      });
      const data = await res.json();
      setOutput(data.data?.output ?? data.error ?? "ไม่มี output");
    } catch {
      setOutput("เกิดข้อผิดพลาดในการรันโค้ด");
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) { router.push("/login"); return; }
    if (!code.trim()) { toast.error("กรุณาเขียนโค้ดก่อน"); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/assignments/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          assignmentId: assignment.id,
          code,
          output,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success("ส่ง Assignment แล้ว!");
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          {assignment.title}
        </h2>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{assignment.language}</Badge>
          <Badge variant="info">คะแนนเต็ม {assignment.maxScore} คะแนน</Badge>
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold mb-3">โจทย์</h3>
          <div className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
            {assignment.description}
          </div>
        </CardContent>
      </Card>

      {/* Hints */}
      {assignment.hints && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHints(!showHints)}
            leftIcon={<Lightbulb className="h-4 w-4 text-yellow-500" />}
          >
            {showHints ? "ซ่อน Hint" : "แสดง Hint"}
          </Button>
          {showHints && (
            <Card className="mt-2 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-4">
                <p className="text-sm text-yellow-700 dark:text-yellow-300 whitespace-pre-wrap">
                  {assignment.hints}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Code Editor */}
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-300 text-sm">เขียนโค้ดของคุณที่นี่</span>
          <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs ml-auto">
            {assignment.language}
          </Badge>
        </div>
        <CodeEditor
          initialCode={code}
          language={assignment.language}
          readOnly={submitted}
          height="350px"
          onChange={setCode}
          showRunButton
          onRun={handleRun}
        />
        {output && (
          <div className="border-t border-gray-700 bg-gray-950 p-4">
            <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Output:</div>
            <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>

      {/* Submit */}
      {!submitted ? (
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleRun}
            loading={running}
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
          >
            ทดสอบโค้ด
          </Button>
          <Button
            variant="gradient"
            onClick={handleSubmit}
            loading={submitting}
            leftIcon={<Send className="h-4 w-4" />}
            className="flex-1"
          >
            ส่ง Assignment
          </Button>
        </div>
      ) : (
        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="p-5 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
            <div>
              <p className="font-semibold text-green-700 dark:text-green-400">ส่ง Assignment สำเร็จ!</p>
              <p className="text-sm text-muted-foreground">รอผู้สอนตรวจและให้คะแนน</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
