"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import * as leaveApi from "@/lib/api/leave";
import { getApiErrorMessage } from "@/lib/axios";
import type {
  LeaveFilters,
  LeaveRequest,
  LeaveStats,
  UpdateLeaveRequestPayload,
  UpdateLeaveStatusPayload,
} from "@/types";

const emptyStats: LeaveStats = {
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  totalEmployees: 0,
};

export function useAdminLeave() {
  const [filters, setFilters] = useState<LeaveFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
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
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    let isActive = true;

    async function loadInitialAdminLeave() {
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
    setFilters(nextFilters);
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

  const updateLeaveRequest = useCallback(
    async (leaveRequestId: string, payload: UpdateLeaveRequestPayload) => {
      setIsSubmitting(true);

      try {
        const response = await leaveApi.updateLeaveRequest(
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

  const deleteLeaveRequest = useCallback(
    async (leaveRequestId: string) => {
      setIsSubmitting(true);

      try {
        const response = await leaveApi.deleteLeaveRequest(leaveRequestId);

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
    stats,
    deleteLeaveRequest,
    updateFilters,
    updateLeaveRequest,
    updateStatus,
  };
}
