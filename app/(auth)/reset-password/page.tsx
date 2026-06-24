"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenEmail, setTokenEmail] = useState("");

  useEffect(() => {
    if (!token) { setTokenValid(false); return; }
    fetch(`/api/auth/reset-password?token=${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) { setTokenValid(true); setTokenEmail(data.data?.email ?? ""); }
        else setTokenValid(false);
      })
      .catch(() => setTokenValid(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { toast.error("รหัสผ่านไม่ตรงกัน"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
        toast.success("เปลี่ยนรหัสผ่านสำเร็จ!");
        setTimeout(() => router.push("/login"), 2500);
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === null) {
    return <div className="text-center text-muted-foreground">กำลังตรวจสอบ...</div>;
  }

  if (tokenValid === false) {
    return (
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">ลิงก์ไม่ถูกต้อง</h1>
        <p className="text-muted-foreground text-sm mb-6">ลิงก์รีเซ็ตรหัสผ่านนี้ไม่ถูกต้องหรือหมดอายุแล้ว</p>
        <Link href="/forgot-password">
          <Button variant="gradient" className="w-full">ขอลิงก์ใหม่</Button>
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">เปลี่ยนรหัสผ่านสำเร็จ!</h1>
        <p className="text-muted-foreground text-sm">กำลังพาคุณไปหน้าเข้าสู่ระบบ...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">ตั้งรหัสผ่านใหม่</h1>
        {tokenEmail && (
          <p className="text-muted-foreground text-sm">สำหรับบัญชี <strong>{tokenEmail}</strong></p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="รหัสผ่านใหม่"
          type={showPw ? "text" : "password"}
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button type="button" onClick={() => setShowPw(!showPw)} className="text-muted-foreground hover:text-foreground transition-colors">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
        />
        <Input
          label="ยืนยันรหัสผ่านใหม่"
          type={showPw ? "text" : "password"}
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <p className="text-xs text-muted-foreground">รหัสผ่านต้องมีอย่างน้อย 8 ตัว มีตัวพิมพ์ใหญ่และตัวเลข</p>

        <Button
          type="submit"
          variant="gradient"
          className="w-full shadow-lg shadow-primary/30"
          size="lg"
          loading={loading}
        >
          <Lock className="h-4 w-4" /> เปลี่ยนรหัสผ่าน
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center text-muted-foreground">กำลังโหลด...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
