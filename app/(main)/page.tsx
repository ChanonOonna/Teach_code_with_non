import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Code2, BookOpen, Users, Award, Zap,
  TrendingUp, Globe, Cpu, Database, Smartphone,
  CheckCircle2, Sparkles, Terminal, Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import CourseCard from "@/components/courses/CourseCard";
import { LANGUAGE_ICONS, getLanguageLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "TeachCode — แพลตฟอร์มเรียนโปรแกรมมิ่งครบวงจร",
  description: "เรียนรู้ Programming และ Web Development ครบทุกภาษา พร้อม Interactive Code Playground",
};

const LANGS = ["C", "CPP", "PYTHON", "JAVASCRIPT", "JAVA", "REACT", "NEXTJS", "VUE", "SQL", "FLUTTER"] as const;

const features = [
  { icon: Terminal, title: "Code Playground", desc: "เขียนและรันโค้ดได้ทันทีในเบราว์เซอร์ รองรับ 10+ ภาษา", gradient: "from-blue-500 to-cyan-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
  { icon: BookOpen, title: "บทเรียนครบครัน", desc: "มากกว่า 500 บทเรียน ตั้งแต่พื้นฐานจนถึงระดับสูง พร้อมตัวอย่างโค้ด", gradient: "from-violet-500 to-purple-400", bg: "bg-violet-50 dark:bg-violet-950/40" },
  { icon: Award, title: "Quiz & Assignment", desc: "ทดสอบความเข้าใจทุกบท พร้อม Feedback และคะแนน", gradient: "from-amber-500 to-yellow-400", bg: "bg-amber-50 dark:bg-amber-950/40" },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Dashboard แสดงสถิติ, Streak และ Achievement ที่ปลดล็อก", gradient: "from-emerald-500 to-green-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  { icon: Zap, title: "Dark Mode", desc: "รองรับ Dark / Light Mode ปรับได้ตามความชอบ", gradient: "from-orange-500 to-red-400", bg: "bg-orange-50 dark:bg-orange-950/40" },
  { icon: Globe, title: "รองรับทุกอุปกรณ์", desc: "Responsive Design ใช้งานได้บน PC, Tablet และ Mobile", gradient: "from-pink-500 to-rose-400", bg: "bg-pink-50 dark:bg-pink-950/40" },
];

const stats = [
  { label: "นักเรียน", value: "10,000+", icon: Users, color: "text-blue-500" },
  { label: "บทเรียน", value: "500+", icon: BookOpen, color: "text-violet-500" },
  { label: "คอร์ส", value: "17+", icon: Award, color: "text-amber-500" },
  { label: "ภาษาโปรแกรม", value: "10+", icon: Code2, color: "text-emerald-500" },
];

const paths = [
  { icon: Cpu, title: "Backend Dev", desc: "C/C++, Python, Java, Node.js, SQL, REST API", gradient: "from-blue-600 to-indigo-600", tags: ["C", "C++", "Python", "SQL"], href: "/courses" },
  { icon: Globe, title: "Frontend Dev", desc: "HTML/CSS, JavaScript, React, Next.js, Vue, Angular", gradient: "from-orange-500 to-pink-600", tags: ["HTML/CSS", "React", "Next.js"], href: "/courses" },
  { icon: Smartphone, title: "Mobile Dev", desc: "สร้างแอปมือถือ iOS/Android ด้วย Flutter", gradient: "from-emerald-500 to-cyan-600", tags: ["Flutter", "Dart"], href: "/courses" },
  { icon: Database, title: "Full Stack", desc: "Frontend + Backend + Database + Deployment ครบจบ", gradient: "from-violet-600 to-purple-600", tags: ["Next.js", "MySQL", "Docker"], href: "/courses" },
];


async function getFeaturedCourses() {
  try {
    return await prisma.course.findMany({
      where: { isPublished: true, isFeatured: true },
      take: 6,
      orderBy: { order: "asc" },
      include: { _count: { select: { enrollments: true } } },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-36 lg:py-44">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 dot-pattern opacity-40 dark:opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-violet-50/60 dark:from-gray-950 dark:via-gray-950 dark:to-violet-950/20" />

        {/* Glow Orbs */}
        <div className="glow-orb w-[500px] h-[500px] bg-blue-500 top-[-100px] left-[-100px] animate-pulse-glow" />
        <div className="glow-orb w-[400px] h-[400px] bg-violet-500 bottom-[-50px] right-[-50px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="glow-orb w-[300px] h-[300px] bg-pink-500 top-[30%] left-[60%] animate-pulse-glow" style={{ animationDelay: "0.8s" }} />

        <div className="container mx-auto px-4 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            แพลตฟอร์มใหม่ — เริ่มเรียนได้ฟรี ไม่ต้องสมัครก่อน
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            เรียนโค้ด<br />
            <span className="brand-gradient-text animate-gradient">ครบทุกภาษา</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            จาก C/C++ ไปจนถึง React, Next.js, Python และ Flutter
            พร้อม <strong className="text-foreground">Code Playground</strong>, <strong className="text-foreground">Quiz</strong> และ <strong className="text-foreground">Progress Tracking</strong> ในแพลตฟอร์มเดียว
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button size="xl" variant="gradient" asChild className="shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow">
              <Link href="/courses">
                เริ่มเรียนฟรีเลย <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="bg-background/80 backdrop-blur-sm">
              <Link href="/playground">
                <Play className="w-4 h-4" /> ลอง Playground
              </Link>
            </Button>
          </div>

          {/* Language Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
            {LANGS.map((lang) => (
              <div key={lang} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border/80 text-sm font-medium shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-default">
                <span className="text-base leading-none">{LANGUAGE_ICONS[lang]}</span>
                <span className="text-muted-foreground">{getLanguageLabel(lang)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────── */}
      <section className="py-14 border-y bg-gradient-to-r from-muted/30 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="text-center group">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-muted mb-3 group-hover:scale-110 transition-transform duration-300 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="stat-number">{value}</div>
                <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ─────────────────────────── */}
      {featuredCourses.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <Badge variant="secondary" className="mb-3">คอร์สแนะนำ</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">บทเรียนยอดนิยม</h2>
                <p className="text-muted-foreground mt-2">คัดสรรมาแล้วสำหรับผู้เริ่มต้นและระดับกลาง</p>
              </div>
              <Button variant="outline" asChild className="hidden md:flex">
                <Link href="/courses">ดูทั้งหมด <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course as Parameters<typeof CourseCard>[0]["course"]} />
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" asChild>
                <Link href="/courses">ดูคอร์สทั้งหมด <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── LEARNING PATHS ───────────────────────────── */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30 dark:opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">เส้นทางการเรียน</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">เลือกเส้นทางของคุณ</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">มีเส้นทางที่ออกแบบมาสำหรับทุกเป้าหมาย ไม่ว่าจะ Backend, Frontend หรือ Full Stack</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {paths.map((path) => (
              <Link key={path.title} href={path.href} className="group">
                <div className="glass-card p-6 h-full card-hover">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <path.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{path.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{path.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {path.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ดูคอร์ส <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">ฟีเจอร์</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">ทำไมต้อง TeachCode?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">ออกแบบมาเพื่อการเรียนรู้โปรแกรมมิ่งโดยเฉพาะ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <Card key={feature.title} className="card-hover overflow-hidden group border-border/60">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-90" />
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="glow-orb w-[600px] h-[600px] bg-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-8">
            <CheckCircle2 className="w-4 h-4" /> ฟรี 100% ไม่มีค่าใช้จ่าย
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            เข้าร่วมกับนักเรียนกว่า <strong className="text-white">10,000 คน</strong> ที่กำลังพัฒนาทักษะการเขียนโค้ดทุกวัน
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" asChild className="bg-white text-primary hover:bg-white/90 shadow-xl font-bold">
              <Link href="/register">
                สมัครฟรีเลย <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="border-white/50 text-white hover:bg-white/10 hover:border-white">
              <Link href="/courses">ดูคอร์สทั้งหมด</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
