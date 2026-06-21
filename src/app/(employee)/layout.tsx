import { DashboardShell } from "@/components/shared/DashboardShell";
import type { RouteGroupLayoutProps } from "@/types";

export default function EmployeeLayout({ children }: RouteGroupLayoutProps) {
  return <DashboardShell role="EMPLOYEE">{children}</DashboardShell>;
}
