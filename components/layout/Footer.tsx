import React from "react";
import Link from "next/link";
import { Code2, Github, Twitter, Youtube, Mail } from "lucide-react";

const footerLinks = {
  เรียนรู้: [
    { label: "คอร์สทั้งหมด", href: "/courses" },
    { label: "เส้นทางการเรียน", href: "/courses#paths" },
    { label: "Playground", href: "/playground" },
    { label: "บล็อก", href: "/blog" },
  ],
  หลักสูตร: [
    { label: "C & C++", href: "/courses?lang=CPP" },
    { label: "Python", href: "/courses?lang=PYTHON" },
    { label: "JavaScript", href: "/courses?lang=JAVASCRIPT" },
    { label: "Java", href: "/courses?lang=JAVA" },
    { label: "React & Next.js", href: "/courses?lang=REACT" },
    { label: "SQL & Database", href: "/courses?lang=SQL" },
  ],
  บริษัท: [
    { label: "เกี่ยวกับเรา", href: "/about" },
    { label: "ทีมงาน", href: "/team" },
    { label: "ติดต่อเรา", href: "/contact" },
    { label: "ร่วมงานกับเรา", href: "/careers" },
  ],
  ช่วยเหลือ: [
    { label: "คำถามที่พบบ่อย", href: "/faq" },
    { label: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
    { label: "ข้อกำหนดการใช้งาน", href: "/terms" },
    { label: "รายงานปัญหา", href: "/support" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 brand-gradient rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl brand-gradient-text tracking-tight">TeachCode</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              แพลตฟอร์มเรียนโปรแกรมมิ่งและ Web Development ที่ครบครันที่สุด
              พร้อมบทเรียนที่เขียนโดยผู้เชี่ยวชาญ
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center text-muted-foreground transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © 2024 TeachCode. สงวนลิขสิทธิ์ทุกประการ.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">สร้างด้วย</span>
            <span className="text-red-500 text-sm">♥</span>
            <span className="text-xs text-muted-foreground">เพื่อนักพัฒนาทุกคน</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
