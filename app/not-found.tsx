import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        {/* 404 Illustration */}
        <div className="text-[120px] font-black brand-gradient-text leading-none mb-4">
          404
        </div>
        <div className="text-6xl mb-6">😕</div>
        <h1 className="text-2xl font-bold mb-3">ไม่พบหน้าที่คุณกำลังหา</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          หน้าที่คุณพยายามเข้าถึงอาจถูกลบ ย้าย หรือไม่เคยมีอยู่
          ลองตรวจสอบ URL อีกครั้งหรือกลับไปหน้าแรก
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="gradient" size="lg" asChild>
            <Link href="/">
              <Home className="h-4 w-4" /> กลับหน้าแรก
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">
              <Search className="h-4 w-4" /> ดูคอร์สทั้งหมด
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
