"use client";

import { useState, useCallback } from "react";
import { useAuthStore } from "./useAuthStore";

export function useProgress(lessonId: string) {
  const { accessToken } = useAuthStore();
  const [isCompleting, setIsCompleting] = useState(false);

  const markComplete = useCallback(async () => {
    if (!accessToken || isCompleting) return;
    setIsCompleting(true);
    try {
      await fetch(`/api/progress/lesson/${lessonId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ isCompleted: true }),
      });
    } finally {
      setIsCompleting(false);
    }
  }, [lessonId, accessToken, isCompleting]);

  return { markComplete, isCompleting };
}
