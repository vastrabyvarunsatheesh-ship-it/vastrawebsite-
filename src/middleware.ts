import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_CUSTOMER_ROUTES = ["/account", "/cart/checkout"];
const PROTECTED_ADMIN_ROUTES = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("vastra_session")?.value;

  // Protected Account Routes
  if (PROTECTED_CUSTOMER_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", encodeURIComponent(pathname));
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protected Admin Routes
  if (PROTECTED_ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  const response = NextResponse.next();
  // Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/checkout/:path*"],
};
