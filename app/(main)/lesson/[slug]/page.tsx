import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import LessonViewer from "@/components/lesson/LessonViewer";

interface PageProps { params: { slug: string } }

async function getLesson(slug: string) {
  return prisma.lesson.findUnique({
    where: { slug, isPublished: true },
    include: {
      section: {
        include: {
          course: {
            include: {
              sections: {
                orderBy: { order: "asc" },
                include: {
                  lessons: {
                    where: { isPublished: true },
                    orderBy: { order: "asc" },
                    select: {
                      id: true, slug: true, title: true,
                      duration: true, type: true, isFree: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      codeExamples: { orderBy: { order: "asc" } },
      quizzes: {
        include: {
          questions: {
            orderBy: { order: "asc" },
            include: { choices: { orderBy: { order: "asc" } } },
          },
          _count: { select: { attempts: true } },
        },
      },
      assignments: {
        select: {
          id: true, title: true, description: true,
          starterCode: true, language: true, hints: true, maxScore: true,
        },
      },
    },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lesson = await getLesson(params.slug);
  if (!lesson) return { title: "ไม่พบบทเรียน" };
  return {
    title: `${lesson.title} | ${lesson.section.course.title}`,
    description: lesson.content.substring(0, 160).replace(/[#*`]/g, ""),
  };
}

export default async function LessonPage({ params }: PageProps) {
  const lesson = await getLesson(params.slug);
  if (!lesson) notFound();

  return (
    <LessonViewer
      lesson={lesson as unknown as Parameters<typeof LessonViewer>[0]["lesson"]}
      course={lesson.section.course as unknown as Parameters<typeof LessonViewer>[0]["course"]}
    />
  );
}
