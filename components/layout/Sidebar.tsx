"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen, ChevronDown, ChevronRight, CheckCircle2,
  Circle, Lock, PlayCircle, FileText, HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { Course, Section, Lesson, LessonProgress } from "@/types";

interface SidebarProps {
  course: Course;
  currentLessonId?: string;
  progress?: LessonProgress[];
  className?: string;
}

export default function Sidebar({ course, currentLessonId, progress = [], className }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(course.sections?.map((s) => s.id) ?? [])
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

  const isLessonCompleted = (lessonId: string) =>
    progress.some((p) => p.lessonId === lessonId && p.isCompleted);

  const completedCount = progress.filter((p) => p.isCompleted).length;
  const totalLessons = course.totalLessons || 0;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const getLessonIcon = (lesson: Lesson) => {
    if (isLessonCompleted(lesson.id)) return <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />;
    if (lesson.type === "VIDEO") return <PlayCircle className="h-4 w-4 text-muted-foreground shrink-0" />;
    if (lesson.type === "INTERACTIVE" || lesson.type === "PROJECT") return <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />;
    return <Circle className="h-4 w-4 text-muted-foreground shrink-0" />;
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-background border-r overflow-hidden",
        className
      )}
    >
      {/* Course Header */}
      <div className="p-4 border-b bg-muted/30 shrink-0">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-sm line-clamp-2">{course.title}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedCount}/{totalLessons} บทเรียน
            </p>
          </div>
        </div>
        <div className="mt-3">
          <Progress value={progressPct} showLabel />
        </div>
      </div>

      {/* Sections & Lessons */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
        {course.sections?.map((section) => (
          <div key={section.id} className="mb-1">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-muted/50 transition-colors group"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform shrink-0",
                  !expandedSections.has(section.id) && "-rotate-90"
                )}
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Section {section.order}
                </span>
                <p className="text-sm font-medium line-clamp-1">{section.title}</p>
              </div>
            </button>

            {/* Lessons */}
            {expandedSections.has(section.id) && (
              <div className="ml-2">
                {section.lessons?.map((lesson) => {
                  const isActive = currentLessonId === lesson.id || pathname.includes(lesson.slug);
                  const completed = isLessonCompleted(lesson.id);

                  return (
                    <Link
                      key={lesson.id}
                      href={`/lesson/${lesson.slug}`}
                      className={cn(
                        "flex items-start gap-2.5 px-4 py-2.5 text-sm transition-all duration-150 rounded-lg mx-2 mb-0.5",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                        completed && !isActive && "text-green-600 dark:text-green-400"
                      )}
                    >
                      <span className="mt-0.5">{getLessonIcon(lesson)}</span>
                      <div className="flex-1 min-w-0">
                        <span className="line-clamp-2 leading-tight">{lesson.title}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          {lesson.duration > 0 && (
                            <span className="text-xs opacity-60">{lesson.duration} นาที</span>
                          )}
                          {lesson.isFree && (
                            <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full font-medium">
                              ฟรี
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
