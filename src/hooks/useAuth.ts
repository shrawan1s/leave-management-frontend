"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import { UI_TEXT } from "@/constants/ui-text";
import * as authApi from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/axios";
import {
  clearAuthSession,
  getDashboardPath,
  getUser,
  setAuthSession,
} from "@/lib/auth";
import type { LoginPayload, RegisterPayload, User } from "@/types";

/**
 * Owns auth mutations, local auth session state, and post-auth redirects.
 */
export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(() => getUser());
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSuccess = useCallback(
    (tokenUser: User, message: string) => {
      setUser(tokenUser);
      toast.success(message);
      router.push(getDashboardPath(tokenUser.role));
      router.refresh();
    },
    [router],
  );

  const login = useCallback(
    async (payload: LoginPayload) => {
      setIsLoading(true);

      try {
        const response = await authApi.login(payload);

        setAuthSession(response.data);
        handleAuthSuccess(response.data.user, response.message);
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthSuccess],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setIsLoading(true);

      try {
        const response = await authApi.register(payload);

        setAuthSession(response.data);
        handleAuthSuccess(response.data.user, response.message);
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthSuccess],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Logout must clear the browser session even if the token is already expired.
    } finally {
      clearAuthSession();
      setUser(null);
      toast.success(UI_TEXT.AUTH.LOGOUT_SUCCESS);
      router.push(ROUTES.LOGIN);
      router.refresh();
    }
  }, [router]);

  return {
    user,
    isLoading,
    login,
    register,
    logout,
  };
}
