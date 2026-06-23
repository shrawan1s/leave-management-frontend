import { StatusBadge } from "@/components/leave/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UI_TEXT } from "@/constants/ui-text";
import { formatDisplayDate } from "@/lib/date";
import type { AdminRecentRequestsTableProps } from "@/types";

export function AdminRecentRequestsTable({
  emptyMessage,
  isLoading,
  leaveRequests,
}: AdminRecentRequestsTableProps) {
  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">
        {UI_TEXT.LEAVE.LOADING_REQUESTS}
      </p>
    );
  }

  if (!leaveRequests.length) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[840px]">
        <TableHeader>
          <TableRow>
            <TableHead>{UI_TEXT.ADMIN.EMPLOYEE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_TYPE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_START_DATE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_END_DATE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_DAYS}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_STATUS}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequests.map((leaveRequest) => (
            <TableRow key={leaveRequest.id}>
              <TableCell>
                <div className="grid gap-1">
                  <span>
                    {leaveRequest.employee?.name ?? leaveRequest.employeeId}
                  </span>
                  {leaveRequest.employee ? (
                    <span className="text-xs text-muted-foreground">
                      {leaveRequest.employee.department}
                    </span>
                  ) : null}
                </div>
              </TableCell>
              <TableCell>{UI_TEXT.LEAVE[leaveRequest.type]}</TableCell>
              <TableCell>{formatDisplayDate(leaveRequest.startDate)}</TableCell>
              <TableCell>{formatDisplayDate(leaveRequest.endDate)}</TableCell>
              <TableCell>{leaveRequest.days}</TableCell>
              <TableCell>
                <StatusBadge status={leaveRequest.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
