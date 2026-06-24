"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ToggleLeft, ToggleRight, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/hooks/useAuthStore";

interface AdminUser {
  id: string;
  displayName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  _count: { enrollments: number; quizAttempts: number };
}

export default function AdminUsersPage() {
  const { accessToken } = useAuthStore();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/users-list", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(r => r.json())
      .then(d => { if (d.success) setUsers(d.data); })
      .finally(() => setLoading(false));
  }, [accessToken]);

  const toggleActive = async (userId: string, current: boolean) => {
    setToggling(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ isActive: !current }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: !current } : u));
        toast.success(!current ? "เปิดใช้งานบัญชีแล้ว" : "ระงับบัญชีแล้ว");
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setToggling(null);
    }
  };

  const makeAdmin = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "STUDENT" : "ADMIN";
    if (!confirm(`เปลี่ยน role เป็น ${newRole}?`)) return;
    setToggling(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        toast.success(`เปลี่ยน role เป็น ${newRole} แล้ว`);
      } else {
        toast.error(data.error ?? "เกิดข้อผิดพลาด");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setToggling(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">จัดการผู้ใช้</h1>
        <p className="text-muted-foreground mt-1">ผู้ใช้ทั้งหมด {users.length} คน</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> รายชื่อผู้ใช้
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">กำลังโหลด...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">ผู้ใช้</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">คอร์ส</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Quiz</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">สมัครเมื่อ</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">สถานะ</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-sm">{user.displayName}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={
                          user.role === "ADMIN" ? "destructive" :
                          user.role === "INSTRUCTOR" ? "info" : "secondary"
                        }>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{user._count.enrollments}</td>
                      <td className="py-3 px-4 text-sm">{user._count.quizAttempts}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(user.createdAt)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={user.isActive ? "success" : "destructive"}>
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => toggleActive(user.id, user.isActive)}
                            disabled={toggling === user.id}
                            title={user.isActive ? "ระงับบัญชี" : "เปิดใช้งาน"}
                          >
                            {user.isActive
                              ? <ToggleRight className="h-4 w-4 text-green-500" />
                              : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => makeAdmin(user.id, user.role)}
                            disabled={toggling === user.id}
                            title="เปลี่ยน Role"
                          >
                            <Shield className="h-4 w-4 text-primary" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
