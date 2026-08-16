import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminToken } from "@/lib/admin-auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

type Body = { secret?: string };

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`admin-login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${limited.retryAfterSec} seconds.` },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const token = getAdminToken();
  if (!token) {
    return NextResponse.json(
      { error: "Admin is not configured. Set ADMIN_SECRET in environment." },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const secret = typeof body.secret === "string" ? body.secret.trim() : "";
  if (!secret || secret !== process.env.ADMIN_SECRET?.trim()) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
