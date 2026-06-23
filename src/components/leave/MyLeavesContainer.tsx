"use client";

import { useState } from "react";
import { DeleteLeaveRequestDialog } from "@/components/leave/DeleteLeaveRequestDialog";
import { EditLeaveRequestDialog } from "@/components/leave/EditLeaveRequestDialog";
import { EmployeeLeaveTable } from "@/components/leave/EmployeeLeaveTable";
import { ViewLeaveRequestDialog } from "@/components/leave/ViewLeaveRequestDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { UI_TEXT } from "@/constants/ui-text";
import { useEmployeeLeave } from "@/hooks/useEmployeeLeave";
import type { LeaveRequest, UpdateLeaveRequestPayload } from "@/types";

/**
 * Owns employee leave history pagination plus pending edit/delete dialogs.
 */
export function MyLeavesContainer() {
  const {
    deleteLeaveRequest,
    isLoading,
    isSubmitting,
    leaveRequests,
    pagination,
    updateLimit,
    updatePage,
    updateLeaveRequest,
  } = useEmployeeLeave();
  const [selectedViewLeaveRequest, setSelectedViewLeaveRequest] =
    useState<LeaveRequest | null>(null);
  const [selectedEditLeaveRequest, setSelectedEditLeaveRequest] =
    useState<LeaveRequest | null>(null);
  const [selectedDeleteLeaveRequest, setSelectedDeleteLeaveRequest] =
    useState<LeaveRequest | null>(null);

  async function confirmEdit(payload: UpdateLeaveRequestPayload) {
    if (!selectedEditLeaveRequest) {
      return;
    }

    await updateLeaveRequest(selectedEditLeaveRequest.id, payload);
    setSelectedEditLeaveRequest(null);
  }

  async function confirmDelete() {
    if (!selectedDeleteLeaveRequest) {
      return;
    }

    await deleteLeaveRequest(selectedDeleteLeaveRequest.id);
    setSelectedDeleteLeaveRequest(null);
  }

  return (
    <>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>{UI_TEXT.LEAVE.MY_LEAVES_TITLE}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <EmployeeLeaveTable
            emptyMessage={UI_TEXT.LEAVE.EMPTY_TABLE}
            leaveRequests={isLoading ? [] : leaveRequests}
            onDelete={setSelectedDeleteLeaveRequest}
            onEdit={setSelectedEditLeaveRequest}
            onView={setSelectedViewLeaveRequest}
          />
          <PaginationControls
            limit={pagination.limit}
            page={pagination.page}
            total={pagination.total}
            totalPages={pagination.totalPages}
            onLimitChange={updateLimit}
            onPageChange={updatePage}
          />
        </CardContent>
      </Card>
      <ViewLeaveRequestDialog
        isOpen={Boolean(selectedViewLeaveRequest)}
        leaveRequest={selectedViewLeaveRequest}
        onClose={() => setSelectedViewLeaveRequest(null)}
      />
      <EditLeaveRequestDialog
        isOpen={Boolean(selectedEditLeaveRequest)}
        isSubmitting={isSubmitting}
        leaveRequest={selectedEditLeaveRequest}
        onClose={() => setSelectedEditLeaveRequest(null)}
        onConfirm={confirmEdit}
      />
      <DeleteLeaveRequestDialog
        isOpen={Boolean(selectedDeleteLeaveRequest)}
        isSubmitting={isSubmitting}
        leaveRequest={selectedDeleteLeaveRequest}
        onClose={() => setSelectedDeleteLeaveRequest(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
