"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
        // Dev mode: show reset link directly
        if (data.data?.resetUrl) setDevLink(data.data.resetUrl);
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">ส่งลิงก์แล้ว!</h1>
        <p className="text-muted-foreground text-sm mb-6">
          หากอีเมล <strong>{email}</strong> มีในระบบ คุณจะได้รับลิงก์รีเซ็ตรหัสผ่านภายในไม่กี่นาที
        </p>

        {/* Dev mode: show reset link */}
        {devLink && (
          <div className="mb-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200 text-left">
            <p className="text-xs font-semibold text-yellow-700 mb-2">🛠 Dev Mode — Reset Link:</p>
            <Link href={devLink} className="text-xs text-blue-600 hover:underline break-all">
              {devLink}
            </Link>
          </div>
        )}

        <Link href="/login">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="h-4 w-4" /> กลับไปหน้าเข้าสู่ระบบ
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">ลืมรหัสผ่าน?</h1>
        <p className="text-muted-foreground text-sm">
          กรอกอีเมลที่ใช้สมัคร เราจะส่งลิงก์รีเซ็ตรหัสผ่านให้คุณ
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="อีเมล"
          type="email"
          placeholder="your@email.com"
          leftIcon={<Mail className="h-4 w-4" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />

        <Button
          type="submit"
          variant="gradient"
          className="w-full shadow-lg shadow-primary/30"
          size="lg"
          loading={loading}
        >
          <Mail className="h-4 w-4" /> ส่งลิงก์รีเซ็ตรหัสผ่าน
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> กลับไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
}
