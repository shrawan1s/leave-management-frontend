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
import type { LeaveTableProps } from "@/types";

export function LeaveTable({ emptyMessage, leaveRequests }: LeaveTableProps) {
  if (!leaveRequests.length) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[720px]">
      <TableHeader>
        <TableRow>
          <TableHead>{UI_TEXT.LEAVE.TABLE_TYPE}</TableHead>
          <TableHead>{UI_TEXT.LEAVE.TABLE_START_DATE}</TableHead>
          <TableHead>{UI_TEXT.LEAVE.TABLE_END_DATE}</TableHead>
          <TableHead>{UI_TEXT.LEAVE.TABLE_DAYS}</TableHead>
          <TableHead>{UI_TEXT.LEAVE.TABLE_STATUS}</TableHead>
          <TableHead>{UI_TEXT.LEAVE.TABLE_REASON}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.map((leaveRequest) => (
          <TableRow key={leaveRequest.id}>
            <TableCell>{UI_TEXT.LEAVE[leaveRequest.type]}</TableCell>
            <TableCell>{formatDisplayDate(leaveRequest.startDate)}</TableCell>
            <TableCell>{formatDisplayDate(leaveRequest.endDate)}</TableCell>
            <TableCell>{leaveRequest.days}</TableCell>
            <TableCell>
              <StatusBadge status={leaveRequest.status} />
            </TableCell>
            <TableCell className="max-w-xs whitespace-normal">
              {leaveRequest.reason}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
}
