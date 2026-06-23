"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UI_TEXT } from "@/constants/ui-text";
import type { ApproveRejectDialogProps } from "@/types";

/**
 * Admin status confirmation dialog with optional reviewer comment.
 */
export function ApproveRejectDialog({
  isOpen,
  isSubmitting,
  onClose,
  onConfirm,
  status,
}: ApproveRejectDialogProps) {
  const [adminComment, setAdminComment] = useState("");
  const title =
    status === "APPROVED"
      ? UI_TEXT.LEAVE.APPROVE_REQUEST
      : UI_TEXT.LEAVE.REJECT_REQUEST;

  async function handleConfirm() {
    await onConfirm(adminComment);
    setAdminComment("");
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="adminComment">{UI_TEXT.LEAVE.ADMIN_COMMENT}</Label>
          <Input
            id="adminComment"
            placeholder={UI_TEXT.LEAVE.ADMIN_COMMENT_PLACEHOLDER}
            value={adminComment}
            onChange={(event) => setAdminComment(event.target.value)}
          />
        </div>
        <DialogFooter>
          <Button disabled={isSubmitting} type="button" onClick={handleConfirm}>
            {isSubmitting ? <Loader2Icon className="animate-spin" /> : null}
            {title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
