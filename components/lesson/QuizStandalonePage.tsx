"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  order: number;
}

interface Question {
  id: string;
  text: string;
  type: string;
  points: number;
  explanation: string | null;
  choices: Choice[];
}

interface Quiz {
  id: string;
  title: string;
  passingScore: number;
  lesson: { title: string; slug: string };
  questions: Question[];
}

export default function QuizStandalonePage({ quiz }: { quiz: Quiz }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);

  const totalPoints = quiz.questions.reduce((s, q) => s + q.points, 0);
  const progress = ((current + 1) / quiz.questions.length) * 100;
  const q = quiz.questions[current];
  const passed = score >= quiz.passingScore;

  const select = (choiceId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [q.id]: choiceId }));
  };

  const handleSubmit = async () => {
    let earned = 0;
    quiz.questions.forEach((question) => {
      const selected = answers[question.id];
      const correct = question.choices.find((c) => c.isCorrect);
      if (selected && correct && selected === correct.id) {
        earned += question.points;
      }
    });
    const pct = Math.round((earned / totalPoints) * 100);
    setScore(pct);
    setSubmitted(true);

    try {
      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: quiz.id,
          answers: Object.entries(answers).map(([questionId, choiceId]) => ({
            questionId,
            choiceId,
          })),
        }),
      });
    } catch {
      // silent
    }
    toast(pct >= quiz.passingScore ? "ยอดเยี่ยม! ผ่านแล้ว 🎉" : "ลองใหม่ได้เลย!", {
      icon: pct >= quiz.passingScore ? "🏆" : "💪",
    });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrent(0);
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6">
        <div className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl",
          passed ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
        )}>
          {passed ? "🏆" : "💪"}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{passed ? "ผ่านแล้ว!" : "ลองใหม่อีกครั้ง"}</h2>
          <p className="text-muted-foreground">คะแนน: {score}% (เกณฑ์ผ่าน {quiz.passingScore}%)</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          {quiz.questions.map((question, i) => {
            const selectedId = answers[question.id];
            const correctChoice = question.choices.find((c) => c.isCorrect);
            const isCorrect = selectedId === correctChoice?.id;
            return (
              <Card key={question.id} className={cn(isCorrect ? "border-green-500/40" : "border-red-500/40")}>
                <CardContent className="p-4">
                  <div className="flex gap-2 items-start">
                    {isCorrect
                      ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      : <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />}
                    <div>
                      <p className="text-sm font-medium">ข้อ {i + 1}: {question.text}</p>
                      {!isCorrect && correctChoice && (
                        <p className="text-xs text-muted-foreground mt-1">
                          เฉลย: {correctChoice.text}
                        </p>
                      )}
                      {question.explanation && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{question.explanation}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" /> ทำใหม่
          </Button>
          <Button variant="gradient" asChild>
            <Link href={`/lesson/${quiz.lesson.slug}`}>
              <ArrowLeft className="h-4 w-4" /> กลับบทเรียน
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/lesson/${quiz.lesson.slug}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <p className="text-sm text-muted-foreground">{quiz.lesson.title}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">ข้อ {current + 1} / {quiz.questions.length}</span>
        <Badge variant="outline">{q.points} คะแนน</Badge>
      </div>
      <Progress value={progress} showLabel className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">{q.text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {q.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => select(choice.id)}
              className={cn(
                "quiz-option w-full",
                answers[q.id] === choice.id && "selected"
              )}
            >
              {choice.text}
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          ก่อนหน้า
        </Button>
        {current < quiz.questions.length - 1 ? (
          <Button
            variant="gradient"
            disabled={!answers[q.id]}
            onClick={() => setCurrent((c) => c + 1)}
          >
            ถัดไป
          </Button>
        ) : (
          <Button
            variant="gradient"
            disabled={Object.keys(answers).length < quiz.questions.length}
            onClick={handleSubmit}
            className="gap-2"
          >
            <Trophy className="h-4 w-4" /> ส่งคำตอบ
          </Button>
        )}
      </div>
    </div>
  );
}
