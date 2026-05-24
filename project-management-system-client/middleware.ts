// middleware.ts

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");

  const role = request.cookies.get("role");

  const pathname = request.nextUrl.pathname;

  // NOT LOGGED IN
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // NOT LOGGED IN
  if (pathname.startsWith("/member") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // MEMBER TRYING ADMIN
  if (pathname.startsWith("/admin") && role?.value === "member") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/member/:path*"],
};
