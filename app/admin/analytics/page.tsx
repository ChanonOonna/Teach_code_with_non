"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { TrendingUp, Users, BookOpen, Trophy } from "lucide-react";

const mockEnrollData = [
  { month: "ม.ค.", enrollments: 45, completions: 12 },
  { month: "ก.พ.", enrollments: 62, completions: 18 },
  { month: "มี.ค.", enrollments: 78, completions: 25 },
  { month: "เม.ย.", enrollments: 55, completions: 20 },
  { month: "พ.ค.", enrollments: 90, completions: 35 },
  { month: "มิ.ย.", enrollments: 110, completions: 42 },
];

const mockCourseData = [
  { name: "Python", students: 234 },
  { name: "JavaScript", students: 189 },
  { name: "React", students: 156 },
  { name: "C Programming", students: 132 },
  { name: "Next.js", students: 98 },
];

const mockStats = [
  { label: "ผู้ใช้ใหม่ (เดือนนี้)", value: "128", change: "+12%", icon: Users, positive: true },
  { label: "การลงทะเบียน (เดือนนี้)", value: "110", change: "+22%", icon: BookOpen, positive: true },
  { label: "Quiz Attempts", value: "892", change: "+8%", icon: Trophy, positive: true },
  { label: "Completion Rate", value: "38%", change: "-3%", icon: TrendingUp, positive: false },
];

export default function AdminAnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">ภาพรวมการใช้งานแพลตฟอร์ม</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <s.icon className="h-5 w-5 text-primary" />
                <span className={`text-xs font-medium ${s.positive ? "text-green-500" : "text-red-500"}`}>
                  {s.change}
                </span>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">การลงทะเบียนรายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={mockEnrollData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="enrollments" name="ลงทะเบียน" stroke="#6366f1" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="completions" name="จบแล้ว" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">คอร์สยอดนิยม</CardTitle>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mockCourseData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                  <Tooltip />
                  <Bar dataKey="students" name="ผู้เรียน" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">กิจกรรมล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "ผู้ใช้ใหม่ลงทะเบียน", detail: "student@email.com", time: "2 นาทีที่แล้ว", color: "bg-green-500" },
              { action: "ลงทะเบียนเรียน Python", detail: "user123", time: "15 นาทีที่แล้ว", color: "bg-blue-500" },
              { action: "ทำ Quiz สำเร็จ 100%", detail: "alice@email.com — C Programming", time: "1 ชั่วโมงที่แล้ว", color: "bg-purple-500" },
              { action: "จบคอร์ส JavaScript", detail: "bob@email.com", time: "3 ชั่วโมงที่แล้ว", color: "bg-orange-500" },
              { action: "ส่ง Assignment", detail: "carol@email.com — React.js", time: "5 ชั่วโมงที่แล้ว", color: "bg-pink-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
