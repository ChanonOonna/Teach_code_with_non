"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus, Mail, Lock, User, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/hooks/useAuthStore";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        login(result.data.user, result.data.accessToken);
        toast.success("สมัครสมาชิกสำเร็จ! ยินดีต้อนรับสู่ TeachCode");
        router.push("/courses");
      } else {
        toast.error(result.error ?? "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">สมัครสมาชิกฟรี</h1>
        <p className="text-muted-foreground">เริ่มต้นการเรียนรู้โปรแกรมมิ่งได้เลยทันที</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="ชื่อแสดง"
          type="text"
          placeholder="ชื่อของคุณ"
          leftIcon={<User className="h-4 w-4" />}
          error={errors.displayName?.message}
          {...register("displayName")}
        />
        <Input
          label="ชื่อผู้ใช้"
          type="text"
          placeholder="username_ของคุณ"
          leftIcon={<AtSign className="h-4 w-4" />}
          error={errors.username?.message}
          {...register("username")}
        />
        <Input
          label="อีเมล"
          type="email"
          placeholder="your@email.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="รหัสผ่าน"
          type={showPassword ? "text" : "password"}
          placeholder="อย่างน้อย 8 ตัว มีตัวใหญ่และตัวเลข"
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted-foreground hover:text-foreground transition-colors">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="ยืนยันรหัสผ่าน"
          type={showConfirm ? "text" : "password"}
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-muted-foreground hover:text-foreground transition-colors">
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          variant="gradient"
          className="w-full shadow-lg shadow-primary/30"
          size="lg"
          loading={isSubmitting}
        >
          <UserPlus className="h-4 w-4" /> สมัครสมาชิกฟรี
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">มีบัญชีแล้ว?</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" asChild>
        <Link href="/login">เข้าสู่ระบบ</Link>
      </Button>

      <p className="mt-5 text-xs text-center text-muted-foreground leading-relaxed">
        การสมัครสมาชิกหมายความว่าคุณยอมรับ{" "}
        <Link href="/terms" className="text-primary hover:underline">ข้อกำหนดการใช้งาน</Link>
        {" "}และ{" "}
        <Link href="/privacy" className="text-primary hover:underline">นโยบายความเป็นส่วนตัว</Link>
      </p>
    </div>
  );
}
