import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/routes";
import type {
  ApiResponse,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types";

/**
 * Authenticates an existing user and returns a token pair.
 */
export async function login(
  payload: LoginPayload,
): Promise<ApiResponse<AuthResponse>> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    API_ENDPOINTS.AUTH_LOGIN,
    payload,
  );

  return response.data;
}

/**
 * Registers a new employee account and returns a token pair.
 */
export async function register(
  payload: RegisterPayload,
): Promise<ApiResponse<AuthResponse>> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    API_ENDPOINTS.AUTH_REGISTER,
    payload,
  );

  return response.data;
}

/**
 * Fetches the current user profile from the access token.
 */
export async function getMe(): Promise<ApiResponse<{ user: User }>> {
  const response =
    await apiClient.get<ApiResponse<{ user: User }>>(API_ENDPOINTS.AUTH_ME);

  return response.data;
}

/**
 * Rotates an expired access token using the refresh token.
 */
export async function refreshToken(
  refreshToken: string,
): Promise<ApiResponse<AuthResponse>> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    API_ENDPOINTS.AUTH_REFRESH,
    null,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  return response.data;
}

/**
 * Invalidates the current access-token session on the backend.
 */
export async function logout(): Promise<ApiResponse<null>> {
  const response = await apiClient.post<ApiResponse<null>>(
    API_ENDPOINTS.AUTH_LOGOUT,
  );

  return response.data;
}
