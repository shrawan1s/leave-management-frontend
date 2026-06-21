import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { PageHeader } from "@/components/shared/PageHeader";
import { UI_TEXT } from "@/constants/ui-text";

export default function AdminDashboardPage() {
  return (
    <main className="flex w-full flex-col gap-6">
      <PageHeader title={UI_TEXT.PLACEHOLDERS.ADMIN_DASHBOARD_TITLE} />
      <AdminDashboard />
    </main>
  );
}
