"use client";

import Cookies from "js-cookie";
import {
  AUTH_ROLE_COOKIE,
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_TOKEN_COOKIE,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
} from "@/lib/authConstants";
import type { AuthResponse, User, UserRole } from "@/types";
import { ROUTES } from "@/constants/routes";

export function getDashboardPath(role: UserRole): string {
  return role === "ADMIN" ? ROUTES.ADMIN_DASHBOARD : ROUTES.DASHBOARD;
}

export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
}

export function getUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const user = window.localStorage.getItem(AUTH_USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as User;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function setAuthSession(authResponse: AuthResponse): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, authResponse.token);
  window.localStorage.setItem(
    AUTH_REFRESH_TOKEN_KEY,
    authResponse.refreshToken,
  );
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authResponse.user));
  Cookies.set(AUTH_TOKEN_COOKIE, authResponse.token, { sameSite: "lax" });
  Cookies.set(AUTH_ROLE_COOKIE, authResponse.user.role, { sameSite: "lax" });
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
  Cookies.remove(AUTH_TOKEN_COOKIE);
  Cookies.remove(AUTH_ROLE_COOKIE);
}
