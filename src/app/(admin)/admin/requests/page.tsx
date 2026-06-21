import { AdminRequestsContainer } from "@/components/leave/AdminRequestsContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { UI_TEXT } from "@/constants/ui-text";

export default function AdminRequestsPage() {
  return (
    <main className="flex w-full flex-col gap-6">
      <PageHeader title={UI_TEXT.PLACEHOLDERS.ADMIN_REQUESTS_TITLE} />
      <AdminRequestsContainer />
    </main>
  );
}
