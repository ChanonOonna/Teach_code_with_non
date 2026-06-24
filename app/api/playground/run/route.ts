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

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();
    if (!code) return apiError("กรุณาใส่โค้ด", 400);

    const lang = language?.toLowerCase() ?? "python";

    // JavaScript/TypeScript runs client-side — handled by CodeEditor directly
    if (["javascript", "js", "jsx"].includes(lang)) {
      return apiError("JavaScript รันใน browser ได้เลย", 400);
    }

    const langId = JUDGE0_LANG[lang];
    if (!langId) return apiError(`ไม่รองรับภาษา ${language}`, 400);

    // Use base64 encoding to safely send Thai and Unicode characters
    const submitRes = await fetch(
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
      }
    );

    if (!submitRes.ok) {
      const errText = await submitRes.text().catch(() => "");
      console.error("[PLAYGROUND] Judge0 error:", submitRes.status, errText);
      return apiError("ไม่สามารถรันโค้ดได้", 500);
    }

    const result = await submitRes.json();

    const stdout = b64decode(result.stdout);
    const stderr = b64decode(result.stderr);
    const compileOutput = b64decode(result.compile_output);

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
