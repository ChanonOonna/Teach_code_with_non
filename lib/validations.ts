import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  username: z
    .string()
    .min(3, "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร")
    .max(30, "ชื่อผู้ใช้ต้องไม่เกิน 30 ตัวอักษร")
    .regex(/^[a-zA-Z0-9_]+$/, "ชื่อผู้ใช้ใช้ได้เฉพาะตัวอักษร ตัวเลข และ _"),
  displayName: z
    .string()
    .min(2, "ชื่อแสดงต้องมีอย่างน้อย 2 ตัวอักษร")
    .max(50, "ชื่อแสดงต้องไม่เกิน 50 ตัวอักษร"),
  password: z
    .string()
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
    .regex(/[A-Z]/, "รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
    .regex(/[0-9]/, "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
  rememberMe: z.boolean().optional(),
});

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, "ชื่อแสดงต้องมีอย่างน้อย 2 ตัวอักษร")
    .max(50, "ชื่อแสดงต้องไม่เกิน 50 ตัวอักษร")
    .optional(),
  bio: z.string().max(500, "Bio ต้องไม่เกิน 500 ตัวอักษร").optional(),
  avatar: z.string().url("URL รูปภาพไม่ถูกต้อง").optional().nullable(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "กรุณากรอกรหัสผ่านปัจจุบัน"),
  newPassword: z
    .string()
    .min(8, "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร")
    .regex(/[A-Z]/, "รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
    .regex(/[0-9]/, "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});

export const quizAnswerSchema = z.object({
  questionId: z.string(),
  choiceId: z.string().optional(),
  textAnswer: z.string().optional(),
});

export const submitQuizSchema = z.object({
  quizId: z.string(),
  answers: z.array(quizAnswerSchema),
  timeSpent: z.number().min(0),
});

export const submitAssignmentSchema = z.object({
  assignmentId: z.string(),
  code: z.string().min(1, "กรุณาเขียนโค้ด"),
  output: z.string().optional(),
});

export const noteSchema = z.object({
  lessonId: z.string(),
  content: z.string().min(1, "กรุณาเขียนโน้ต").max(5000, "โน้ตต้องไม่เกิน 5000 ตัวอักษร"),
});

export const searchSchema = z.object({
  q: z.string().min(1, "กรุณาพิมพ์คำค้นหา").max(100),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(50).optional().default(20),
  language: z.string().optional(),
  level: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;
export type SubmitAssignmentInput = z.infer<typeof submitAssignmentSchema>;
export type NoteInput = z.infer<typeof noteSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
