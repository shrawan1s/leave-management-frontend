export const ROUTES = {
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_REQUESTS: "/admin/requests",
  APPLY: "/apply",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  MY_LEAVES: "/my-leaves",
  REGISTER: "/register",
} as const;

export const API_ENDPOINTS = {
  AUTH_LOGIN: "/api/auth/login",
  AUTH_LOGOUT: "/api/auth/logout",
  AUTH_ME: "/api/auth/me",
  AUTH_REFRESH: "/api/auth/refresh",
  AUTH_REGISTER: "/api/auth/register",
} as const;
