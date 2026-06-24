import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    template: "%s | TeachCode",
    default: "TeachCode — แพลตฟอร์มเรียนโปรแกรมมิ่งครบวงจร",
  },
  description:
    "เรียนรู้ Programming และ Web Development ครบทุกภาษา C, C++, Python, JavaScript, Java, React, Next.js และอื่นๆ พร้อม Interactive Code Playground และ Quiz System",
  keywords: [
    "เรียนโปรแกรมมิ่ง", "programming tutorial", "web development", "coding",
    "C programming", "Python", "JavaScript", "React", "Next.js", "Java",
    "TypeScript", "SQL", "Flutter", "คอร์สออนไลน์", "teach code",
  ],
  authors: [{ name: "TeachCode Team" }],
  creator: "TeachCode",
  publisher: "TeachCode",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "TeachCode",
    title: "TeachCode — แพลตฟอร์มเรียนโปรแกรมมิ่งครบวงจร",
    description: "เรียนรู้ Programming และ Web Development ครบทุกภาษา",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeachCode",
    description: "แพลตฟอร์มเรียนโปรแกรมมิ่งครบวงจร",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
              },
              success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
              error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
