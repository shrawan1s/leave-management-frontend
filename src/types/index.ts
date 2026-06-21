import { InternalAxiosRequestConfig } from "axios";
import type { ReactNode } from "react";
import type { InputHTMLAttributes } from "react";

export type UserRole = "ADMIN" | "EMPLOYEE";

export interface ApiResponse<TData> {
  success: boolean;
  data: TData;
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  joinDate: string;
  leaveBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  refreshToken: string;
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  department: string;
  joinDate: string;
}

export interface RegisterFormValues extends RegisterPayload {
  confirmPassword: string;
}

export interface AuthShellProps {
  children: ReactNode;
  footerHref: string;
  footerLabel: string;
  footerText: string;
  title: string;
}

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export interface ProtectedPageShellProps {
  body: string;
  title: string;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface RetriableAxiosRequestConfig extends InternalAxiosRequestConfig {
  hasRetried?: boolean;
}
