import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return apiSuccess({ notifications, unreadCount });
  } catch (err) {
    console.error("[NOTIFICATIONS GET]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}

export async function PATCH(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);
  try {
    await prisma.notification.updateMany({
      where: { userId: user.id, isRead: false },
      data: { isRead: true },
    });
    return apiSuccess({ message: "อ่านทั้งหมดแล้ว" });
  } catch (err) {
    console.error("[NOTIFICATIONS PATCH]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
