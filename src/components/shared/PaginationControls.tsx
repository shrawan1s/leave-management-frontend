import { Button } from "@/components/ui/button";
import { UI_TEXT } from "@/constants/ui-text";
import type { PaginationControlsProps } from "@/types";

const pageSizeOptions = [10, 20, 50];

export function PaginationControls({
  limit,
  onLimitChange,
  onPageChange,
  page,
  total,
  totalPages,
}: PaginationControlsProps) {
  if (total === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 border-t pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <span>
        {UI_TEXT.PAGINATION.SUMMARY}: {total}
      </span>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex items-center gap-2">
          <span>{UI_TEXT.PAGINATION.ITEMS_PER_PAGE}</span>
          <select
            className="h-8 rounded-md border bg-background px-2 text-foreground"
            value={limit}
            onChange={(event) => onLimitChange(Number(event.target.value))}
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-2">
          <Button
            disabled={page <= 1}
            size="sm"
            type="button"
            variant="outline"
            onClick={() => onPageChange(page - 1)}
          >
            {UI_TEXT.PAGINATION.PREVIOUS}
          </Button>
          <span>
            {UI_TEXT.PAGINATION.PAGE} {page} / {Math.max(totalPages, 1)}
          </span>
          <Button
            disabled={page >= totalPages}
            size="sm"
            type="button"
            variant="outline"
            onClick={() => onPageChange(page + 1)}
          >
            {UI_TEXT.PAGINATION.NEXT}
          </Button>
        </div>
      </div>
    </div>
  );
}
