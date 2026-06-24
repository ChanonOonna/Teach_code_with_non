"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Settings, Globe, Mail, Shield, Database, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("TeachCode");
  const [siteDesc, setSiteDesc] = useState("แพลตฟอร์มสอนเขียนโปรแกรมออนไลน์");
  const [supportEmail, setSupportEmail] = useState("support@teachcode.dev");
  const [maxFreeEnroll, setMaxFreeEnroll] = useState("3");
  const [dbTesting, setDbTesting] = useState(false);
  const [dbStatus, setDbStatus] = useState<"idle" | "ok" | "error">("idle");

  const handleSave = () => {
    toast.success("บันทึกการตั้งค่าแล้ว");
  };

  const handleDbTest = async () => {
    setDbTesting(true);
    setDbStatus("idle");
    try {
      const res = await fetch("/api/admin/db-test");
      const data = await res.json();
      if (data.success) {
        setDbStatus("ok");
        toast.success(`เชื่อมต่อสำเร็จ — ${data.data.userCount} users, ${data.data.courseCount} courses`);
      } else {
        setDbStatus("error");
        toast.error(data.error ?? "ไม่สามารถเชื่อมต่อได้");
      }
    } catch {
      setDbStatus("error");
      toast.error("เชื่อมต่อฐานข้อมูลล้มเหลว");
    } finally {
      setDbTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">ตั้งค่าระบบ</h1>
        <p className="text-muted-foreground mt-1">กำหนดค่าต่างๆ ของแพลตฟอร์ม</p>
      </div>

      {/* General */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="h-5 w-5 text-primary" /> ทั่วไป
          </CardTitle>
          <CardDescription>ข้อมูลพื้นฐานของแพลตฟอร์ม</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="ชื่อเว็บไซต์"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
          <Input
            label="คำอธิบายเว็บไซต์"
            value={siteDesc}
            onChange={(e) => setSiteDesc(e.target.value)}
          />
          <Input
            label="อีเมลสนับสนุน"
            type="email"
            leftIcon={<Mail className="h-4 w-4" />}
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Enrollment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5 text-primary" /> การลงทะเบียน
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="จำนวนคอร์สฟรีสูงสุดต่อผู้ใช้"
            type="number"
            value={maxFreeEnroll}
            onChange={(e) => setMaxFreeEnroll(e.target.value)}
          />
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">ต้องยืนยันอีเมลก่อนลงทะเบียน</p>
              <p className="text-xs text-muted-foreground">ผู้ใช้ต้องยืนยันอีเมลก่อนเรียน</p>
            </div>
            <Badge variant="success">เปิดใช้</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">อนุญาตให้สมัครสมาชิกใหม่</p>
              <p className="text-xs text-muted-foreground">เปิดหรือปิดการสมัครสมาชิก</p>
            </div>
            <Badge variant="success">เปิดใช้</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" /> ความปลอดภัย
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">JWT Token Expiry</p>
              <p className="text-xs text-muted-foreground">Access Token หมดอายุใน</p>
            </div>
            <Badge variant="outline">15 นาที</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">Refresh Token Expiry</p>
              <p className="text-xs text-muted-foreground">Refresh Token หมดอายุใน</p>
            </div>
            <Badge variant="outline">30 วัน</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">Rate Limiting</p>
              <p className="text-xs text-muted-foreground">จำกัดคำขอต่อนาที</p>
            </div>
            <Badge variant="success">เปิดใช้</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Database */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Database className="h-5 w-5 text-primary" /> ฐานข้อมูล
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
            <div>
              <p className="font-medium text-sm">สถานะ Database</p>
              <p className="text-xs text-muted-foreground font-mono">MySQL — Prisma ORM</p>
            </div>
            <Badge variant={dbStatus === "ok" ? "success" : dbStatus === "error" ? "destructive" : "success"}>
              {dbStatus === "ok" ? "เชื่อมต่อแล้ว" : dbStatus === "error" ? "ข้อผิดพลาด" : "เชื่อมต่อแล้ว"}
            </Badge>
          </div>
          <Button variant="outline" className="w-full gap-2" onClick={handleDbTest} disabled={dbTesting}>
            <Database className="h-4 w-4" /> {dbTesting ? "กำลังทดสอบ..." : "ทดสอบการเชื่อมต่อ"}
          </Button>
        </CardContent>
      </Card>

      <Button variant="gradient" onClick={handleSave} className="gap-2">
        <Save className="h-4 w-4" /> บันทึกการตั้งค่า
      </Button>
    </div>
  );
}
