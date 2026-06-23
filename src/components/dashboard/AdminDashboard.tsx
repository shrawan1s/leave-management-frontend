"use client";

import { AdminRecentRequestsTable } from "@/components/dashboard/AdminRecentRequestsTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UI_TEXT } from "@/constants/ui-text";
import { useAdminLeave } from "@/hooks/useAdminLeave";

/**
 * Admin dashboard with aggregate stats and the latest leave requests.
 */
export function AdminDashboard() {
  const { isLoading, leaveRequests, stats } = useAdminLeave({ limit: 10 });
  const value = (currentValue: number) => (isLoading ? "-" : currentValue);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title={UI_TEXT.ADMIN.STAT_TOTAL}
          value={value(stats.total)}
        />
        <StatsCard
          title={UI_TEXT.ADMIN.STAT_PENDING}
          value={value(stats.pending)}
        />
        <StatsCard
          title={UI_TEXT.ADMIN.STAT_APPROVED}
          value={value(stats.approved)}
        />
        <StatsCard
          title={UI_TEXT.ADMIN.STAT_REJECTED}
          value={value(stats.rejected)}
        />
        <StatsCard
          title={UI_TEXT.ADMIN.STAT_EMPLOYEES}
          value={value(stats.totalEmployees)}
        />
      </div>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>{UI_TEXT.ADMIN.RECENT_REQUESTS_TITLE}</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminRecentRequestsTable
            emptyMessage={UI_TEXT.LEAVE.EMPTY_TABLE}
            isLoading={isLoading}
            leaveRequests={leaveRequests}
          />
        </CardContent>
      </Card>
    </div>
  );
}
