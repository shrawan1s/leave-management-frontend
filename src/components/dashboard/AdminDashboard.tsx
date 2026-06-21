"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { UI_TEXT } from "@/constants/ui-text";
import { useAdminLeave } from "@/hooks/useAdminLeave";

export function AdminDashboard() {
  const { isLoading, stats } = useAdminLeave();
  const value = (currentValue: number) => (isLoading ? "-" : currentValue);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatsCard title={UI_TEXT.ADMIN.STAT_TOTAL} value={value(stats.total)} />
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
  );
}
