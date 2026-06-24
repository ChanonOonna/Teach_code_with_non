export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BookOpen, Clock, Users, Award, ChevronRight,
  PlayCircle, CheckCircle2, Lock, FileText, Zap,
  RotateCcw, Star,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getLanguageLabel, getLevelLabel, getLevelColor,
  getLanguageColor, formatDuration, LANGUAGE_ICONS,
} from "@/lib/utils";
import EnrollButton from "@/components/courses/EnrollButton";

interface PageProps { params: { slug: string } }

async function getCourse(slug: string) {
  return prisma.course.findUnique({
    where: { slug, isPublished: true },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: {
              id: true, slug: true, title: true, duration: true,
              type: true, isFree: true, isPublished: true,
            },
          },
        },
      },
      _count: { select: { enrollments: true } },
    },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const course = await getCourse(params.slug);
  if (!course) return { title: "ไม่พบคอร์ส" };
  return { title: course.title, description: course.description };
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

export default async function CourseDetailPage({ params }: PageProps) {
  const course = await getCourse(params.slug);
  if (!course) notFound();

  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const freeLessons = course.sections.flatMap((s) => s.lessons).filter((l) => l.isFree).length;
  const firstLesson = course.sections[0]?.lessons[0];
  const gradientClass = THUMBNAIL_GRADIENTS[course.language] ?? "from-blue-600 to-violet-600";

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/50 via-background to-muted/30 border-b">
        <div className="absolute inset-0 dot-pattern opacity-20 dark:opacity-10" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${getLanguageColor(course.language)}`}>
              {LANGUAGE_ICONS[course.language]} {getLanguageLabel(course.language)}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getLevelColor(course.level)}`}>
              {getLevelLabel(course.level)}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight max-w-3xl">{course.title}</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">{course.description}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-5 mt-5">
            {[
              { icon: BookOpen, label: `${totalLessons} บทเรียน` },
              { icon: Clock, label: formatDuration(Math.round(course.estimatedHours * 60)) },
              { icon: Users, label: `${(course._count?.enrollments ?? 0).toLocaleString()} นักเรียน` },
              { icon: Award, label: "มี Certificate" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary/70" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Curriculum */}
            <div>
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> เนื้อหาคอร์ส
              </h2>
              <div className="space-y-2">
                {course.sections.map((section, idx) => (
                  <div key={section.id} className="rounded-xl overflow-hidden border border-border/70">
                    <div className="bg-muted/40 px-4 py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          {section.order || idx + 1}
                        </div>
                        <h3 className="font-semibold text-sm">{section.title}</h3>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0 ml-3">
                        {section.lessons.length} บทเรียน
                      </span>
                    </div>
                    <div className="divide-y divide-border/50">
                      {section.lessons.map((lesson) => (
                        lesson.isFree ? (
                          <Link
                            key={lesson.id}
                            href={`/lesson/${lesson.slug}`}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors group"
                          >
                            <PlayCircle className="w-4 h-4 text-primary shrink-0" />
                            <span className="flex-1 text-sm group-hover:text-primary transition-colors">{lesson.title}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="success" className="text-[10px]">ฟรี</Badge>
                              {lesson.duration > 0 && (
                                <span className="text-xs text-muted-foreground">{lesson.duration}m</span>
                              )}
                            </div>
                          </Link>
                        ) : (
                          <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 opacity-60">
                            <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="flex-1 text-sm">{lesson.title}</span>
                            {lesson.duration > 0 && (
                              <span className="text-xs text-muted-foreground">{lesson.duration}m</span>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl overflow-hidden border border-border/70 shadow-xl shadow-black/5 bg-card">
              {/* Thumbnail */}
              <div className={`relative h-44 bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center`}>
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
                <span className="text-6xl drop-shadow-lg relative">{LANGUAGE_ICONS[course.language] ?? "💻"}</span>
                <span className="text-white/80 text-sm font-semibold mt-2 relative">
                  {getLanguageLabel(course.language)}
                </span>
              </div>

              <div className="p-6 space-y-5">
                {/* Price / Free */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                    <Star className="w-4 h-4 text-green-600 fill-green-600" />
                    <span className="text-green-700 dark:text-green-400 font-bold text-lg">ฟรีทั้งคอร์ส!</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {freeLessons} บทเรียนแรกเรียนได้ทันที ไม่ต้องสมัคร
                  </p>
                </div>

                {/* CTAs */}
                <div className="space-y-2.5">
                  <EnrollButton
                    courseId={course.id}
                    courseSlug={course.slug}
                    firstLessonSlug={firstLesson?.slug}
                  />
                  {firstLesson && (
                    <Button variant="outline" className="w-full" size="sm" asChild>
                      <Link href={`/lesson/${firstLesson.slug}`}>
                        <PlayCircle className="w-4 h-4" /> ลองเรียนฟรีก่อน
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Features checklist */}
                <div className="space-y-2.5 pt-2 border-t border-border/60">
                  {[
                    { icon: BookOpen, label: `${totalLessons} บทเรียน Text & Code` },
                    { icon: Zap, label: `${course.totalQuizzes} แบบทดสอบ` },
                    { icon: CheckCircle2, label: "Code Editor ในทุกบทเรียน" },
                    { icon: RotateCcw, label: "เรียนซ้ำได้ไม่จำกัด" },
                    { icon: Award, label: "Certificate เมื่อจบคอร์ส" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <Icon className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Rating placeholder */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">4.9 (รีวิวจากนักเรียน)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
