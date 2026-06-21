import { EmployeeDashboard } from "@/components/leave/EmployeeDashboard";
import { PageHeader } from "@/components/shared/PageHeader";
import { UI_TEXT } from "@/constants/ui-text";

export default function EmployeeDashboardPage() {
  return (
    <main className="flex w-full flex-col gap-6">
      <PageHeader title={UI_TEXT.PLACEHOLDERS.EMPLOYEE_DASHBOARD_TITLE} />
      <EmployeeDashboard />
    </main>
  );
}
