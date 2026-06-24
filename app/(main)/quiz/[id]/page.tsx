import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import type { Metadata } from "next";
import QuizStandalonePage from "@/components/lesson/QuizStandalonePage";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { lesson: { select: { title: true } } },
  });
  if (!quiz) return { title: "Quiz Not Found" };
  return { title: `${quiz.title} | TeachCode` };
}

export default async function QuizPage({ params }: Props) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: {
      lesson: { select: { title: true, slug: true } },
      questions: {
        orderBy: { order: "asc" },
        include: { choices: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!quiz) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <QuizStandalonePage quiz={quiz} />
    </div>
  );
}
