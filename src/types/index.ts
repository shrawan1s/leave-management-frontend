import { InternalAxiosRequestConfig } from "axios";
import type { ComponentType, ReactNode, SVGProps } from "react";
import type { InputHTMLAttributes } from "react";

export type UserRole = "ADMIN" | "EMPLOYEE";
export type LeaveType = "SICK" | "CASUAL" | "EARNED";
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

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

export interface PageHeaderProps {
  title: string;
}

export interface DashboardNavItem {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}

export interface DashboardShellProps {
  children: ReactNode;
  role: UserRole;
}

export interface StatsCardProps {
  title: string;
  value: number | string;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface RouteGroupLayoutProps {
  children: ReactNode;
}

export interface RetriableAxiosRequestConfig extends InternalAxiosRequestConfig {
  hasRetried?: boolean;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employee?: LeaveRequestEmployee;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  adminComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequestEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
}

export interface CreateLeavePayload {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

export type LeaveFormValues = CreateLeavePayload;
export type LeaveFormErrors = Partial<Record<keyof LeaveFormValues, string>>;

export interface LeaveBalanceResponse {
  leaveBalance: number;
}

export interface StatusBadgeProps {
  status: LeaveStatus;
}

export interface LeaveTableProps {
  emptyMessage: string;
  leaveRequests: LeaveRequest[];
}

export interface LeaveFormProps {
  leaveBalance: number;
  onSubmit: (payload: CreateLeavePayload) => Promise<void>;
  isLoadingBalance: boolean;
  isSubmitting: boolean;
}

export interface LeaveStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalEmployees: number;
}

export interface LeaveListQuery {
  page?: number;
  limit?: number;
}

export interface LeaveFilters extends LeaveListQuery {
  status?: LeaveStatus;
  type?: LeaveType;
}

export interface PaginatedLeaveRequests {
  leaveRequests: LeaveRequest[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UpdateLeaveStatusPayload {
  status: "APPROVED" | "REJECTED";
  adminComment?: string;
}

export interface UpdateLeaveRequestPayload {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface AdminLeaveRequestsTableProps {
  isLoading: boolean;
  leaveRequests: LeaveRequest[];
  onStatusAction: (
    leaveRequest: LeaveRequest,
    status: "APPROVED" | "REJECTED",
  ) => void;
  onView: (leaveRequest: LeaveRequest) => void;
}

export interface AdminRecentRequestsTableProps {
  emptyMessage: string;
  isLoading: boolean;
  leaveRequests: LeaveRequest[];
}

export interface PaginationControlsProps {
  limit: number;
  page: number;
  totalPages: number;
  total: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
}

export interface ApproveRejectDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  status: "APPROVED" | "REJECTED";
  onClose: () => void;
  onConfirm: (adminComment: string) => Promise<void>;
}

export interface ViewLeaveRequestDialogProps {
  isOpen: boolean;
  leaveRequest: LeaveRequest | null;
  onClose: () => void;
}

export interface EditLeaveRequestDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  leaveRequest: LeaveRequest | null;
  onClose: () => void;
  onConfirm: (payload: UpdateLeaveRequestPayload) => Promise<void>;
}

export interface EmployeeLeaveTableProps {
  emptyMessage: string;
  leaveRequests: LeaveRequest[];
  onDelete: (leaveRequest: LeaveRequest) => void;
  onEdit: (leaveRequest: LeaveRequest) => void;
  onView: (leaveRequest: LeaveRequest) => void;
}

export interface DeleteLeaveRequestDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  leaveRequest: LeaveRequest | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}
