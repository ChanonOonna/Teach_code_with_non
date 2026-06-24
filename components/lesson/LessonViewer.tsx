"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, ChevronRight, CheckCircle2, Bookmark,
  BookmarkCheck, Code2, HelpCircle, ClipboardList,
  Menu, Clock, StickyNote,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/layout/Sidebar";
import CodeEditor from "@/components/lesson/CodeEditor";
import NoteEditor from "@/components/lesson/NoteEditor";
import QuizSection from "@/components/lesson/QuizSection";
import AssignmentSection from "@/components/lesson/AssignmentSection";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import type { Lesson, Course } from "@/types";

interface LessonViewerProps {
  lesson: Lesson & {
    section: { title: string; course: Course & { sections: NonNullable<Course["sections"]> } };
    codeExamples: NonNullable<Lesson["codeExamples"]>;
    quizzes: NonNullable<Lesson["quizzes"]>;
    assignments: NonNullable<Lesson["assignments"]>;
  };
  course: Course & { sections: NonNullable<Course["sections"]> };
}

type Tab = "content" | "quiz" | "assignment" | "notes";


function CodeExample({ example }: { example: { id: string; title: string; code: string; language: string; explanation?: string | null } }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border/60 shadow-sm">
      {/* Title bar (macOS style) */}
      <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-gray-300 text-xs font-medium flex-1 truncate">{example.title}</span>
        <Badge variant="outline" className="text-gray-400 border-gray-700 text-[10px] py-0">
          {example.language}
        </Badge>
      </div>

      {/* Editable editor with Run button */}
      <CodeEditor
        initialCode={example.code}
        language={example.language}
        readOnly={false}
        height="auto"
        showRunButton={true}
      />

      {example.explanation && (
        <div className="px-4 py-2.5 bg-gray-900/60 border-t border-gray-800">
          <p className="text-xs text-gray-400 leading-relaxed">💡 {example.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default function LessonViewer({ lesson, course }: LessonViewerProps) {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();
  const { markComplete, isCompleting } = useProgress(lesson.id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [progress, setProgress] = useState<{ lessonId: string; isCompleted: boolean }[]>([]);

  useEffect(() => {
    if (!accessToken) return;
    fetch(`/api/progress/course/${course.id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setProgress(data.data);
          setIsCompleted(data.data.some((p: { lessonId: string; isCompleted: boolean }) =>
            p.lessonId === lesson.id && p.isCompleted
          ));
        }
      }).catch(() => {});

    fetch(`/api/bookmarks/${lesson.id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((r) => r.json())
      .then((data) => setIsBookmarked(data.data?.isBookmarked ?? false))
      .catch(() => {});
  }, [lesson.id, course.id, accessToken]);

  const allLessons = course.sections.flatMap((s) => s.lessons ?? []);
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleMarkComplete = async () => {
    await markComplete();
    setIsCompleted(true);
    toast.success("เยี่ยม! บทเรียนนี้เสร็จแล้ว 🎉");
    if (nextLesson) setTimeout(() => router.push(`/lesson/${nextLesson.slug}`), 1200);
  };

  const handleBookmark = async () => {
    if (!accessToken) { router.push("/login"); return; }
    const res = await fetch(`/api/bookmarks/${lesson.id}`, {
      method: isBookmarked ? "DELETE" : "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (res.ok) {
      setIsBookmarked(!isBookmarked);
      toast.success(isBookmarked ? "ลบ Bookmark แล้ว" : "เพิ่ม Bookmark แล้ว");
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number; show: boolean }[] = [
    { id: "content", label: "เนื้อหา", icon: Code2, show: true },
    { id: "quiz", label: "Quiz", icon: HelpCircle, count: lesson.quizzes.length, show: lesson.quizzes.length > 0 },
    { id: "assignment", label: "Assignment", icon: ClipboardList, show: lesson.assignments.length > 0 },
    { id: "notes", label: "โน้ต", icon: StickyNote, show: true },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 shrink-0">
        <Sidebar
          course={course}
          currentLessonId={lesson.id}
          progress={progress as Parameters<typeof Sidebar>[0]["progress"]}
          className="w-full"
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 z-50 shadow-2xl">
            <Sidebar
              course={course}
              currentLessonId={lesson.id}
              progress={progress as Parameters<typeof Sidebar>[0]["progress"]}
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b bg-background/95 backdrop-blur-sm px-4 h-12 flex items-center gap-3 shrink-0">
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href={`/courses/${course.slug}`} className="hover:text-primary truncate max-w-[120px]">
                {course.title}
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="truncate text-foreground font-medium">{lesson.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {lesson.duration > 0 && (
              <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {lesson.duration}m
              </span>
            )}
            {lesson.isFree && <Badge variant="success" className="text-[10px]">ฟรี</Badge>}
            <button
              onClick={handleBookmark}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              title={isBookmarked ? "ลบ Bookmark" : "เพิ่ม Bookmark"}
            >
              {isBookmarked
                ? <BookmarkCheck className="h-4 w-4 text-primary" />
                : <Bookmark className="h-4 w-4 text-muted-foreground" />
              }
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="border-b bg-background px-4 shrink-0 flex gap-0">
          {tabs.filter(t => t.show).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === "content" && (
            <div className="max-w-3xl mx-auto px-6 py-8">
              {/* Lesson title */}
              <h1 className="text-2xl font-extrabold mb-6 tracking-tight">{lesson.title}</h1>

              {/* Markdown content */}
              <article className="lesson-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {lesson.content}
                </ReactMarkdown>
              </article>

              {/* Inline Code Examples (W3Schools style) */}
              {lesson.codeExamples.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-bold">ตัวอย่างโค้ด</h2>
                    <Badge variant="secondary">{lesson.codeExamples.length} ตัวอย่าง</Badge>
                  </div>
                  {lesson.codeExamples.map((ex) => (
                    <CodeExample key={ex.id} example={ex} />
                  ))}
                </div>
              )}

              {/* Bottom action bar */}
              <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground text-center sm:text-left">
                  บทเรียนที่ {currentIndex + 1} จาก {allLessons.length}
                </div>
                <Button
                  variant={isCompleted ? "success" : "gradient"}
                  onClick={handleMarkComplete}
                  loading={isCompleting}
                  disabled={isCompleted}
                  className={cn("min-w-[200px]", isCompleted && "cursor-default")}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {isCompleted ? "เรียนจบบทนี้แล้ว ✓" : "เรียนจบแล้ว — ไปต่อเลย"}
                </Button>
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="max-w-3xl mx-auto px-6 py-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" /> แบบทดสอบ
              </h2>
              {lesson.quizzes.map((quiz) => (
                <QuizSection key={quiz.id} quiz={quiz as Parameters<typeof QuizSection>[0]["quiz"]} />
              ))}
            </div>
          )}

          {activeTab === "assignment" && (
            <div className="max-w-3xl mx-auto px-6 py-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" /> Assignment
              </h2>
              {lesson.assignments.map((assignment) => (
                <AssignmentSection
                  key={assignment.id}
                  assignment={assignment as Parameters<typeof AssignmentSection>[0]["assignment"]}
                />
              ))}
            </div>
          )}

          {activeTab === "notes" && (
            <div className="max-w-3xl mx-auto px-6 py-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-primary" /> โน้ตของฉัน
              </h2>
              <NoteEditor lessonId={lesson.id} />
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t bg-background/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between gap-3 shrink-0">
          {prevLesson ? (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/lesson/${prevLesson.slug}`}>
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline truncate max-w-[140px]">{prevLesson.title}</span>
                <span className="sm:hidden">ก่อนหน้า</span>
              </Link>
            </Button>
          ) : <div />}

          {/* Progress dots */}
          <div className="hidden md:flex items-center gap-1">
            {allLessons.slice(Math.max(0, currentIndex - 3), Math.min(allLessons.length, currentIndex + 4)).map((l, i) => {
              const absIdx = Math.max(0, currentIndex - 3) + i;
              const done = progress.some(p => p.lessonId === l.id && p.isCompleted);
              return (
                <Link key={l.id} href={`/lesson/${l.slug}`}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    absIdx === currentIndex ? "w-6 bg-primary" :
                    done ? "bg-green-500" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  )}
                />
              );
            })}
          </div>

          {nextLesson ? (
            <Button variant={isCompleted ? "gradient" : "outline"} size="sm" asChild>
              <Link href={`/lesson/${nextLesson.slug}`}>
                <span className="hidden sm:inline truncate max-w-[140px]">{nextLesson.title}</span>
                <span className="sm:hidden">ถัดไป</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="success" size="sm" disabled>
              <CheckCircle2 className="h-4 w-4" /> จบคอร์ส!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
