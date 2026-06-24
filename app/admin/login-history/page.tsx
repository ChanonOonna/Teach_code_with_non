"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/hooks/useAuthStore";
import {
  LogIn, Users, Globe, KeyRound, Calendar, RefreshCw,
  ChevronLeft, ChevronRight, Search, Monitor,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";

interface LoginEntry {
  id: string;
  method: string;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
  user: {
    id: string;
    displayName: string;
    email: string;
    avatar: string | null;
    role: string;
  };
}

interface Stats {
  totalLogins: number;
  googleLogins: number;
  passwordLogins: number;
  uniqueUsers: number;
  todayLogins: number;
}

function parseBrowser(ua: string | null): string {
  if (!ua) return "ไม่ทราบ";
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  return "Browser อื่น";
}

function parseOS(ua: string | null): string {
  if (!ua) return "";
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "OS อื่น";
}

export default function AdminLoginHistoryPage() {
  const { accessToken } = useAuthStore();
  const [history, setHistory] = useState<LoginEntry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [methodFilter, setMethodFilter] = useState<"" | "google" | "password">("");
  const [searchEmail, setSearchEmail] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);

    const params = new URLSearchParams({ page: String(page), limit: "50" });
    if (methodFilter) params.set("method", methodFilter);

    fetch(`/api/admin/login-history?${params}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setHistory(data.data.history);
          setStats(data.data.stats);
          setTotalPages(data.data.pagination.totalPages);
          setTotal(data.data.pagination.total);
        }
      })
      .finally(() => setLoading(false));
  }, [accessToken, page, methodFilter, refreshKey]);

  const filtered = searchEmail
    ? history.filter(h =>
        h.user.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
        h.user.displayName.toLowerCase().includes(searchEmail.toLowerCase())
      )
    : history;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ประวัติการ Login</h1>
          <p className="text-muted-foreground mt-1">ติดตามว่าใครเข้ามาบ้าง</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setRefreshKey(k => k + 1)}>
          <RefreshCw className="h-4 w-4" /> รีเฟรช
        </Button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Login ทั้งหมด", value: stats.totalLogins, icon: LogIn, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "วันนี้", value: stats.todayLogins, icon: Calendar, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
            { label: "ผู้ใช้ที่ login", value: stats.uniqueUsers, icon: Users, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
            { label: "Google Login", value: stats.googleLogins, icon: Globe, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
            { label: "Password Login", value: stats.passwordLogins, icon: KeyRound, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center shrink-0`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <div className="text-xl font-bold">{s.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาอีเมลหรือชื่อ..."
              value={searchEmail}
              onChange={e => setSearchEmail(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {(["", "google", "password"] as const).map(m => (
              <Button
                key={m}
                size="sm"
                variant={methodFilter === m ? "default" : "outline"}
                onClick={() => { setMethodFilter(m); setPage(1); }}
              >
                {m === "" ? "ทั้งหมด" : m === "google" ? "🔵 Google" : "🔑 Password"}
              </Button>
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-auto">{total.toLocaleString()} รายการ</span>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5 text-primary" /> รายการ Login
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">กำลังโหลด...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">ไม่มีข้อมูล</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    {["ผู้ใช้", "วิธีการ Login", "Browser / OS", "IP Address", "เมื่อ"].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map(entry => (
                    <tr key={entry.id} className="hover:bg-muted/30 transition-colors">
                      {/* User */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={entry.user.avatar ?? ""} />
                            <AvatarFallback className="text-xs brand-gradient text-white">
                              {entry.user.displayName.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{entry.user.displayName}</p>
                            <p className="text-xs text-muted-foreground">{entry.user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Method */}
                      <td className="py-3 px-4">
                        {entry.method === "google" ? (
                          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 gap-1.5">
                            <Globe className="h-3 w-3" /> Google
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300 gap-1.5">
                            <KeyRound className="h-3 w-3" /> Password
                          </Badge>
                        )}
                      </td>

                      {/* Browser / OS */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{parseBrowser(entry.userAgent)}</span>
                          {entry.userAgent && (
                            <span className="text-muted-foreground text-xs">/ {parseOS(entry.userAgent)}</span>
                          )}
                        </div>
                      </td>

                      {/* IP */}
                      <td className="py-3 px-4">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {entry.ip ?? "-"}
                        </code>
                      </td>

                      {/* Time */}
                      <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true, locale: th })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">หน้า {page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
