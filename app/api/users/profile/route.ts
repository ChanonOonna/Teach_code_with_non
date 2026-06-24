import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { updateProfileSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/utils";

export async function PUT(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 400);

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: parsed.data,
      select: {
        id: true, email: true, username: true, displayName: true,
        avatar: true, bio: true, role: true, isActive: true,
        emailVerified: true, createdAt: true, updatedAt: true,
      },
    });

    return apiSuccess(updated, "อัปเดตโปรไฟล์แล้ว");
  } catch (err) {
    console.error("[PROFILE UPDATE]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
