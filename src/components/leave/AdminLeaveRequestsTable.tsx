import { StatusBadge } from "@/components/leave/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  EyeIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
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
import type { AdminLeaveRequestsTableProps } from "@/types";

export function AdminLeaveRequestsTable({
  isLoading,
  leaveRequests,
  onDelete,
  onEdit,
  onStatusAction,
  onView,
}: AdminLeaveRequestsTableProps) {
  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">
        {UI_TEXT.LEAVE.LOADING_REQUESTS}
      </p>
    );
  }

  if (!leaveRequests.length) {
    return (
      <p className="text-sm text-muted-foreground">
        {UI_TEXT.LEAVE.EMPTY_TABLE}
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            <TableHead>{UI_TEXT.ADMIN.EMPLOYEE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_TYPE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_START_DATE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_END_DATE}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_DAYS}</TableHead>
            <TableHead>{UI_TEXT.LEAVE.TABLE_STATUS}</TableHead>
            <TableHead>{UI_TEXT.ADMIN.ACTIONS}</TableHead>
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
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  <Button
                    aria-label={UI_TEXT.ADMIN.VIEW}
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => onView(leaveRequest)}
                  >
                    <EyeIcon className="size-4" />
                    {UI_TEXT.ADMIN.VIEW}
                  </Button>
                  <Button
                    aria-label={UI_TEXT.ADMIN.EDIT}
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => onEdit(leaveRequest)}
                  >
                    <PencilIcon className="size-4" />
                    {UI_TEXT.ADMIN.EDIT}
                  </Button>
                  <Button
                    aria-label={UI_TEXT.ADMIN.DELETE}
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => onDelete(leaveRequest)}
                  >
                    <Trash2Icon className="size-4" />
                    {UI_TEXT.ADMIN.DELETE}
                  </Button>
                  {leaveRequest.status === "PENDING" ? (
                    <>
                      <Button
                        size="sm"
                        type="button"
                        onClick={() => onStatusAction(leaveRequest, "APPROVED")}
                      >
                        <CheckIcon className="size-4" />
                        {UI_TEXT.LEAVE.APPROVE}
                      </Button>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() => onStatusAction(leaveRequest, "REJECTED")}
                      >
                        <XIcon className="size-4" />
                        {UI_TEXT.LEAVE.REJECT}
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
