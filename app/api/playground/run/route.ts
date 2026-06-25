import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/utils";

// Judge0 CE — free, no key required for basic usage
const JUDGE0_API = "https://ce.judge0.com";

const JUDGE0_LANG: Record<string, number> = {
  python: 71,
  py: 71,
  java: 62,
  c: 50,
  cpp: 54,
  "c++": 54,
  go: 60,
  rust: 73,
  php: 68,
  ruby: 72,
  kotlin: 78,
  swift: 83,
  csharp: 51,
  "c#": 51,
  cs: 51,
  bash: 46,
  typescript: 74,
  ts: 74,
};

function b64encode(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64");
}

function b64decode(str: string | null | undefined): string {
  if (!str) return "";
  return Buffer.from(str, "base64").toString("utf-8");
}

// Judge0 status_id reference
const JUDGE0_STATUS: Record<number, string> = {
  5: "⏱️ Time Limit Exceeded",
  6: "❌ Compilation Error",
  7: "❌ Runtime Error (SIGSEGV)",
  8: "❌ Runtime Error (SIGFPE)",
  9: "❌ Runtime Error (SIGABRT)",
  10: "❌ Runtime Error (NZEC)",
  11: "❌ Runtime Error (Other)",
  12: "❌ Runtime Error (Internal)",
  13: "❌ Internal Error",
  14: "❌ Exec Format Error",
};

const FETCH_TIMEOUT_MS = 15_000;
const MAX_CODE_LENGTH = 50_000;

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();
    if (!code) return apiError("กรุณาใส่โค้ด", 400);
    if (code.length > MAX_CODE_LENGTH) return apiError("โค้ดยาวเกินไป (สูงสุด 50,000 ตัวอักษร)", 400);

    const lang = language?.toLowerCase() ?? "python";

    // JavaScript/TypeScript runs client-side — handled by CodeEditor directly
    if (["javascript", "js", "jsx"].includes(lang)) {
      return apiError("JavaScript รันใน browser ได้เลย", 400);
    }

    const langId = JUDGE0_LANG[lang];
    if (!langId) return apiError(`ไม่รองรับภาษา ${language}`, 400);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let submitRes: Response;
    try {
      // Use base64 encoding to safely send Thai and Unicode characters
      submitRes = await fetch(
        `${JUDGE0_API}/submissions?base64_encoded=true&wait=true`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: b64encode(code),
            language_id: langId,
            stdin: "",
            cpu_time_limit: 5,
            memory_limit: 128000,
          }),
          signal: controller.signal,
        }
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return apiError("การรันโค้ดใช้เวลานานเกินไป กรุณาลองใหม่", 504);
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }

    if (!submitRes.ok) {
      const errText = await submitRes.text().catch(() => "");
      console.error("[PLAYGROUND] Judge0 error:", submitRes.status, errText);
      return apiError("ไม่สามารถรันโค้ดได้", 500);
    }

    const result = await submitRes.json();

    const statusId: number = result.status?.id ?? 0;
    const stdout = b64decode(result.stdout);
    const stderr = b64decode(result.stderr);
    const compileOutput = b64decode(result.compile_output);

    // statusId 3 = Accepted, 4 = Wrong Answer (treated as normal output)
    if (statusId >= 5 && JUDGE0_STATUS[statusId]) {
      const detail = compileOutput || stderr || "";
      const output = `${JUDGE0_STATUS[statusId]}${detail ? `\n${detail}` : ""}`;
      return apiSuccess({ output: output.trim(), exitCode: result.exit_code ?? 1, language: lang, time: result.time });
    }

    let output = stdout;
    if (compileOutput) output += (output ? "\n" : "") + `⚠️ Compile:\n${compileOutput}`;
    if (stderr) output += (output ? "\n" : "") + `❌ Error:\n${stderr}`;
    if (!output) output = "(ไม่มี output)";

    return apiSuccess({
      output: output.trim(),
      exitCode: result.exit_code ?? 0,
      language: lang,
      time: result.time,
    });
  } catch (err) {
    console.error("[PLAYGROUND RUN]", err);
    return apiError("เกิดข้อผิดพลาดในการรันโค้ด", 500);
  }
}
