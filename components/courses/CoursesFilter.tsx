"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CoursesFilterProps {
  languages: { value: string; label: string }[];
  currentFilters: { lang?: string; level?: string; q?: string };
}

const LEVELS = [
  { value: "BEGINNER", label: "เริ่มต้น" },
  { value: "INTERMEDIATE", label: "กลาง" },
  { value: "ADVANCED", label: "ขั้นสูง" },
];

export default function CoursesFilter({ languages, currentFilters }: CoursesFilterProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentFilters.q ?? "");

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams();
    if (currentFilters.lang) params.set("lang", currentFilters.lang);
    if (currentFilters.level) params.set("level", currentFilters.level);
    if (currentFilters.q) params.set("q", currentFilters.q);

    if (value === null || value === (currentFilters as Record<string, string>)[key]) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/courses?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("q", search || null);
  };

  const clearAll = () => {
    setSearch("");
    router.push("/courses");
  };

  const hasFilters = currentFilters.lang || currentFilters.level || currentFilters.q;

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาคอร์ส..."
          leftIcon={<Search className="h-4 w-4" />}
          className="max-w-md"
        />
        <Button type="submit" variant="default">ค้นหา</Button>
        {hasFilters && (
          <Button type="button" variant="ghost" onClick={clearAll} leftIcon={<X className="h-4 w-4" />}>
            ล้างตัวกรอง
          </Button>
        )}
      </form>

      {/* Language Filter */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">ภาษา:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => updateFilter("lang", lang.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                currentFilters.lang === lang.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted border-border"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Level Filter */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-muted-foreground">ระดับ:</span>
        </div>
        <div className="flex gap-2">
          {LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => updateFilter("level", level.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                currentFilters.level === level.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted border-border"
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
