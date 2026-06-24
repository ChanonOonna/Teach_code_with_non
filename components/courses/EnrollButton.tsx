"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/useAuthStore";
import { BookOpen, CheckCircle2, ArrowRight } from "lucide-react";

interface EnrollButtonProps {
  courseId: string;
  courseSlug: string;
  firstLessonSlug?: string;
}

export default function EnrollButton({ courseId, courseSlug, firstLessonSlug }: EnrollButtonProps) {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!accessToken) return;
    setChecking(true);
    fetch(`/api/courses/${courseId}/enrollment`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((r) => r.json())
      .then((data) => setIsEnrolled(data.data?.isEnrolled ?? false))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [courseId, accessToken]);

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/login?redirect=/courses/${courseSlug}`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (data.success) {
        setIsEnrolled(true);
        toast.success("ลงทะเบียนเรียนสำเร็จ! 🎉");
        // Redirect to first lesson immediately
        const target = firstLessonSlug
          ? `/lesson/${firstLessonSlug}`
          : `/courses/${courseSlug}`;
        router.push(target);
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return <Button className="w-full" variant="gradient" size="lg" disabled loading>กำลังโหลด...</Button>;
  }

  if (isEnrolled) {
    return (
      <Button className="w-full" variant="success" size="lg" asChild>
        <a href={firstLessonSlug ? `/lesson/${firstLessonSlug}` : `/courses/${courseSlug}`}>
          <ArrowRight className="w-4 h-4" /> เรียนต่อ
        </a>
      </Button>
    );
  }

  return (
    <Button
      className="w-full shadow-lg shadow-primary/30"
      variant="gradient"
      size="lg"
      loading={loading}
      onClick={handleEnroll}
    >
      <BookOpen className="w-4 h-4" />
      {user ? "ลงทะเบียนเรียนฟรี" : "เข้าสู่ระบบเพื่อเรียน"}
    </Button>
  );
}
