import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function apiSuccess<T>(data: T, message?: string, status = 200) {
  return NextResponse.json({ success: true, data, message }, { status });
}

export function apiError(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

export function formatDate(date: Date | string, locale = "th-TH"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} นาที`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} ชั่วโมง ${mins} นาที` : `${hours} ชั่วโมง`;
}

export function formatTimeSpent(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    C: "bg-blue-500",
    CPP: "bg-blue-600",
    JAVASCRIPT: "bg-yellow-500",
    JAVA: "bg-red-500",
    PYTHON: "bg-green-500",
    TYPESCRIPT: "bg-blue-400",
    HTML_CSS: "bg-orange-500",
    REACT: "bg-cyan-500",
    NEXTJS: "bg-gray-800",
    VUE: "bg-emerald-500",
    ANGULAR: "bg-red-600",
    NODEJS: "bg-green-600",
    EXPRESS: "bg-gray-600",
    SQL: "bg-purple-500",
    FLUTTER: "bg-blue-400",
    REACT_NATIVE: "bg-cyan-600",
    DEVOPS: "bg-orange-600",
    GENERAL: "bg-brand-500",
  };
  return colors[language] || "bg-gray-500";
}

export function getLanguageLabel(language: string): string {
  const labels: Record<string, string> = {
    C: "C",
    CPP: "C++",
    JAVASCRIPT: "JavaScript",
    JAVA: "Java",
    PYTHON: "Python",
    TYPESCRIPT: "TypeScript",
    HTML_CSS: "HTML & CSS",
    REACT: "React.js",
    NEXTJS: "Next.js",
    VUE: "Vue.js",
    ANGULAR: "Angular",
    NODEJS: "Node.js",
    EXPRESS: "Express.js",
    SQL: "SQL & Database",
    FLUTTER: "Flutter",
    REACT_NATIVE: "React Native",
    DEVOPS: "DevOps",
    GENERAL: "Programming",
  };
  return labels[language] || language;
}

export function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    BEGINNER: "เริ่มต้น",
    INTERMEDIATE: "กลาง",
    ADVANCED: "ขั้นสูง",
  };
  return labels[level] || level;
}

export function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    BEGINNER: "text-green-500 bg-green-50 dark:bg-green-900/20",
    INTERMEDIATE: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
    ADVANCED: "text-red-500 bg-red-50 dark:bg-red-900/20",
  };
  return colors[level] || "text-gray-500 bg-gray-50";
}

export function getCodeLanguageForEditor(language: string): string {
  const map: Record<string, string> = {
    c: "c",
    cpp: "cpp",
    "c++": "cpp",
    javascript: "javascript",
    js: "javascript",
    typescript: "typescript",
    ts: "typescript",
    python: "python",
    py: "python",
    java: "java",
    html: "html",
    css: "css",
    sql: "sql",
    dart: "dart",
    bash: "bash",
    shell: "bash",
    json: "json",
    yaml: "yaml",
    markdown: "markdown",
    md: "markdown",
  };
  return map[language.toLowerCase()] || "javascript";
}

export function paginate<T>(
  items: T[],
  page: number,
  limit: number
): { items: T[]; total: number; totalPages: number; page: number; limit: number } {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  return { items: items.slice(start, end), total, totalPages, page, limit };
}

export function generateUsername(displayName: string): string {
  const base = slugify(displayName).replace(/-/g, "_");
  const suffix = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");
  return `${base}_${suffix}`;
}

export const LANGUAGE_ICONS: Record<string, string> = {
  C: "🔵",
  CPP: "🔷",
  JAVASCRIPT: "🟡",
  JAVA: "☕",
  PYTHON: "🐍",
  TYPESCRIPT: "📘",
  HTML_CSS: "🌐",
  REACT: "⚛️",
  NEXTJS: "▲",
  VUE: "💚",
  ANGULAR: "🅰️",
  NODEJS: "💚",
  EXPRESS: "⚡",
  SQL: "🗄️",
  FLUTTER: "💙",
  REACT_NATIVE: "📱",
  DEVOPS: "🚀",
  GENERAL: "💻",
};
