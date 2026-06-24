import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: { lessonId: string } }) {
  const { user } = await requireAuth(req);
  if (!user) return apiSuccess({ isBookmarked: false });

  try {
    const bookmark = await prisma.bookmark.findUnique({
      where: { userId_lessonId: { userId: user.id, lessonId: params.lessonId } },
    });
    return apiSuccess({ isBookmarked: !!bookmark });
  } catch {
    return apiSuccess({ isBookmarked: false });
  }
}

export async function POST(req: NextRequest, { params }: { params: { lessonId: string } }) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const bookmark = await prisma.bookmark.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId: params.lessonId } },
      update: {},
      create: { userId: user.id, lessonId: params.lessonId },
    });
    return apiSuccess(bookmark);
  } catch {
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { lessonId: string } }) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    await prisma.bookmark.deleteMany({
      where: { userId: user.id, lessonId: params.lessonId },
    });
    return apiSuccess(null, "ลบ Bookmark แล้ว");
  } catch {
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
