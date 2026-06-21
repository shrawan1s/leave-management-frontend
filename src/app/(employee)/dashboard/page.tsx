import { ProtectedPageShell } from "@/components/shared/ProtectedPageShell";
import { UI_TEXT } from "@/constants/ui-text";

export default function EmployeeDashboardPage() {
  return (
    <ProtectedPageShell
      body={UI_TEXT.PLACEHOLDERS.EMPLOYEE_DASHBOARD_BODY}
      title={UI_TEXT.PLACEHOLDERS.EMPLOYEE_DASHBOARD_TITLE}
    />
  );
}
