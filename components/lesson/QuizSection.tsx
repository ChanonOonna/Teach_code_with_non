"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Trophy, RotateCcw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/hooks/useAuthStore";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import type { Quiz, Question, Choice } from "@/types";

interface QuizSectionProps {
  quiz: Quiz & { questions: (Question & { choices?: Choice[] })[] };
}

type AnswerMap = Record<string, string>;

export default function QuizSection({ quiz }: QuizSectionProps) {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; isPassed: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());

  const handleSelect = (questionId: string, choiceId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const allAnswered = quiz.questions.every((q) => answers[q.id]);

  const handleSubmit = async () => {
    if (!user) { router.push("/login"); return; }
    if (!allAnswered) { toast.error("กรุณาตอบทุกข้อ"); return; }

    setSubmitting(true);
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const payload = {
        quizId: quiz.id,
        timeSpent,
        answers: quiz.questions.map((q) => ({
          questionId: q.id,
          choiceId: answers[q.id],
        })),
      };
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        setSubmitted(true);
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  const getChoiceState = (question: Question & { choices?: Choice[] }, choice: Choice) => {
    if (!submitted) {
      return answers[question.id] === choice.id ? "selected" : "default";
    }
    if (choice.isCorrect) return "correct";
    if (answers[question.id] === choice.id && !choice.isCorrect) return "incorrect";
    return "default";
  };

  const correctCount = submitted
    ? quiz.questions.filter((q) => {
        const selectedChoice = (q.choices ?? []).find((c) => c.id === answers[q.id]);
        return selectedChoice?.isCorrect;
      }).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            {quiz.title}
          </h2>
          {quiz.description && (
            <p className="text-muted-foreground text-sm mt-1">{quiz.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <Badge variant="secondary">{quiz.questions.length} ข้อ</Badge>
            <Badge variant="info">ผ่านที่ {quiz.passingScore}%</Badge>
            {quiz.timeLimit && <Badge variant="warning">{quiz.timeLimit} นาที</Badge>}
          </div>
        </div>

        {submitted && result && (
          <div className={cn(
            "text-center px-4 py-2 rounded-xl",
            result.isPassed ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"
          )}>
            {result.isPassed
              ? <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-1" />
              : <XCircle className="h-8 w-8 text-red-500 mx-auto mb-1" />
            }
            <div className={cn("text-2xl font-bold", result.isPassed ? "text-green-600" : "text-red-600")}>
              {Math.round(result.score)}%
            </div>
            <div className="text-xs font-medium">
              {result.isPassed ? "ผ่าน!" : "ยังไม่ผ่าน"}
            </div>
          </div>
        )}
      </div>

      {/* Progress */}
      {!submitted && (
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>ตอบแล้ว {Object.keys(answers).length}/{quiz.questions.length} ข้อ</span>
          </div>
          <Progress value={(Object.keys(answers).length / quiz.questions.length) * 100} />
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {quiz.questions.map((question, qIdx) => (
          <Card key={question.id} className={cn(
            "overflow-hidden",
            submitted && answers[question.id] &&
              ((question.choices ?? []).find(c => c.id === answers[question.id])?.isCorrect
                ? "border-green-200 dark:border-green-800"
                : "border-red-200 dark:border-red-800")
          )}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                  {qIdx + 1}
                </span>
                <p className="font-medium leading-relaxed">{question.text}</p>
              </div>

              {/* Choices */}
              <div className="space-y-2 ml-10">
                {(question.choices ?? []).map((choice) => {
                  const state = getChoiceState(question, choice);
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelect(question.id, choice.id)}
                      disabled={submitted}
                      className={cn(
                        "quiz-option w-full text-left",
                        state === "selected" && "selected",
                        state === "correct" && "correct",
                        state === "incorrect" && "incorrect",
                        submitted && state === "default" && "opacity-50 cursor-default"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                        state === "selected" && "border-primary bg-primary",
                        state === "correct" && "border-green-500 bg-green-500",
                        state === "incorrect" && "border-red-500 bg-red-500",
                        state === "default" && "border-border"
                      )}>
                        {state === "correct" && <CheckCircle2 className="h-3 w-3 text-white" />}
                        {state === "incorrect" && <XCircle className="h-3 w-3 text-white" />}
                        {state === "selected" && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm">{choice.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {submitted && question.explanation && (
                <div className="mt-4 ml-10 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>คำอธิบาย:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      {!submitted ? (
        <Button
          onClick={handleSubmit}
          loading={submitting}
          disabled={!allAnswered}
          variant="gradient"
          size="lg"
          className="w-full"
        >
          ส่งคำตอบ ({Object.keys(answers).length}/{quiz.questions.length})
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRetry} leftIcon={<RotateCcw className="h-4 w-4" />}>
            ทำใหม่
          </Button>
          {result && (
            <div className="flex-1 text-center py-2 text-sm text-muted-foreground">
              ถูก {correctCount}/{quiz.questions.length} ข้อ
            </div>
          )}
        </div>
      )}
    </div>
  );
}
