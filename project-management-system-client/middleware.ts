import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const pathname = request.nextUrl.pathname;

  // AUTH PAGES
  const authRoutes = ["/login", "/register"];

  // PROTECTED ROUTES
 
  const protectedRoutes = ["/admin"];
  // const protectedRoutes = ["/dashboard"];

  // USER LOGGED IN
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // USER NOT LOGGED IN
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
