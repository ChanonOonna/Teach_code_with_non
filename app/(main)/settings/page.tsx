"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Sun, Moon, Monitor, Bell, Shield, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthStore } from "@/hooks/useAuthStore";
import { changePasswordSchema, type ChangePasswordInput } from "@/lib/validations";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, accessToken } = useAuthStore();
  const [changingPassword, setChangingPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordInput>({ resolver: zodResolver(changePasswordSchema) });

  const onChangePassword = async (data: ChangePasswordInput) => {
    setChangingPassword(true);
    try {
      const res = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
        reset();
      } else {
        toast.error(result.error ?? "เกิดข้อผิดพลาด");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="min-h-screen">
      {/* Banner header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/60 via-background to-muted/40 border-b">
        <div className="absolute inset-0 dot-pattern opacity-20 dark:opacity-10" />
        <div className="container mx-auto px-4 py-10 relative max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight">ตั้งค่า</h1>
          <p className="text-muted-foreground mt-1.5">จัดการบัญชีและการตั้งค่าของคุณ</p>
        </div>
      </div>
    <div className="container mx-auto px-4 py-8 max-w-2xl">

      <div className="space-y-6">
        {/* Theme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" /> ธีม
            </CardTitle>
            <CardDescription>เลือกธีมที่คุณชอบ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {themes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                    theme === value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Icon className={cn("h-6 w-6", theme === value ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", theme === value ? "text-primary" : "")}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" /> เปลี่ยนรหัสผ่าน
            </CardTitle>
            <CardDescription>ตั้งรหัสผ่านใหม่ที่ปลอดภัยยิ่งขึ้น</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4">
              <Input
                label="รหัสผ่านปัจจุบัน"
                type="password"
                leftIcon={<Lock className="h-4 w-4" />}
                error={errors.currentPassword?.message}
                {...register("currentPassword")}
              />
              <Input
                label="รหัสผ่านใหม่"
                type="password"
                leftIcon={<Lock className="h-4 w-4" />}
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />
              <Input
                label="ยืนยันรหัสผ่านใหม่"
                type="password"
                leftIcon={<Lock className="h-4 w-4" />}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
              <Button
                type="submit"
                variant="gradient"
                loading={isSubmitting || changingPassword}
                leftIcon={<Save className="h-4 w-4" />}
              >
                เปลี่ยนรหัสผ่าน
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> การแจ้งเตือน
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "แจ้งเตือนเมื่อมีบทเรียนใหม่", description: "รับข่าวสารเมื่อมีเนื้อหาอัปเดต" },
              { label: "แจ้งเตือน Achievement", description: "รับแจ้งเตือนเมื่อปลดล็อก Achievement" },
              { label: "อีเมลสรุปรายสัปดาห์", description: "รับรายงานความก้าวหน้าทุกสัปดาห์" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" /> Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5">
              <div>
                <p className="font-medium text-sm text-destructive">ลบบัญชี</p>
                <p className="text-xs text-muted-foreground">การกระทำนี้ไม่สามารถยกเลิกได้</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                leftIcon={<Trash2 className="h-4 w-4" />}
                onClick={() => toast.error("กรุณาติดต่อ Support เพื่อลบบัญชี")}
              >
                ลบบัญชี
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
