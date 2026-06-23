import { API_ENDPOINTS } from "@/constants/routes";
import { apiClient } from "@/lib/axios";
import type {
  ApiResponse,
  CreateLeavePayload,
  LeaveFilters,
  LeaveListQuery,
  LeaveBalanceResponse,
  LeaveRequest,
  LeaveStats,
  PaginatedLeaveRequests,
  UpdateLeaveRequestPayload,
  UpdateLeaveStatusPayload,
} from "@/types";

/**
 * Creates a pending leave request for the authenticated employee.
 */
export async function createLeave(
  payload: CreateLeavePayload,
): Promise<ApiResponse<{ leaveRequest: LeaveRequest }>> {
  const response = await apiClient.post<
    ApiResponse<{ leaveRequest: LeaveRequest }>
  >(API_ENDPOINTS.LEAVE_CREATE, payload);

  return response.data;
}

/**
 * Fetches the authenticated employee's paginated leave history.
 */
export async function getMyLeaves(
  query: LeaveListQuery = {},
): Promise<ApiResponse<PaginatedLeaveRequests>> {
  const response = await apiClient.get<ApiResponse<PaginatedLeaveRequests>>(
    API_ENDPOINTS.LEAVE_MY,
    {
      params: query,
    },
  );

  return response.data;
}

/**
 * Fetches the authenticated employee's current shared leave balance.
 */
export async function getLeaveBalance(): Promise<
  ApiResponse<LeaveBalanceResponse>
> {
  const response = await apiClient.get<ApiResponse<LeaveBalanceResponse>>(
    API_ENDPOINTS.LEAVE_BALANCE,
  );

  return response.data;
}

/**
 * Fetches admin-visible paginated leave requests with optional filters.
 */
export async function getAllLeaveRequests(
  filters: LeaveFilters = {},
): Promise<ApiResponse<PaginatedLeaveRequests>> {
  const response = await apiClient.get<ApiResponse<PaginatedLeaveRequests>>(
    API_ENDPOINTS.LEAVE_ALL,
    {
      params: filters,
    },
  );

  return response.data;
}

/**
 * Fetches organization-level leave request counts for the admin dashboard.
 */
export async function getLeaveStats(): Promise<ApiResponse<LeaveStats>> {
  const response = await apiClient.get<ApiResponse<LeaveStats>>(
    API_ENDPOINTS.LEAVE_STATS,
  );

  return response.data;
}

/**
 * Applies an admin approve/reject status transition to a pending leave request.
 */
export async function updateLeaveStatus(
  leaveRequestId: string,
  payload: UpdateLeaveStatusPayload,
): Promise<ApiResponse<{ leaveRequest: LeaveRequest }>> {
  const response = await apiClient.patch<
    ApiResponse<{ leaveRequest: LeaveRequest }>
  >(API_ENDPOINTS.LEAVE_STATUS(leaveRequestId), payload);

  return response.data;
}

/**
 * Updates an authenticated employee's own pending leave request.
 */
export async function updateLeaveRequest(
  leaveRequestId: string,
  payload: UpdateLeaveRequestPayload,
): Promise<ApiResponse<{ leaveRequest: LeaveRequest }>> {
  const response = await apiClient.patch<
    ApiResponse<{ leaveRequest: LeaveRequest }>
  >(API_ENDPOINTS.LEAVE_REQUEST(leaveRequestId), payload);

  return response.data;
}

/**
 * Deletes an authenticated employee's own pending leave request.
 */
export async function deleteLeaveRequest(
  leaveRequestId: string,
): Promise<ApiResponse<null>> {
  const response = await apiClient.delete<ApiResponse<null>>(
    API_ENDPOINTS.LEAVE_REQUEST(leaveRequestId),
  );

  return response.data;
}
