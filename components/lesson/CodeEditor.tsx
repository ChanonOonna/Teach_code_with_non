"use client";

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { Copy, Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const getExtensions = (language: string) => {
  const lang = language.toLowerCase();
  if (["javascript", "typescript", "js", "ts", "jsx", "tsx"].includes(lang))
    return [javascript({ jsx: true, typescript: lang.includes("ts") })];
  if (["python", "py"].includes(lang)) return [python()];
  if (["java"].includes(lang)) return [java()];
  if (["c", "cpp", "c++", "cc"].includes(lang)) return [cpp()];
  return [javascript()];
};

interface CodeEditorProps {
  initialCode: string;
  language: string;
  readOnly?: boolean;
  height?: string;
  onRun?: (code: string) => void;
  onChange?: (code: string) => void;
  showRunButton?: boolean;
}

export default function CodeEditor({
  initialCode,
  language,
  readOnly = true,
  height = "400px",
  onRun,
  onChange,
  showRunButton = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("คัดลอกโค้ดแล้ว");
  };

  const runJSInBrowser = (src: string): string => {
    const lines: string[] = [];
    const capture = (...args: unknown[]) => {
      lines.push(
        args.map(a => {
          if (a === null) return "null";
          if (a === undefined) return "undefined";
          if (typeof a === "object") {
            try { return JSON.stringify(a, null, 2); } catch { return String(a); }
          }
          return String(a);
        }).join(" ")
      );
    };
    const orig = { log: console.log, error: console.error, warn: console.warn, info: console.info };
    console.log = capture;
    console.error = (...a) => capture("❌", ...a);
    console.warn = (...a) => capture("⚠️", ...a);
    console.info = capture;
    try {
      // eslint-disable-next-line no-new-func
      new Function(src)();
    } catch (e) {
      lines.push(`❌ ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      Object.assign(console, orig);
    }
    return lines.length > 0 ? lines.join("\n") : "(ไม่มี output)";
  };

  const handleRun = async () => {
    if (onRun) { onRun(code); return; }
    setRunning(true);
    setOutput(null);
    const lang = language.toLowerCase();
    const isJS = ["javascript", "js", "typescript", "ts", "jsx", "tsx"].includes(lang);
    if (isJS) {
      // Run directly in browser — instant, no API needed
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

  const handleChange = (value: string) => {
    setCode(value);
    onChange?.(value);
  };

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-end gap-2 bg-gray-900 px-3 py-1.5 border-t border-gray-700">
        {(showRunButton || onRun) && (
          <Button
            size="sm"
            variant="success"
            onClick={handleRun}
            loading={running}
            leftIcon={<Play className="h-3.5 w-3.5" />}
            className="h-7 text-xs"
          >
            รัน
          </Button>
        )}
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handleCopy}
          className="h-7 w-7 text-gray-400 hover:text-white"
          title="คัดลอกโค้ด"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* Editor */}
      <CodeMirror
        value={code}
        height={height}
        theme={oneDark}
        extensions={getExtensions(language)}
        readOnly={readOnly}
        onChange={handleChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          autocompletion: !readOnly,
          syntaxHighlighting: true,
          indentOnInput: true,
        }}
      />

      {/* Output */}
      {output !== null && (
        <div className="border-t border-gray-700 bg-gray-950 p-4">
          <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Output:</div>
          <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
