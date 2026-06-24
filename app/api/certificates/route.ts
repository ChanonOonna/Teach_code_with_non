import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("กรุณาเข้าสู่ระบบ", 401);
  try {

    const certificates = await prisma.certificate.findMany({
      where: { userId: user.id },
      include: { course: { select: { title: true, slug: true, language: true, level: true } } },
      orderBy: { issuedAt: "desc" },
    });

    return apiSuccess(certificates);
  } catch (err) {
    console.error("[CERTIFICATES GET]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
