import { InternalAxiosRequestConfig } from "axios";
import type { ComponentType, ReactNode, SVGProps } from "react";
import type { InputHTMLAttributes } from "react";

export type UserRole = "ADMIN" | "EMPLOYEE";
export type LeaveType = "SICK" | "CASUAL" | "EARNED";
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

/**
 * Standard API response envelope returned by the backend.
 */
export interface ApiResponse<TData> {
  success: boolean;
  data: TData;
  message: string;
}

/**
 * Safe user profile persisted in browser auth state and returned by APIs.
 */
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

/**
 * Token pair and user payload returned by successful auth calls.
 */
export interface AuthResponse {
  refreshToken: string;
  token: string;
  user: User;
}

/**
 * Login request body.
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Employee registration request body.
 */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  department: string;
  joinDate: string;
}

/**
 * Local register form values including confirmation-only input.
 */
export interface RegisterFormValues extends RegisterPayload {
  confirmPassword: string;
}

/**
 * Props for the public auth card shell.
 */
export interface AuthShellProps {
  children: ReactNode;
  footerHref: string;
  footerLabel: string;
  footerText: string;
  title: string;
}

/**
 * Password input props with controlled visibility state.
 */
export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  isVisible: boolean;
  onToggleVisibility: () => void;
}

/**
 * Placeholder shell props used by early protected page scaffolds.
 */
export interface ProtectedPageShellProps {
  body: string;
  title: string;
}

/**
 * Simple page title header props.
 */
export interface PageHeaderProps {
  title: string;
}

/**
 * Sidebar navigation item rendered by the protected dashboard shell.
 */
export interface DashboardNavItem {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}

/**
 * Role-aware protected layout shell props.
 */
export interface DashboardShellProps {
  children: ReactNode;
  role: UserRole;
}

/**
 * Numeric summary card props.
 */
export interface StatsCardProps {
  title: string;
  value: number | string;
}

/**
 * Theme provider wrapper props.
 */
export interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Shared route-group layout props.
 */
export interface RouteGroupLayoutProps {
  children: ReactNode;
}

/**
 * Axios request config marker used to avoid repeated refresh retries.
 */
export interface RetriableAxiosRequestConfig extends InternalAxiosRequestConfig {
  hasRetried?: boolean;
}

/**
 * Leave request DTO used by employee and admin UI tables.
 */
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

/**
 * Employee summary attached to admin leave request rows.
 */
export interface LeaveRequestEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
}

/**
 * Employee leave creation payload.
 */
export interface CreateLeavePayload {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

export type LeaveFormValues = CreateLeavePayload;
export type LeaveFormErrors = Partial<Record<keyof LeaveFormValues, string>>;

/**
 * Current shared leave balance response.
 */
export interface LeaveBalanceResponse {
  leaveBalance: number;
}

/**
 * Status badge props.
 */
export interface StatusBadgeProps {
  status: LeaveStatus;
}

/**
 * Read-only employee dashboard table props.
 */
export interface LeaveTableProps {
  emptyMessage: string;
  leaveRequests: LeaveRequest[];
}

/**
 * Employee create-leave form props.
 */
export interface LeaveFormProps {
  leaveBalance: number;
  onSubmit: (payload: CreateLeavePayload) => Promise<void>;
  isLoadingBalance: boolean;
  isSubmitting: boolean;
}

/**
 * Admin dashboard aggregate counts.
 */
export interface LeaveStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalEmployees: number;
}

/**
 * Pagination query params shared by leave list endpoints.
 */
export interface LeaveListQuery {
  page?: number;
  limit?: number;
}

/**
 * Admin leave list filters plus pagination.
 */
export interface LeaveFilters extends LeaveListQuery {
  status?: LeaveStatus;
  type?: LeaveType;
}

/**
 * Paginated leave list response used by full pages and dashboards.
 */
export interface PaginatedLeaveRequests {
  leaveRequests: LeaveRequest[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Admin status transition payload.
 */
export interface UpdateLeaveStatusPayload {
  status: "APPROVED" | "REJECTED";
  adminComment?: string;
}

/**
 * Employee pending leave edit payload.
 */
export interface UpdateLeaveRequestPayload {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

/**
 * Admin request table props with view and pending status actions.
 */
export interface AdminLeaveRequestsTableProps {
  isLoading: boolean;
  leaveRequests: LeaveRequest[];
  onStatusAction: (
    leaveRequest: LeaveRequest,
    status: "APPROVED" | "REJECTED",
  ) => void;
  onView: (leaveRequest: LeaveRequest) => void;
}

/**
 * Read-only recent admin dashboard request table props.
 */
export interface AdminRecentRequestsTableProps {
  emptyMessage: string;
  isLoading: boolean;
  leaveRequests: LeaveRequest[];
}

/**
 * Shared pagination control props.
 */
export interface PaginationControlsProps {
  limit: number;
  page: number;
  totalPages: number;
  total: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
}

/**
 * Admin approve/reject dialog props.
 */
export interface ApproveRejectDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  status: "APPROVED" | "REJECTED";
  onClose: () => void;
  onConfirm: (adminComment: string) => Promise<void>;
}

/**
 * Leave detail dialog props.
 */
export interface ViewLeaveRequestDialogProps {
  isOpen: boolean;
  leaveRequest: LeaveRequest | null;
  onClose: () => void;
}

/**
 * Employee pending leave edit dialog props.
 */
export interface EditLeaveRequestDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  leaveRequest: LeaveRequest | null;
  onClose: () => void;
  onConfirm: (payload: UpdateLeaveRequestPayload) => Promise<void>;
}

/**
 * Employee leave history table props with pending edit/delete actions.
 */
export interface EmployeeLeaveTableProps {
  emptyMessage: string;
  leaveRequests: LeaveRequest[];
  onDelete: (leaveRequest: LeaveRequest) => void;
  onEdit: (leaveRequest: LeaveRequest) => void;
  onView: (leaveRequest: LeaveRequest) => void;
}

/**
 * Employee pending leave delete dialog props.
 */
export interface DeleteLeaveRequestDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  leaveRequest: LeaveRequest | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}
