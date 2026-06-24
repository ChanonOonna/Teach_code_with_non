import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { submitAssignmentSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth(req);
  if (error || !user) return apiError("Unauthorized", 401);

  try {
    const body = await req.json();
    const parsed = submitAssignmentSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 400);

    const { assignmentId, code, output } = parsed.data;

    const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment) return apiError("ไม่พบ Assignment", 404);

    const submission = await prisma.assignmentSubmission.create({
      data: {
        assignmentId,
        userId: user.id,
        code,
        output: output ?? "",
        status: "PENDING",
      },
    });

    return apiSuccess(submission, "ส่ง Assignment สำเร็จ", 201);
  } catch (err) {
    console.error("[ASSIGNMENT SUBMIT]", err);
    return apiError("เกิดข้อผิดพลาด", 500);
  }
}
