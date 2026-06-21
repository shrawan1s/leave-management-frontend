"use client";

import { FormEvent, useMemo, useState } from "react";
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
import { calculateInclusiveDays, formatDateInputValue } from "@/lib/date";
import type {
  EditLeaveRequestDialogProps,
  LeaveRequest,
  LeaveFormErrors,
  UpdateLeaveRequestPayload,
  LeaveType,
} from "@/types";

const leaveTypes: LeaveType[] = ["SICK", "CASUAL", "EARNED"];

export function EditLeaveRequestDialog({
  isOpen,
  isSubmitting,
  leaveRequest,
  onClose,
  onConfirm,
}: EditLeaveRequestDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{UI_TEXT.LEAVE.EDIT_REQUEST}</DialogTitle>
        </DialogHeader>
        {leaveRequest ? (
          <EditLeaveRequestForm
            key={leaveRequest.id}
            isSubmitting={isSubmitting}
            leaveRequest={leaveRequest}
            onConfirm={onConfirm}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function EditLeaveRequestForm({
  isSubmitting,
  leaveRequest,
  onConfirm,
}: {
  isSubmitting: boolean;
  leaveRequest: LeaveRequest;
  onConfirm: (payload: UpdateLeaveRequestPayload) => Promise<void>;
}) {
  const [values, setValues] = useState<UpdateLeaveRequestPayload>(() => ({
    type: leaveRequest.type,
    startDate: formatDateInputValue(leaveRequest.startDate),
    endDate: formatDateInputValue(leaveRequest.endDate),
    reason: leaveRequest.reason,
    adminComment: leaveRequest.adminComment ?? "",
  }));
  const [errors, setErrors] = useState<LeaveFormErrors>({});
  const requestedDays = useMemo(
    () => calculateInclusiveDays(values.startDate, values.endDate),
    [values.endDate, values.startDate],
  );

  function updateValue(field: keyof UpdateLeaveRequestPayload, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validate(): boolean {
    const nextErrors: LeaveFormErrors = {};

    if (!values.startDate) {
      nextErrors.startDate = UI_TEXT.VALIDATION.START_DATE_REQUIRED;
    }

    if (!values.endDate) {
      nextErrors.endDate = UI_TEXT.VALIDATION.END_DATE_REQUIRED;
    }

    if (values.startDate && values.endDate && requestedDays < 1) {
      nextErrors.endDate = UI_TEXT.VALIDATION.END_DATE_BEFORE_START_DATE;
    }

    if (values.reason.trim().length < 10) {
      nextErrors.reason = UI_TEXT.VALIDATION.REASON_MIN;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onConfirm({
      ...values,
      reason: values.reason.trim(),
      adminComment: values.adminComment?.trim() || undefined,
    });
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label>{UI_TEXT.LEAVE.LEAVE_TYPE}</Label>
        <div className="grid grid-cols-3 gap-2">
          {leaveTypes.map((leaveType) => (
            <Button
              key={leaveType}
              type="button"
              variant={values.type === leaveType ? "default" : "outline"}
              onClick={() => updateValue("type", leaveType)}
            >
              {UI_TEXT.LEAVE[leaveType]}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="editStartDate">{UI_TEXT.LEAVE.START_DATE}</Label>
          <Input
            id="editStartDate"
            type="date"
            value={values.startDate}
            aria-invalid={Boolean(errors.startDate)}
            onChange={(event) =>
              updateValue("startDate", event.target.value)
            }
          />
          {errors.startDate ? (
            <p className="text-sm text-destructive">{errors.startDate}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="editEndDate">{UI_TEXT.LEAVE.END_DATE}</Label>
          <Input
            id="editEndDate"
            type="date"
            value={values.endDate}
            aria-invalid={Boolean(errors.endDate)}
            onChange={(event) => updateValue("endDate", event.target.value)}
          />
          {errors.endDate ? (
            <p className="text-sm text-destructive">{errors.endDate}</p>
          ) : null}
        </div>
      </div>
      <div className="rounded-md border bg-muted/40 p-3 text-sm">
        {UI_TEXT.LEAVE.TOTAL_DAYS}: {Math.max(requestedDays, 0)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="editReason">{UI_TEXT.LEAVE.REASON}</Label>
        <Input
          id="editReason"
          value={values.reason}
          aria-invalid={Boolean(errors.reason)}
          onChange={(event) => updateValue("reason", event.target.value)}
        />
        {errors.reason ? (
          <p className="text-sm text-destructive">{errors.reason}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="editAdminComment">{UI_TEXT.LEAVE.ADMIN_COMMENT}</Label>
        <Input
          id="editAdminComment"
          placeholder={UI_TEXT.LEAVE.ADMIN_COMMENT_PLACEHOLDER}
          value={values.adminComment}
          onChange={(event) =>
            updateValue("adminComment", event.target.value)
          }
        />
      </div>
      <DialogFooter>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? <Loader2Icon className="animate-spin" /> : null}
          {UI_TEXT.LEAVE.EDIT_REQUEST}
        </Button>
      </DialogFooter>
    </form>
  );
}
