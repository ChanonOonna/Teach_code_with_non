"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, BookOpen, FileText,
  HelpCircle, BarChart3, Settings, Code2, LogOut, History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "ผู้ใช้", icon: Users },
  { href: "/admin/courses", label: "คอร์ส", icon: BookOpen },
  { href: "/admin/lessons", label: "บทเรียน", icon: FileText },
  { href: "/admin/quizzes", label: "Quiz", icon: HelpCircle },
  { href: "/admin/login-history", label: "Login History", icon: History },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "ตั้งค่า", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <aside className="w-64 shrink-0 border-r bg-background flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm brand-gradient-text">TeachCode</span>
            <p className="text-[10px] text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "sidebar-item",
                isActive ? "active" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t">
        <Link href="/" className="sidebar-item text-muted-foreground mb-1 block">
          <BookOpen className="h-4 w-4" /> ดูเว็บไซต์
        </Link>
        <button onClick={handleLogout} className="sidebar-item text-destructive w-full">
          <LogOut className="h-4 w-4" /> ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}
