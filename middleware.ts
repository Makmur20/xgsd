import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;
  const role = req.auth?.user?.role;

  if (!isLoggedIn && pathname.startsWith("/checkout")) {
    return Response.redirect(new URL("/signin", req.url));
  }

  if (isLoggedIn && role !== "admin" && pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/", req.url));
  }

  if (isLoggedIn && pathname.startsWith("/signin")) {
    return Response.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    "/checkout/:path*",
    "/admin/:path*",
    "/signin",
  ],
};
