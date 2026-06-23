"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import * as leaveApi from "@/lib/api/leave";
import { getApiErrorMessage } from "@/lib/axios";
import type {
  CreateLeavePayload,
  LeaveRequest,
  UpdateLeaveRequestPayload,
} from "@/types";

export function useEmployeeLeave() {
  const router = useRouter();
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recentLeaveRequests = useMemo(
    () => leaveRequests.slice(0, 5),
    [leaveRequests],
  );

  const loadEmployeeLeave = useCallback(async () => {
    setIsLoading(true);

    try {
      const [balanceResponse, leavesResponse] = await Promise.all([
        leaveApi.getLeaveBalance(),
        leaveApi.getMyLeaves(),
      ]);

      setLeaveBalance(balanceResponse.data.leaveBalance);
      setLeaveRequests(leavesResponse.data.leaveRequests);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadInitialEmployeeLeave() {
      try {
        const [balanceResponse, leavesResponse] = await Promise.all([
          leaveApi.getLeaveBalance(),
          leaveApi.getMyLeaves(),
        ]);

        if (!isActive) {
          return;
        }

        setLeaveBalance(balanceResponse.data.leaveBalance);
        setLeaveRequests(leavesResponse.data.leaveRequests);
      } catch (error) {
        if (isActive) {
          toast.error(getApiErrorMessage(error));
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialEmployeeLeave();

    return () => {
      isActive = false;
    };
  }, []);

  const createLeave = useCallback(
    async (payload: CreateLeavePayload) => {
      setIsSubmitting(true);

      try {
        const response = await leaveApi.createLeave(payload);

        toast.success(response.message);
        router.push(ROUTES.MY_LEAVES);
        router.refresh();
      } catch (error) {
        toast.error(getApiErrorMessage(error));
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  const updateLeaveRequest = useCallback(
    async (leaveRequestId: string, payload: UpdateLeaveRequestPayload) => {
      setIsSubmitting(true);

      try {
        const response = await leaveApi.updateLeaveRequest(
          leaveRequestId,
          payload,
        );

        toast.success(response.message);
        await loadEmployeeLeave();
      } catch (error) {
        toast.error(getApiErrorMessage(error));
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadEmployeeLeave],
  );

  const deleteLeaveRequest = useCallback(
    async (leaveRequestId: string) => {
      setIsSubmitting(true);

      try {
        const response = await leaveApi.deleteLeaveRequest(leaveRequestId);

        toast.success(response.message);
        await loadEmployeeLeave();
      } catch (error) {
        toast.error(getApiErrorMessage(error));
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadEmployeeLeave],
  );

  return {
    createLeave,
    deleteLeaveRequest,
    isLoading,
    isSubmitting,
    leaveBalance,
    leaveRequests,
    recentLeaveRequests,
    reload: loadEmployeeLeave,
    updateLeaveRequest,
  };
}
