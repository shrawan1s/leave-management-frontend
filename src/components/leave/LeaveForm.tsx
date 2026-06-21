"use client";

import { FormEvent, useMemo, useState } from "react";
import { Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UI_TEXT } from "@/constants/ui-text";
import { calculateInclusiveDays } from "@/lib/date";
import type {
  LeaveFormErrors,
  LeaveFormProps,
  LeaveFormValues,
  LeaveType,
} from "@/types";

const initialValues: LeaveFormValues = {
  type: "SICK",
  startDate: "",
  endDate: "",
  reason: "",
};

const leaveTypes: LeaveType[] = ["SICK", "CASUAL", "EARNED"];

export function LeaveForm({
  isSubmitting,
  leaveBalance,
  onSubmit,
}: LeaveFormProps) {
  const [values, setValues] = useState<LeaveFormValues>(initialValues);
  const [errors, setErrors] = useState<LeaveFormErrors>({});
  const requestedDays = useMemo(
    () => calculateInclusiveDays(values.startDate, values.endDate),
    [values.endDate, values.startDate],
  );

  function updateValue(field: keyof LeaveFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validate(): boolean {
    const nextErrors: LeaveFormErrors = {};

    if (!values.type) {
      nextErrors.type = UI_TEXT.VALIDATION.SELECT_LEAVE_TYPE;
    }

    if (!values.startDate) {
      nextErrors.startDate = UI_TEXT.VALIDATION.START_DATE_REQUIRED;
    }

    if (!values.endDate) {
      nextErrors.endDate = UI_TEXT.VALIDATION.END_DATE_REQUIRED;
    }

    if (values.startDate && values.endDate && requestedDays < 1) {
      nextErrors.endDate = UI_TEXT.VALIDATION.END_DATE_BEFORE_START_DATE;
    }

    if (requestedDays > leaveBalance) {
      nextErrors.endDate = UI_TEXT.VALIDATION.INSUFFICIENT_BALANCE;
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

    await onSubmit(values);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
        {errors.type ? (
          <p className="text-sm text-destructive">{errors.type}</p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">{UI_TEXT.LEAVE.START_DATE}</Label>
          <Input
            id="startDate"
            type="date"
            value={values.startDate}
            onChange={(event) => updateValue("startDate", event.target.value)}
            aria-invalid={Boolean(errors.startDate)}
          />
          {errors.startDate ? (
            <p className="text-sm text-destructive">{errors.startDate}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">{UI_TEXT.LEAVE.END_DATE}</Label>
          <Input
            id="endDate"
            type="date"
            value={values.endDate}
            onChange={(event) => updateValue("endDate", event.target.value)}
            aria-invalid={Boolean(errors.endDate)}
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
        <Label htmlFor="reason">{UI_TEXT.LEAVE.REASON}</Label>
        <Input
          id="reason"
          placeholder={UI_TEXT.LEAVE_PLACEHOLDER.REASON}
          value={values.reason}
          onChange={(event) => updateValue("reason", event.target.value)}
          aria-invalid={Boolean(errors.reason)}
        />
        {errors.reason ? (
          <p className="text-sm text-destructive">{errors.reason}</p>
        ) : null}
      </div>
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? <Loader2Icon className="animate-spin" /> : <SendIcon />}
        {UI_TEXT.LEAVE.APPLY_SUBMIT}
      </Button>
    </form>
  );
}
