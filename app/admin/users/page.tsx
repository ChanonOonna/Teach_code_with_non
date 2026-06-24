export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { enrollments: true, quizAttempts: true } },
    },
  });

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
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.isActive ? "success" : "destructive"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
