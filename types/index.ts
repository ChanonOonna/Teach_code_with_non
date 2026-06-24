// ============ USER TYPES ============
export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string | null;
  bio?: string | null;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic {
  id: string;
  username: string;
  displayName: string;
  avatar?: string | null;
  bio?: string | null;
  role: UserRole;
  createdAt: Date;
}

export interface AuthUser extends User {
  accessToken: string;
  refreshToken: string;
}

// ============ COURSE TYPES ============
export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type Language =
  | "C" | "CPP" | "JAVASCRIPT" | "JAVA" | "PYTHON"
  | "TYPESCRIPT" | "HTML_CSS" | "REACT" | "NEXTJS"
  | "VUE" | "ANGULAR" | "NODEJS" | "EXPRESS"
  | "SQL" | "FLUTTER" | "REACT_NATIVE" | "DEVOPS" | "GENERAL";

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  language: Language;
  level: Level;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  totalLessons: number;
  totalQuizzes: number;
  estimatedHours: number;
  createdAt: Date;
  updatedAt: Date;
  sections?: Section[];
  _count?: { enrollments: number };
}

export interface Section {
  id: string;
  courseId: string;
  title: string;
  description?: string | null;
  order: number;
  lessons?: Lesson[];
}

// ============ LESSON TYPES ============
export type LessonType = "TEXT" | "VIDEO" | "INTERACTIVE" | "PROJECT";

export interface Lesson {
  id: string;
  sectionId: string;
  slug: string;
  title: string;
  content: string;
  videoUrl?: string | null;
  duration: number;
  order: number;
  type: LessonType;
  isPublished: boolean;
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
  codeExamples?: CodeExample[];
  quizzes?: Quiz[];
  assignments?: Assignment[];
}

export interface CodeExample {
  id: string;
  lessonId: string;
  title: string;
  code: string;
  language: string;
  explanation?: string | null;
  order: number;
}

// ============ PROGRESS TYPES ============
export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "DROPPED";

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  completedAt?: Date | null;
  progress: number;
  status: EnrollmentStatus;
  course?: Course;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt?: Date | null;
  timeSpent: number;
}

// ============ QUIZ TYPES ============
export type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER" | "CODE";

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description?: string | null;
  passingScore: number;
  timeLimit?: number | null;
  questions?: Question[];
  attempts?: QuizAttempt[];
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  type: QuestionType;
  explanation?: string | null;
  order: number;
  points: number;
  choices?: Choice[];
}

export interface Choice {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  isPassed: boolean;
  startedAt: Date;
  completedAt?: Date | null;
  timeSpent: number;
  answers?: Answer[];
}

export interface Answer {
  id: string;
  attemptId: string;
  questionId: string;
  choiceId?: string | null;
  textAnswer?: string | null;
  isCorrect: boolean;
}

// ============ ASSIGNMENT TYPES ============
export type SubmissionStatus = "PENDING" | "GRADED" | "RETURNED";

export interface Assignment {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  starterCode?: string | null;
  language: string;
  expectedOutput?: string | null;
  hints?: string | null;
  dueDate?: Date | null;
  maxScore: number;
  submissions?: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  code: string;
  output?: string | null;
  score?: number | null;
  feedback?: string | null;
  status: SubmissionStatus;
  submittedAt: Date;
  gradedAt?: Date | null;
}

// ============ ACHIEVEMENT TYPES ============
export type AchievementType =
  | "LESSON_COMPLETE" | "COURSE_COMPLETE" | "QUIZ_PERFECT"
  | "STREAK" | "SPEED" | "SPECIAL";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: AchievementType;
  condition: string;
  points: number;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievement: Achievement;
  earnedAt: Date;
}

// ============ NOTIFICATION TYPES ============
export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ACHIEVEMENT" | "REMINDER";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string | null;
  createdAt: Date;
}

// ============ API TYPES ============
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ============ DASHBOARD TYPES ============
export interface DashboardStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalLessonsCompleted: number;
  totalQuizzesTaken: number;
  averageQuizScore: number;
  totalTimeSpent: number;
  streakDays: number;
  totalPoints: number;
  achievements: UserAchievement[];
  recentActivity: RecentActivity[];
  weeklyProgress: WeeklyProgress[];
}

export interface RecentActivity {
  id: string;
  type: "LESSON" | "QUIZ" | "ASSIGNMENT" | "ACHIEVEMENT";
  title: string;
  description: string;
  timestamp: Date;
  link?: string;
}

export interface WeeklyProgress {
  day: string;
  lessonsCompleted: number;
  timeSpent: number;
}

// ============ CERTIFICATE TYPES ============
export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: Date;
  certificateUrl?: string | null;
  course?: Course;
}

// ============ SEARCH TYPES ============
export interface SearchResult {
  courses: Course[];
  lessons: Lesson[];
  total: number;
}

// ============ NOTE TYPES ============
export interface Note {
  id: string;
  userId: string;
  lessonId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  lessonId: string;
  lesson?: Lesson;
  createdAt: Date;
}
