import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { StatusBadge } from "@/components/leave/StatusBadge";
import { Button } from "@/components/ui/button";
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
import type { EmployeeLeaveTableProps } from "@/types";

export function EmployeeLeaveTable({
  emptyMessage,
  leaveRequests,
  onDelete,
  onEdit,
  onView,
}: EmployeeLeaveTableProps) {
  if (!leaveRequests.length) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            <TableHead>{UI_TEXT.LEAVE.TABLE_TYPE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_START_DATE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_END_DATE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_DAYS}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_STATUS}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_REASON}</TableHead>
            <TableHead>{UI_TEXT.ADMIN.ACTIONS}</TableHead>
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
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => onView(leaveRequest)}
                  >
                    <EyeIcon className="size-4" />
                    {UI_TEXT.ADMIN.VIEW}
                  </Button>
                  {leaveRequest.status === "PENDING" ? (
                    <>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() => onEdit(leaveRequest)}
                      >
                        <PencilIcon className="size-4" />
                        {UI_TEXT.ADMIN.EDIT}
                      </Button>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() => onDelete(leaveRequest)}
                      >
                        <Trash2Icon className="size-4" />
                        {UI_TEXT.ADMIN.DELETE}
                      </Button>
                    </>
                  ) : null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
