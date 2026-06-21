import { DashboardShell } from "@/components/shared/DashboardShell";
import type { RouteGroupLayoutProps } from "@/types";

export default function AdminLayout({ children }: RouteGroupLayoutProps) {
  return <DashboardShell role="ADMIN">{children}</DashboardShell>;
}
