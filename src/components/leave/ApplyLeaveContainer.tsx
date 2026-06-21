"use client";

import { LeaveForm } from "@/components/leave/LeaveForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UI_TEXT } from "@/constants/ui-text";
import { useEmployeeLeave } from "@/hooks/useEmployeeLeave";

export function ApplyLeaveContainer() {
  const { createLeave, isLoading, isSubmitting, leaveBalance } =
    useEmployeeLeave();

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>{UI_TEXT.PLACEHOLDERS.APPLY_TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <LeaveForm
          isSubmitting={isSubmitting}
          leaveBalance={isLoading ? 0 : leaveBalance}
          onSubmit={createLeave}
        />
      </CardContent>
    </Card>
  );
}
