"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Save, User, Mail, AtSign, Shield, Settings, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/hooks/useAuthStore";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/validations";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import type { Certificate } from "@/types";

export default function ProfilePage() {
  const { user, accessToken, updateUser } = useAuthStore();
  const [saving, setSaving] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (!accessToken) return;
    fetch("/api/certificates", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(r => r.json())
      .then(data => { if (data.success) setCertificates(data.data ?? []); })
      .catch(() => {});
  }, [accessToken]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      displayName: user?.displayName ?? "",
      bio: user?.bio ?? "",
    },
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h2>
        <Button variant="gradient" asChild><Link href="/login">เข้าสู่ระบบ</Link></Button>
      </div>
    );
  }

  const onSubmit = async (data: UpdateProfileInput) => {
    setSaving(true);
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        updateUser(result.data);
        toast.success("บันทึกโปรไฟล์แล้ว");
      } else {
        toast.error(result.error ?? "เกิดข้อผิดพลาด");
      }
    } finally {
      setSaving(false);
    }
  };

  const roleLabel = { STUDENT: "นักเรียน", INSTRUCTOR: "ผู้สอน", ADMIN: "ผู้ดูแล" }[user.role] ?? "นักเรียน";
  const roleBadge = { STUDENT: "secondary", INSTRUCTOR: "info", ADMIN: "destructive" }[user.role] as "secondary" | "info" | "destructive";

  const initials = user.displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-40 brand-gradient overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute -bottom-1 right-0 left-0 h-8 bg-background rounded-t-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-2xl">
        {/* Avatar row — overlaps banner */}
        <div className="flex items-end justify-between -mt-16 mb-6 relative z-10">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              <AvatarImage src={user.avatar ?? ""} />
              <AvatarFallback className="text-3xl font-extrabold brand-gradient text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary/90 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="pb-2 flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings"><Settings className="h-4 w-4" /> ตั้งค่า</Link>
            </Button>
          </div>
        </div>

        {/* Name + role */}
        <div className="mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-extrabold">{user.displayName}</h1>
            <Badge variant={roleBadge}>{roleLabel}</Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-0.5">
            @{user.username} · เข้าร่วมเมื่อ {formatDate(user.createdAt)}
          </p>
          {user.bio && <p className="mt-2 text-sm leading-relaxed">{user.bio}</p>}
        </div>

        <div className="space-y-5 pb-12">
          {/* Edit Form */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-primary" /> แก้ไขข้อมูลส่วนตัว
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="ชื่อแสดง"
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.displayName?.message}
                  {...register("displayName")}
                />
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Bio (แนะนำตัวเอง)
                  </label>
                  <textarea
                    {...register("bio")}
                    placeholder="เล่าเกี่ยวกับตัวเองสักนิด..."
                    className="w-full h-24 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                  {errors.bio && <p className="mt-1 text-xs text-destructive">{errors.bio.message}</p>}
                </div>
                <Button type="submit" variant="gradient" loading={saving} disabled={!isDirty}>
                  <Save className="h-4 w-4" /> บันทึก
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="h-4 w-4 text-primary" /> ข้อมูลบัญชี
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {[
                  { icon: Mail, label: "อีเมล", value: user.email },
                  { icon: AtSign, label: "Username", value: `@${user.username}` },
                  { icon: Shield, label: "บทบาท", value: roleLabel },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon className="h-4 w-4" /> {label}
                    </div>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/settings">เปลี่ยนรหัสผ่าน</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-4 w-4 text-amber-500" /> ใบประกาศนียบัตร
                {certificates.length > 0 && (
                  <Badge variant="warning" className="ml-auto">{certificates.length} ใบ</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {certificates.length === 0 ? (
                <div className="text-center py-6">
                  <Award className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">ยังไม่มีใบประกาศ — เรียนจบคอร์สเพื่อรับใบประกาศ!</p>
                  <Button variant="gradient" size="sm" className="mt-3" asChild>
                    <Link href="/courses">ไปเรียนเลย</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-3 rounded-xl border bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/50 dark:border-amber-800/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-sm">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{(cert.course as { title: string } | undefined)?.title ?? "คอร์ส"}</p>
                          <p className="text-xs text-muted-foreground">ออกให้เมื่อ {formatDate(cert.issuedAt)}</p>
                        </div>
                      </div>
                      {cert.certificateUrl ? (
                        <Button variant="ghost" size="icon-sm" asChild title="ดูใบประกาศ">
                          <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      ) : (
                        <Badge variant="outline" className="text-xs shrink-0">เสร็จแล้ว</Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
