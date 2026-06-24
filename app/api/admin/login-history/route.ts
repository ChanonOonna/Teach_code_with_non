import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError(error ?? "Unauthorized", 401);

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "50"));
  const method = searchParams.get("method") ?? undefined; // "google" | "password"
  const userId = searchParams.get("userId") ?? undefined;

  const where = {
    ...(method && { method }),
    ...(userId && { userId }),
  };

  const [history, total] = await Promise.all([
    prisma.loginHistory.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
            avatar: true,
            role: true,
          },
        },
      },
    }),
    prisma.loginHistory.count({ where }),
  ]);

  // Stats
  const [totalLogins, googleLogins, passwordLogins, uniqueUsers, todayLogins] = await Promise.all([
    prisma.loginHistory.count(),
    prisma.loginHistory.count({ where: { method: "google" } }),
    prisma.loginHistory.count({ where: { method: "password" } }),
    prisma.loginHistory.groupBy({ by: ["userId"] }).then(r => r.length),
    prisma.loginHistory.count({
      where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
    }),
  ]);

  return apiSuccess({
    history,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    stats: {
      totalLogins,
      googleLogins,
      passwordLogins,
      uniqueUsers,
      todayLogins,
    },
  });
}
