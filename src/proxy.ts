import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ROLE_COOKIE, AUTH_TOKEN_COOKIE } from "@/lib/authConstants";
import type { UserRole } from "@/types";

const authRoutes = ["/login", "/register"];
const employeeRoutes = ["/dashboard", "/apply", "/my-leaves"];
const adminRoutes = ["/admin/dashboard", "/admin/requests"];

function getDashboardPath(role: UserRole): string {
  return role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
}

/**
 * Protects role-specific routes using auth cookies mirrored from localStorage.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;
  const role = request.cookies.get(AUTH_ROLE_COOKIE)?.value as
    | UserRole
    | undefined;
  const isAuthRoute = authRoutes.includes(pathname);
  const isEmployeeRoute = employeeRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && token && role) {
    return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
  }

  if ((isEmployeeRoute || isAdminRoute) && (!token || !role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isEmployeeRoute && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isAdminRoute && role === "EMPLOYEE") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/apply/:path*",
    "/my-leaves/:path*",
    "/admin/dashboard/:path*",
    "/admin/requests/:path*",
  ],
};
