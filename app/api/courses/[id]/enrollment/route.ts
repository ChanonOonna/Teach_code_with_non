import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiSuccess({ isEnrolled: false });

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: params.id } },
    });
    return apiSuccess({ isEnrolled: !!enrollment, enrollment });
  } catch {
    return apiSuccess({ isEnrolled: false });
  }
}
