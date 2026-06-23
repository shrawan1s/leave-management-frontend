import axios, { AxiosError } from "axios";
import { API_ENDPOINTS, ROUTES } from "@/constants/routes";
import { UI_TEXT } from "@/constants/ui-text";
import {
  clearAuthSession,
  getRefreshToken,
  getToken,
  setAuthSession,
} from "@/lib/auth";
import type { ApiResponse, RetriableAxiosRequestConfig } from "@/types";

/**
 * Shared Axios instance configured with the backend base URL.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const PUBLIC_AUTH_ENDPOINTS = [
  API_ENDPOINTS.AUTH_LOGIN,
  API_ENDPOINTS.AUTH_REGISTER,
] as const;

function isPublicAuthEndpoint(url?: string): boolean {
  if (!url) {
    return false;
  }

  return PUBLIC_AUTH_ENDPOINTS.some((endpoint) => url.endsWith(endpoint));
}

apiClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = getToken();

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const originalRequest = error.config as
      | RetriableAxiosRequestConfig
      | undefined;
    const isRefreshRequest =
      originalRequest?.url === API_ENDPOINTS.AUTH_REFRESH;
    const isPublicAuthRequest = isPublicAuthEndpoint(originalRequest?.url);

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.hasRetried &&
      !isRefreshRequest &&
      !isPublicAuthRequest &&
      typeof window !== "undefined"
    ) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        // Mark the original request so a failed retry cannot loop forever.
        originalRequest.hasRetried = true;

        try {
          const refreshResponse = await apiClient.post(
            API_ENDPOINTS.AUTH_REFRESH,
            null,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );

          setAuthSession(refreshResponse.data.data);
          // Replay the original request with the freshly rotated access token.
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.data.token}`;

          return apiClient(originalRequest);
        } catch {
          clearAuthSession();
          window.location.href = ROUTES.LOGIN;
        }
      }

      clearAuthSession();
      window.location.href = ROUTES.LOGIN;
    }

    return Promise.reject(error);
  },
);

/**
 * Extracts a human-readable API error message for toast feedback.
 */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    const message = error.response?.data.message;

    if (Array.isArray(message)) {
      return message.join(", ");
    }

    return message ?? error.message;
  }

  return UI_TEXT.API.FALLBACK_ERROR;
}
