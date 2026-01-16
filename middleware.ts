import { NextRequest, NextResponse } from "next/server";

const ProtectedRoutes = ["/mysourcecode", "/checkout", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookie Auth.js (nama default)
  const hasSession =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("__Secure-authjs.session-token");

  if (!hasSession && ProtectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Role check TIDAK BOLEH di Edge
  if (pathname.startsWith("/signin") && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
