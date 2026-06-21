"use client";

import { LeaveTable } from "@/components/leave/LeaveTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UI_TEXT } from "@/constants/ui-text";
import { useEmployeeLeave } from "@/hooks/useEmployeeLeave";

export function MyLeavesContainer() {
  const { isLoading, leaveRequests } = useEmployeeLeave();

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>{UI_TEXT.LEAVE.MY_LEAVES_TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <LeaveTable
          emptyMessage={UI_TEXT.LEAVE.EMPTY_TABLE}
          leaveRequests={isLoading ? [] : leaveRequests}
        />
      </CardContent>
    </Card>
  );
}
