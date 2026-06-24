import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { submitQuizSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const body = await req.json();
    const parsed = submitQuizSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 400);

    const { quizId, answers, timeSpent } = parsed.data;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: { include: { choices: true } },
      },
    });
    if (!quiz) return apiError("ไม่พบ Quiz", 404);

    // Calculate score
    let totalPoints = 0;
    let earnedPoints = 0;
    const answerResults: { questionId: string; choiceId?: string; isCorrect: boolean }[] = [];

    for (const q of quiz.questions) {
      totalPoints += q.points;
      const userAnswer = answers.find((a) => a.questionId === q.id);
      const selectedChoice = q.choices.find((c) => c.id === userAnswer?.choiceId);
      const isCorrect = selectedChoice?.isCorrect ?? false;
      if (isCorrect) earnedPoints += q.points;
      answerResults.push({
        questionId: q.id,
        choiceId: userAnswer?.choiceId,
        isCorrect,
      });
    }

    const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const isPassed = score >= quiz.passingScore;

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        score,
        isPassed,
        completedAt: new Date(),
        timeSpent,
        answers: {
          create: answerResults.map((a) => ({
            questionId: a.questionId,
            choiceId: a.choiceId,
            isCorrect: a.isCorrect,
          })),
        },
      },
    });

    return apiSuccess({ score, isPassed, attemptId: attempt.id });
  } catch (err) {
    console.error("[QUIZ SUBMIT]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
