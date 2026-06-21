"use client";

import { LeaveTable } from "@/components/leave/LeaveTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UI_TEXT } from "@/constants/ui-text";
import { useEmployeeLeave } from "@/hooks/useEmployeeLeave";

export function EmployeeDashboard() {
  const { isLoading, leaveBalance, recentLeaveRequests } = useEmployeeLeave();

  return (
    <div className="grid gap-6">
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>{UI_TEXT.LEAVE.BALANCE_CARD_TITLE}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">
            {isLoading ? "-" : leaveBalance}
          </p>
          <p className="text-sm text-muted-foreground">
            {UI_TEXT.LEAVE.BALANCE_DAYS}
          </p>
        </CardContent>
      </Card>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>{UI_TEXT.LEAVE.DASHBOARD_RECENT_TITLE}</CardTitle>
        </CardHeader>
        <CardContent>
          <LeaveTable
            emptyMessage={UI_TEXT.LEAVE.EMPTY_RECENT}
            leaveRequests={isLoading ? [] : recentLeaveRequests}
          />
        </CardContent>
      </Card>
    </div>
  );
}
