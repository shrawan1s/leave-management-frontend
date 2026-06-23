"use client";

import { useState } from "react";
import { AdminLeaveRequestsTable } from "@/components/leave/AdminLeaveRequestsTable";
import { ApproveRejectDialog } from "@/components/leave/ApproveRejectDialog";
import { ViewLeaveRequestDialog } from "@/components/leave/ViewLeaveRequestDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UI_TEXT } from "@/constants/ui-text";
import { useAdminLeave } from "@/hooks/useAdminLeave";
import type { LeaveRequest, LeaveStatus, LeaveType } from "@/types";

const statusFilters: Array<LeaveStatus | undefined> = [
  undefined,
  "PENDING",
  "APPROVED",
  "REJECTED",
];
const typeFilters: Array<LeaveType | undefined> = [
  undefined,
  "SICK",
  "CASUAL",
  "EARNED",
];

export function AdminRequestsContainer() {
  const {
    filters,
    isLoading,
    isSubmitting,
    leaveRequests,
    updateFilters,
    updateStatus,
  } = useAdminLeave();
  const [selectedViewLeaveRequest, setSelectedViewLeaveRequest] =
    useState<LeaveRequest | null>(null);
  const [selectedStatusLeaveRequest, setSelectedStatusLeaveRequest] =
    useState<LeaveRequest | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<"APPROVED" | "REJECTED">("APPROVED");

  function openStatusDialog(
    leaveRequest: LeaveRequest,
    status: "APPROVED" | "REJECTED",
  ) {
    setSelectedStatusLeaveRequest(leaveRequest);
    setSelectedStatus(status);
  }

  async function confirmStatusUpdate(adminComment: string) {
    if (!selectedStatusLeaveRequest) {
      return;
    }

    await updateStatus(selectedStatusLeaveRequest.id, {
      status: selectedStatus,
      adminComment,
    });
    setSelectedStatusLeaveRequest(null);
  }

  return (
    <>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>{UI_TEXT.ADMIN.REQUESTS_TITLE}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((status) => (
                <Button
                  key={status ?? "ALL"}
                  size="sm"
                  type="button"
                  variant={filters.status === status ? "default" : "outline"}
                  onClick={() => updateFilters({ ...filters, status })}
                >
                  {status ? UI_TEXT.ADMIN[status] : UI_TEXT.ADMIN.ALL}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {typeFilters.map((type) => (
                <Button
                  key={type ?? "ALL"}
                  size="sm"
                  type="button"
                  variant={filters.type === type ? "default" : "outline"}
                  onClick={() => updateFilters({ ...filters, type })}
                >
                  {type ? UI_TEXT.LEAVE[type] : UI_TEXT.ADMIN.ALL}
                </Button>
              ))}
            </div>
          </div>
          <AdminLeaveRequestsTable
            isLoading={isLoading}
            leaveRequests={leaveRequests}
            onStatusAction={openStatusDialog}
            onView={setSelectedViewLeaveRequest}
          />
        </CardContent>
      </Card>
      <ViewLeaveRequestDialog
        isOpen={Boolean(selectedViewLeaveRequest)}
        leaveRequest={selectedViewLeaveRequest}
        onClose={() => setSelectedViewLeaveRequest(null)}
      />
      <ApproveRejectDialog
        isOpen={Boolean(selectedStatusLeaveRequest)}
        isSubmitting={isSubmitting}
        status={selectedStatus}
        onClose={() => setSelectedStatusLeaveRequest(null)}
        onConfirm={confirmStatusUpdate}
      />
    </>
  );
}
