"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UI_TEXT } from "@/constants/ui-text";
import type { DeleteLeaveRequestDialogProps } from "@/types";

export function DeleteLeaveRequestDialog({
  isOpen,
  isSubmitting,
  leaveRequest,
  onClose,
  onConfirm,
}: DeleteLeaveRequestDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{UI_TEXT.LEAVE.DELETE_REQUEST}</DialogTitle>
          <DialogDescription>
            {UI_TEXT.LEAVE.DELETE_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        {leaveRequest ? (
          <p className="text-sm">
            {leaveRequest.employee?.name ?? leaveRequest.employeeId} -{" "}
            {UI_TEXT.LEAVE[leaveRequest.type]}
          </p>
        ) : null}
        <DialogFooter>
          <Button disabled={isSubmitting} type="button" onClick={onConfirm}>
            {isSubmitting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Trash2Icon className="size-4" />
            )}
            {UI_TEXT.LEAVE.DELETE_REQUEST_CONFIRM}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
