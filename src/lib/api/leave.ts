import { API_ENDPOINTS } from "@/constants/routes";
import { apiClient } from "@/lib/axios";
import type {
  ApiResponse,
  CreateLeavePayload,
  LeaveFilters,
  LeaveBalanceResponse,
  LeaveRequest,
  LeaveStats,
  UpdateLeaveRequestPayload,
  UpdateLeaveStatusPayload,
} from "@/types";

export async function createLeave(
  payload: CreateLeavePayload,
): Promise<ApiResponse<{ leaveRequest: LeaveRequest }>> {
  const response = await apiClient.post<
    ApiResponse<{ leaveRequest: LeaveRequest }>
  >(API_ENDPOINTS.LEAVE_CREATE, payload);

  return response.data;
}

export async function getMyLeaves(): Promise<
  ApiResponse<{ leaveRequests: LeaveRequest[] }>
> {
  const response = await apiClient.get<
    ApiResponse<{ leaveRequests: LeaveRequest[] }>
  >(API_ENDPOINTS.LEAVE_MY);

  return response.data;
}

export async function getLeaveBalance(): Promise<
  ApiResponse<LeaveBalanceResponse>
> {
  const response = await apiClient.get<ApiResponse<LeaveBalanceResponse>>(
    API_ENDPOINTS.LEAVE_BALANCE,
  );

  return response.data;
}

export async function getAllLeaveRequests(
  filters: LeaveFilters = {},
): Promise<ApiResponse<{ leaveRequests: LeaveRequest[] }>> {
  const response = await apiClient.get<
    ApiResponse<{ leaveRequests: LeaveRequest[] }>
  >(API_ENDPOINTS.LEAVE_ALL, {
    params: filters,
  });

  return response.data;
}

export async function getLeaveStats(): Promise<ApiResponse<LeaveStats>> {
  const response = await apiClient.get<ApiResponse<LeaveStats>>(
    API_ENDPOINTS.LEAVE_STATS,
  );

  return response.data;
}

export async function updateLeaveStatus(
  leaveRequestId: string,
  payload: UpdateLeaveStatusPayload,
): Promise<ApiResponse<{ leaveRequest: LeaveRequest }>> {
  const response = await apiClient.patch<
    ApiResponse<{ leaveRequest: LeaveRequest }>
  >(API_ENDPOINTS.LEAVE_STATUS(leaveRequestId), payload);

  return response.data;
}

export async function updateLeaveRequest(
  leaveRequestId: string,
  payload: UpdateLeaveRequestPayload,
): Promise<ApiResponse<{ leaveRequest: LeaveRequest }>> {
  const response = await apiClient.patch<
    ApiResponse<{ leaveRequest: LeaveRequest }>
  >(API_ENDPOINTS.LEAVE_REQUEST(leaveRequestId), payload);

  return response.data;
}

export async function deleteLeaveRequest(
  leaveRequestId: string,
): Promise<ApiResponse<null>> {
  const response = await apiClient.delete<ApiResponse<null>>(
    API_ENDPOINTS.LEAVE_REQUEST(leaveRequestId),
  );

  return response.data;
}
