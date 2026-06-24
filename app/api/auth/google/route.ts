import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || clientId === "your-google-client-id") {
    return NextResponse.json({ error: "Google OAuth ยังไม่ได้ตั้งค่า GOOGLE_CLIENT_ID" }, { status: 503 });
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  // state = random string to prevent CSRF
  const state = Math.random().toString(36).slice(2);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "select_account",
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  const res = NextResponse.redirect(url);
  // เก็บ state ใน cookie เพื่อ verify ตอน callback
  res.cookies.set("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 นาที
    path: "/",
  });

  return res;
}
