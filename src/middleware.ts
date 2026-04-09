import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { resolveTenantSlug } from "@/lib/tenant-resolve";

export function middleware(request: NextRequest) {
  const slug = resolveTenantSlug(
    request.headers.get("host"),
    request.nextUrl.pathname,
    process.env.NEXT_PUBLIC_ROOT_DOMAIN,
  );

  const requestHeaders = new Headers(request.headers);
  if (slug) {
    requestHeaders.set("x-tenant-slug", slug);
  } else {
    requestHeaders.delete("x-tenant-slug");
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
