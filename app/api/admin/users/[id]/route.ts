import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/utils";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await requireAdmin(req);
  if (error || !user) return apiError("Forbidden", 403);
  try {
    const body = await req.json();
    const allowedFields: Record<string, unknown> = {};
    if (typeof body.isActive === "boolean") allowedFields.isActive = body.isActive;
    if (["STUDENT", "INSTRUCTOR", "ADMIN"].includes(body.role)) allowedFields.role = body.role;
    if (Object.keys(allowedFields).length === 0) return apiError("ไม่มีฟิลด์ที่อัพเดต", 400);
    const updated = await prisma.user.update({
      where: { id: params.id },
      data: allowedFields,
    });
    return apiSuccess(updated);
  } catch (err) {
    console.error("[ADMIN USER PATCH]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
