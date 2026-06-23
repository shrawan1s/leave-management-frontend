"use client";

import { StatusBadge } from "@/components/leave/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UI_TEXT } from "@/constants/ui-text";
import { formatDisplayDate } from "@/lib/date";
import type { ViewLeaveRequestDialogProps } from "@/types";

/**
 * Read-only leave request detail dialog.
 */
export function ViewLeaveRequestDialog({
  isOpen,
  leaveRequest,
  onClose,
}: ViewLeaveRequestDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{UI_TEXT.LEAVE.VIEW_REQUEST}</DialogTitle>
        </DialogHeader>
        {leaveRequest ? (
          <div className="grid gap-3 text-sm">
            <div className="grid gap-1">
              <span className="text-muted-foreground">
                {UI_TEXT.ADMIN.EMPLOYEE}
              </span>
              <span className="font-medium">
                {leaveRequest.employee?.name ?? leaveRequest.employeeId}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-1">
                <span className="text-muted-foreground">
                  {UI_TEXT.LEAVE.TABLE_TYPE}
                </span>
                <span>{UI_TEXT.LEAVE[leaveRequest.type]}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-muted-foreground">
                  {UI_TEXT.LEAVE.TABLE_STATUS}
                </span>
                <StatusBadge status={leaveRequest.status} />
              </div>
              <div className="grid gap-1">
                <span className="text-muted-foreground">
                  {UI_TEXT.LEAVE.TABLE_START_DATE}
                </span>
                <span>{formatDisplayDate(leaveRequest.startDate)}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-muted-foreground">
                  {UI_TEXT.LEAVE.TABLE_END_DATE}
                </span>
                <span>{formatDisplayDate(leaveRequest.endDate)}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-muted-foreground">
                  {UI_TEXT.LEAVE.TABLE_DAYS}
                </span>
                <span>{leaveRequest.days}</span>
              </div>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">
                {UI_TEXT.LEAVE.TABLE_REASON}
              </span>
              <p>{leaveRequest.reason}</p>
            </div>
            {leaveRequest.adminComment ? (
              <div className="grid gap-1">
                <span className="text-muted-foreground">
                  {UI_TEXT.LEAVE.ADMIN_COMMENT}
                </span>
                <p>{leaveRequest.adminComment}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
