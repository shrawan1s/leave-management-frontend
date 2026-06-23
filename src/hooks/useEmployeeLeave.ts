"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import * as leaveApi from "@/lib/api/leave";
import { getApiErrorMessage } from "@/lib/axios";
import type {
  CreateLeavePayload,
  LeaveListQuery,
  LeaveRequest,
  PaginatedLeaveRequests,
  UpdateLeaveRequestPayload,
} from "@/types";

const defaultPagination: PaginatedLeaveRequests = {
  leaveRequests: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
};

export function useEmployeeLeave(initialQuery: LeaveListQuery = {}) {
  const router = useRouter();
  const [query, setQuery] = useState<LeaveListQuery>(() => ({
    page: initialQuery.page ?? 1,
    limit: initialQuery.limit ?? 10,
  }));
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [pagination, setPagination] =
    useState<PaginatedLeaveRequests>(defaultPagination);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadEmployeeLeave = useCallback(async (nextQuery = query) => {
    setIsLoading(true);

    try {
      const [balanceResponse, leavesResponse] = await Promise.all([
        leaveApi.getLeaveBalance(),
        leaveApi.getMyLeaves(nextQuery),
      ]);

      setLeaveBalance(balanceResponse.data.leaveBalance);
      setLeaveRequests(leavesResponse.data.leaveRequests);
      setPagination(leavesResponse.data);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    let isActive = true;

    async function loadInitialEmployeeLeave() {
      setIsLoading(true);

      try {
        const [balanceResponse, leavesResponse] = await Promise.all([
          leaveApi.getLeaveBalance(),
          leaveApi.getMyLeaves(query),
        ]);

        if (!isActive) {
          return;
        }

        setLeaveBalance(balanceResponse.data.leaveBalance);
        setLeaveRequests(leavesResponse.data.leaveRequests);
        setPagination(leavesResponse.data);
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
  }, [query]);

  const updatePage = useCallback((page: number) => {
    setQuery((current) => ({ ...current, page }));
  }, []);

  const updateLimit = useCallback((limit: number) => {
    setQuery((current) => ({ ...current, limit, page: 1 }));
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
        await loadEmployeeLeave(query);
      } catch (error) {
        toast.error(getApiErrorMessage(error));
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadEmployeeLeave, query],
  );

  const deleteLeaveRequest = useCallback(
    async (leaveRequestId: string) => {
      setIsSubmitting(true);

      try {
        const response = await leaveApi.deleteLeaveRequest(leaveRequestId);

        toast.success(response.message);
        await loadEmployeeLeave(query);
      } catch (error) {
        toast.error(getApiErrorMessage(error));
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [loadEmployeeLeave, query],
  );

  return {
    createLeave,
    deleteLeaveRequest,
    isLoading,
    isSubmitting,
    leaveBalance,
    leaveRequests,
    pagination,
    reload: loadEmployeeLeave,
    updateLimit,
    updatePage,
    updateLeaveRequest,
  };
}
