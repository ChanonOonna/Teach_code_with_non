import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { enrollments: true, quizAttempts: true } } },
    });
    return apiSuccess(users);
  } catch (err) {
    console.error("[ADMIN USERS LIST]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
