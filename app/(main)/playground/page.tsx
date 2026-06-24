"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CodeEditor from "@/components/lesson/CodeEditor";
import toast from "react-hot-toast";

const STARTER_CODES: Record<string, string> = {
  javascript: `// JavaScript Playground
console.log("Hello, World!");

// ลองเขียนโค้ดของคุณที่นี่
const sum = (a, b) => a + b;
console.log("1 + 2 =", sum(1, 2));`,
  typescript: `// TypeScript Playground
const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};

console.log(greet("TeachCode"));`,
  python: `# Python Playground
print("Hello, World!")

# ลองเขียนโค้ดของคุณที่นี่
def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(f"5! = {factorial(5)}")`,
  java: `// Java Playground
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        // ลองเขียนโค้ดของคุณที่นี่
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("1+2+...+10 = " + sum);
    }
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");

    // ลองเขียนโค้ดของคุณที่นี่
    int i;
    for (i = 1; i <= 5; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;

    // ลองเขียนโค้ดของคุณที่นี่
    for (int i = 1; i <= 5; i++) {
        cout << i << endl;
    }
    return 0;
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")

    // ลองเขียนโค้ดของคุณที่นี่
    for i := 1; i <= 5; i++ {
        fmt.Println(i)
    }
}`,
  rust: `fn main() {
    println!("Hello, World!");

    // ลองเขียนโค้ดของคุณที่นี่
    for i in 1..=5 {
        println!("{}", i);
    }
}`,
};

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

export default function PlaygroundPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(STARTER_CODES["javascript"]);
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(STARTER_CODES[lang] ?? `// ${lang} Playground\n`);
    setOutput(null);
  };

  const runJSInBrowser = (src: string): string => {
    const lines: string[] = [];
    const capture = (...args: unknown[]) => {
      lines.push(args.map(a => {
        if (a === null) return "null";
        if (a === undefined) return "undefined";
        if (typeof a === "object") { try { return JSON.stringify(a, null, 2); } catch { return String(a); } }
        return String(a);
      }).join(" "));
    };
    const orig = { log: console.log, error: console.error, warn: console.warn, info: console.info };
    console.log = capture;
    console.error = (...a: unknown[]) => capture("❌", ...a);
    console.warn = (...a: unknown[]) => capture("⚠️", ...a);
    console.info = capture;
    try { new Function(src)(); }
    catch (e) { lines.push(`❌ ${e instanceof Error ? e.message : String(e)}`); }
    finally { Object.assign(console, orig); }
    return lines.length > 0 ? lines.join("\n") : "(ไม่มี output)";
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput(null);
    const lang = language.toLowerCase();
    if (["javascript", "js", "typescript", "ts"].includes(lang)) {
      setTimeout(() => {
        setOutput(runJSInBrowser(code));
        setRunning(false);
      }, 50);
      return;
    }
    try {
      const res = await fetch("/api/playground/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      setOutput(data.data?.output ?? data.error ?? "ไม่มี output");
    } catch {
      setOutput("เกิดข้อผิดพลาดในการรันโค้ด");
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    setCode(STARTER_CODES[language] ?? "");
    setOutput(null);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("คัดลอกโค้ดแล้ว");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Code Playground</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            เขียนและรันโค้ดได้ทันที รองรับ {LANGUAGES.length} ภาษา
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={handleReset} title="รีเซ็ต">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCopy} title="คัดลอก">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="gradient" onClick={handleRun} loading={running} leftIcon={<Play className="h-4 w-4" />}>
            รัน
          </Button>
        </div>
      </div>

      {/* Editor + Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-220px)]">
        {/* Editor */}
        <div className="border rounded-xl overflow-hidden flex flex-col">
          <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-3 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-300 text-sm">Editor</span>
            <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs ml-auto">
              {LANGUAGES.find((l) => l.value === language)?.label}
            </Badge>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              initialCode={code}
              language={language}
              readOnly={false}
              height="100%"
              onChange={setCode}
            />
          </div>
        </div>

        {/* Output */}
        <div className="border rounded-xl overflow-hidden flex flex-col">
          <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-3 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <div className="w-3 h-3 rounded-full bg-gray-600" />
            </div>
            <span className="text-gray-300 text-sm">Output</span>
          </div>
          <div className="flex-1 bg-gray-950 p-4 overflow-auto">
            {running ? (
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">กำลังรันโค้ด...</span>
              </div>
            ) : output !== null ? (
              <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600 text-sm">
                กด Run เพื่อดู output
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
