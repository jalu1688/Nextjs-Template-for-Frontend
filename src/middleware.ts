import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  //   const token = req.cookies.get("auth-token")?.value; // token in cookie
  const token = req.cookies.get("auth-token")?.value;

  // // If user is logged in, block access to /login and /signup
  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // redirect to homepage or dashboard
  }

  if (!token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup"], // apply only to these routes
};
