"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";

function GoogleSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) { router.replace("/login?error=google_failed"); return; }

    // ดึงข้อมูล user ด้วย token
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          login(data.data, token);
          router.replace("/dashboard");
        } else {
          router.replace("/login?error=google_failed");
        }
      })
      .catch(() => router.replace("/login?error=google_failed"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 brand-gradient rounded-full mx-auto mb-4 animate-pulse" />
        <p className="text-muted-foreground">กำลังเข้าสู่ระบบ...</p>
      </div>
    </div>
  );
}

export default function GoogleSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">กำลังโหลด...</p>
      </div>
    }>
      <GoogleSuccessHandler />
    </Suspense>
  );
}
