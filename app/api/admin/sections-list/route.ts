import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const sections = await prisma.section.findMany({
      orderBy: [{ course: { order: "asc" } }, { order: "asc" }],
      include: { course: { select: { id: true, title: true } } },
    });
    return apiSuccess(sections);
  } catch (err) {
    console.error("[ADMIN SECTIONS LIST]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
