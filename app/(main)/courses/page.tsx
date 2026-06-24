export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Search } from "lucide-react";
import { prisma } from "@/lib/db";
import CourseCard from "@/components/courses/CourseCard";
import CoursesFilter from "@/components/courses/CoursesFilter";
import type { Course } from "@/types";

export const metadata: Metadata = {
  title: "คอร์สทั้งหมด | TeachCode",
  description: "เรียกดูคอร์ส Programming และ Web Development ทั้งหมด",
};

interface CoursesPageProps {
  searchParams: { lang?: string; level?: string; q?: string };
}

async function getCourses(filters: CoursesPageProps["searchParams"]) {
  const where: Record<string, unknown> = { isPublished: true };

  if (filters.lang) where.language = filters.lang.toUpperCase();
  if (filters.level) where.level = filters.level.toUpperCase();
  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q } },
      { description: { contains: filters.q } },
    ];
  }

  return prisma.course.findMany({
    where,
    orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
    include: { _count: { select: { enrollments: true } } },
  });
}

const LANGUAGES = [
  { value: "C", label: "C" },
  { value: "CPP", label: "C++" },
  { value: "PYTHON", label: "Python" },
  { value: "JAVASCRIPT", label: "JavaScript" },
  { value: "JAVA", label: "Java" },
  { value: "TYPESCRIPT", label: "TypeScript" },
  { value: "HTML_CSS", label: "HTML & CSS" },
  { value: "REACT", label: "React" },
  { value: "NEXTJS", label: "Next.js" },
  { value: "VUE", label: "Vue.js" },
  { value: "ANGULAR", label: "Angular" },
  { value: "NODEJS", label: "Node.js" },
  { value: "SQL", label: "SQL" },
  { value: "FLUTTER", label: "Flutter" },
  { value: "DEVOPS", label: "DevOps" },
];

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const courses = await getCourses(searchParams);
  const isFiltered = !!(searchParams.lang || searchParams.level || searchParams.q);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/60 via-background to-muted/40 border-b">
        <div className="absolute inset-0 dot-pattern opacity-30 dark:opacity-10" />
        <div className="container mx-auto px-4 py-14 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-5">
              <Search className="w-3 h-3" />
              ค้นหาคอร์สที่ใช่สำหรับคุณ
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
              คอร์ส<span className="brand-gradient-text">ทั้งหมด</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              เลือกเรียนจาก <strong className="text-foreground">{courses.length} คอร์ส</strong> ครอบคลุมทุกภาษาและทุกระดับ
              {isFiltered && " — กรองตามเงื่อนไขที่เลือก"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <CoursesFilter languages={LANGUAGES} currentFilters={searchParams} />

        {courses.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-5">
              <Search className="w-9 h-9 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">ไม่พบคอร์สที่ตรงกัน</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">ลองปรับตัวกรอง หรือค้นหาด้วยคำอื่น เพื่อดูคอร์สที่ใกล้เคียง</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course as Course & { _count: { enrollments: number } }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
