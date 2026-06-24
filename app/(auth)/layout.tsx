import Link from "next/link";
import { Code2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden brand-gradient items-center justify-center p-12">
        {/* Decorative blobs */}
        <div className="absolute w-96 h-96 rounded-full bg-white/10 -top-20 -left-20 blur-2xl" />
        <div className="absolute w-72 h-72 rounded-full bg-white/10 bottom-10 right-0 blur-2xl" />
        <div className="absolute w-48 h-48 rounded-full bg-white/10 top-1/2 left-1/2 blur-xl" />

        <div className="relative text-white max-w-md">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight">TeachCode</span>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-5">
            เรียนโปรแกรมมิ่ง<br />ครบทุกภาษา
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            ไม่ว่าจะเป็น Python, JavaScript, C++ หรือ Flutter
            เริ่มต้นได้เลยตั้งแต่พื้นฐาน พร้อม Code Playground แบบ Real-time
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "10,000+ นักเรียน" },
              { label: "500+ บทเรียน" },
              { label: "17 คอร์ส" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-2 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm text-sm font-medium">
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 flex flex-col">
        {/* Top logo (mobile only) */}
        <header className="lg:hidden p-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 brand-gradient rounded-xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl brand-gradient-text">TeachCode</span>
          </Link>
        </header>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
