import { ProtectedPageShell } from "@/components/shared/ProtectedPageShell";
import { UI_TEXT } from "@/constants/ui-text";

export default function AdminDashboardPage() {
  return (
    <ProtectedPageShell
      body={UI_TEXT.PLACEHOLDERS.ADMIN_DASHBOARD_BODY}
      title={UI_TEXT.PLACEHOLDERS.ADMIN_DASHBOARD_TITLE}
    />
  );
}
