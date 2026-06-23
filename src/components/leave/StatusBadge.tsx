import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { StatusBadgeProps } from "@/types";

const statusClasses = {
  APPROVED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

/**
 * Displays leave status using the centralized status color mapping.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={cn("rounded-md", statusClasses[status])}>{status}</Badge>
  );
}
