"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import * as leaveApi from "@/lib/api/leave";
import { getApiErrorMessage } from "@/lib/axios";
import type {
  LeaveFilters,
  LeaveRequest,
  LeaveStats,
  PaginatedLeaveRequests,
  UpdateLeaveStatusPayload,
} from "@/types";

const emptyStats: LeaveStats = {
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  totalEmployees: 0,
};

const defaultPagination: PaginatedLeaveRequests = {
  leaveRequests: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
};

/**
 * Owns admin leave stats, filtered pagination, and approve/reject mutations.
 */
export function useAdminLeave(initialFilters: LeaveFilters = {}) {
  const [filters, setFilters] = useState<LeaveFilters>(() => ({
    page: initialFilters.page ?? 1,
    limit: initialFilters.limit ?? 10,
    status: initialFilters.status,
    type: initialFilters.type,
  }));
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [pagination, setPagination] =
    useState<PaginatedLeaveRequests>(defaultPagination);
  const [stats, setStats] = useState<LeaveStats>(emptyStats);

  const loadAdminLeave = useCallback(async (nextFilters = filters) => {
    setIsLoading(true);

    try {
      const [statsResponse, requestsResponse] = await Promise.all([
        leaveApi.getLeaveStats(),
        leaveApi.getAllLeaveRequests(nextFilters),
      ]);

      setStats(statsResponse.data);
      setLeaveRequests(requestsResponse.data.leaveRequests);
      setPagination(requestsResponse.data);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    let isActive = true;

    async function loadInitialAdminLeave() {
      setIsLoading(true);

      try {
        const [statsResponse, requestsResponse] = await Promise.all([
          leaveApi.getLeaveStats(),
          leaveApi.getAllLeaveRequests(filters),
        ]);

        if (!isActive) {
          return;
        }

        setStats(statsResponse.data);
        setLeaveRequests(requestsResponse.data.leaveRequests);
        setPagination(requestsResponse.data);
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

    void loadInitialAdminLeave();

    return () => {
      isActive = false;
    };
  }, [filters]);

  const updateFilters = useCallback((nextFilters: LeaveFilters) => {
    setFilters((current) => ({
      ...current,
      ...nextFilters,
      page: nextFilters.page ?? 1,
    }));
  }, []);

  const updatePage = useCallback((page: number) => {
    setFilters((current) => ({ ...current, page }));
  }, []);

  const updateLimit = useCallback((limit: number) => {
    setFilters((current) => ({ ...current, limit, page: 1 }));
  }, []);

  const updateStatus = useCallback(
    async (leaveRequestId: string, payload: UpdateLeaveStatusPayload) => {
      setIsSubmitting(true);

      try {
        const response = await leaveApi.updateLeaveStatus(
          leaveRequestId,
          payload,
        );

        toast.success(response.message);
        await loadAdminLeave(filters);
      } catch (error) {
        toast.error(getApiErrorMessage(error));
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [filters, loadAdminLeave],
  );

  return {
    filters,
    isLoading,
    isSubmitting,
    leaveRequests,
    pagination,
    stats,
    updateFilters,
    updateLimit,
    updatePage,
    updateStatus,
  };
}
