import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

interface GoogleUserInfo {
  sub: string;         // Google ID
  email: string;
  email_verified: boolean;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

async function exchangeCodeForTokens(code: string, redirectUri: string): Promise<GoogleTokenResponse> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) throw new Error("Failed to exchange code for tokens");
  return res.json();
}

async function getGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo> {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Failed to get Google user info");
  return res.json();
}

function generateUsername(email: string): string {
  const base = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 20);
  return `${base}_${Math.random().toString(36).slice(2, 6)}`;
}

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const errorRedirect = `${baseUrl}/login?error=google_failed`;

  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(`${baseUrl}/login?error=google_denied`);
    }

    if (!code || !state) {
      return NextResponse.redirect(errorRedirect);
    }

    // Verify state to prevent CSRF
    const savedState = req.cookies.get("google_oauth_state")?.value;
    if (!savedState || savedState !== state) {
      return NextResponse.redirect(errorRedirect);
    }

    const redirectUri = `${baseUrl}/api/auth/google/callback`;
    const tokens = await exchangeCodeForTokens(code, redirectUri);
    const googleUser = await getGoogleUserInfo(tokens.access_token);

    if (!googleUser.email) {
      return NextResponse.redirect(errorRedirect);
    }

    // Find or create user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId: googleUser.sub },
          { email: googleUser.email },
        ],
      },
    });

    if (!user) {
      // สร้าง user ใหม่
      const username = generateUsername(googleUser.email);
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          username,
          googleId: googleUser.sub,
          displayName: googleUser.name,
          avatar: googleUser.picture ?? null,
          emailVerified: googleUser.email_verified,
          passwordHash: null,
          role: "STUDENT",
          isActive: true,
        },
      });
    } else if (!user.googleId) {
      // user มีอยู่แล้ว (สมัครด้วย email) — เชื่อม Google ID
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: googleUser.sub,
          emailVerified: true,
          avatar: user.avatar ?? googleUser.picture ?? null,
        },
      });
    }

    if (!user.isActive) {
      return NextResponse.redirect(`${baseUrl}/login?error=account_disabled`);
    }

    // บันทึก Login History
    await prisma.loginHistory.create({
      data: {
        userId: user.id,
        method: "google",
        ip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown",
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    // ออก JWT tokens
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.upsert({
      where: { token: refreshToken },
      update: { expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
      create: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    // Redirect พร้อม token ใน URL (client จะเก็บแล้วลบออก)
    const redirectUrl = new URL(`${baseUrl}/auth/google/success`);
    redirectUrl.searchParams.set("token", accessToken);
    redirectUrl.searchParams.set("refresh", refreshToken);

    const res = NextResponse.redirect(redirectUrl);
    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    // ลบ state cookie
    res.cookies.set("google_oauth_state", "", { maxAge: 0, path: "/" });

    return res;
  } catch (err) {
    console.error("[GOOGLE_CALLBACK]", err);
    return NextResponse.redirect(errorRedirect);
  }
}
