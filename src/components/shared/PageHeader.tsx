import type { PageHeaderProps } from "@/types";

/**
 * Standard page heading used inside protected route content.
 */
export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
}
