"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Clock, Users, ArrowRight, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  getLanguageColor, getLanguageLabel, getLevelLabel, getLevelColor,
  formatDuration, LANGUAGE_ICONS, cn,
} from "@/lib/utils";
import type { Course, Enrollment } from "@/types";

interface CourseCardProps {
  course: Course & { _count?: { enrollments: number } };
  enrollment?: Enrollment;
  className?: string;
}

const THUMBNAIL_GRADIENTS: Record<string, string> = {
  C: "from-blue-600 via-blue-500 to-cyan-400",
  CPP: "from-indigo-600 via-indigo-500 to-blue-400",
  PYTHON: "from-yellow-500 via-amber-400 to-orange-400",
  JAVASCRIPT: "from-yellow-400 via-amber-300 to-yellow-300",
  JAVA: "from-red-600 via-orange-500 to-red-400",
  TYPESCRIPT: "from-blue-700 via-blue-500 to-blue-400",
  HTML_CSS: "from-orange-500 via-red-400 to-pink-400",
  REACT: "from-cyan-500 via-sky-400 to-blue-400",
  NEXTJS: "from-gray-800 via-gray-600 to-gray-500",
  VUE: "from-emerald-600 via-green-500 to-teal-400",
  ANGULAR: "from-red-700 via-red-500 to-rose-400",
  NODEJS: "from-green-600 via-emerald-500 to-green-400",
  SQL: "from-violet-600 via-purple-500 to-indigo-400",
  REST_API: "from-teal-600 via-cyan-500 to-teal-400",
  FLUTTER: "from-sky-600 via-blue-400 to-cyan-400",
  REACT_NATIVE: "from-sky-600 via-blue-400 to-indigo-400",
  DEVOPS: "from-slate-700 via-slate-500 to-gray-500",
};

export default function CourseCard({ course, enrollment, className }: CourseCardProps) {
  const progressPct = enrollment?.progress ?? 0;
  const isEnrolled = !!enrollment;
  const gradientClass = THUMBNAIL_GRADIENTS[course.language] ?? "from-blue-600 to-violet-600";

  return (
    <Link href={`/courses/${course.slug}`} className={cn("group block h-full", className)}>
      <div className="h-full rounded-2xl overflow-hidden border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">

        {/* Thumbnail */}
        <div className={`relative h-44 bg-gradient-to-br ${gradientClass} overflow-hidden`}>
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <>
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="text-5xl drop-shadow-lg">{LANGUAGE_ICONS[course.language] ?? "💻"}</span>
              </div>
            </>
          )}

          {/* Level Badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${getLevelColor(course.level)}`}>
              {getLevelLabel(course.level)}
            </span>
          </div>

          {/* Enrolled indicator */}
          {isEnrolled && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow-md">
              เรียนอยู่
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-3">
          {/* Language chip */}
          <div className="flex items-center gap-1.5 w-fit">
            <span className="text-sm">{LANGUAGE_ICONS[course.language] ?? "💻"}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${getLanguageColor(course.language)} text-white`}>
              {getLanguageLabel(course.language)}
            </span>
          </div>

          <div>
            <h3 className="font-bold text-base leading-snug mb-1.5 line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {course.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/60">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-primary/60" />
              {course.totalLessons} บท
            </span>
            {course.estimatedHours > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary/60" />
                {formatDuration(Math.round(course.estimatedHours * 60))}
              </span>
            )}
            {course._count !== undefined && (
              <span className="flex items-center gap-1 ml-auto">
                <Users className="w-3.5 h-3.5" />
                {course._count.enrollments.toLocaleString()}
              </span>
            )}
          </div>

          {/* Progress */}
          {isEnrolled ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">ความคืบหน้า</span>
                <span className={cn("font-semibold", progressPct === 100 ? "text-green-500" : "text-primary")}>
                  {Math.round(progressPct)}%{progressPct === 100 && " ✓"}
                </span>
              </div>
              <Progress value={progressPct} className="h-1.5" />
            </div>
          ) : (
            <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              เริ่มเรียน <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
