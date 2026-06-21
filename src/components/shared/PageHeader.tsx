import type { PageHeaderProps } from "@/types";

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
}
