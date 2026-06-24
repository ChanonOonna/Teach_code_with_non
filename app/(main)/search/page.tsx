"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, BookOpen, FileText, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getLanguageLabel, LANGUAGE_ICONS } from "@/lib/utils";
import type { SearchResult } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      doSearch(q);
    }
  }, [searchParams]);

  const doSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.success) setResults(data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">ค้นหา</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาคอร์สหรือบทเรียน..."
          leftIcon={<Search className="h-4 w-4" />}
          className="text-base"
        />
        <Button type="submit" variant="gradient" loading={loading}>ค้นหา</Button>
      </form>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      )}

      {!loading && results && (
        <div className="space-y-8">
          {/* Total */}
          <p className="text-sm text-muted-foreground">
            พบ <strong>{results.total}</strong> ผลลัพธ์สำหรับ &ldquo;{searchParams.get("q")}&rdquo;
          </p>

          {/* Courses */}
          {results.courses.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> คอร์ส ({results.courses.length})
              </h2>
              <div className="space-y-3">
                {results.courses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.slug}`}>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 brand-gradient rounded-xl flex items-center justify-center text-xl shrink-0">
                          {LANGUAGE_ICONS[course.language] ?? "💻"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {course.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge variant="secondary" className="text-[10px]">
                              {getLanguageLabel(course.language)}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <BookOpen className="h-3 w-3" /> {course.totalLessons} บทเรียน
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Lessons */}
          {results.lessons.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> บทเรียน ({results.lessons.length})
              </h2>
              <div className="space-y-3">
                {results.lessons.map((lesson) => (
                  <Link key={lesson.id} href={`/lesson/${lesson.slug}`}>
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-sm hover:text-primary transition-colors">
                              {lesson.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {(lesson as { section?: { course?: { title?: string } } }).section?.course?.title}
                            </p>
                          </div>
                          {lesson.duration > 0 && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                              <Clock className="h-3 w-3" /> {lesson.duration}m
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.total === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">ไม่พบผลลัพธ์</h3>
              <p className="text-muted-foreground">ลองค้นหาด้วยคำอื่น</p>
            </div>
          )}
        </div>
      )}

      {!loading && !results && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p>พิมพ์คำค้นหาเพื่อเริ่มต้น</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
