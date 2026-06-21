import { ProtectedPageShell } from "@/components/shared/ProtectedPageShell";
import { UI_TEXT } from "@/constants/ui-text";

export default function AdminRequestsPage() {
  return (
    <ProtectedPageShell
      body={UI_TEXT.PLACEHOLDERS.ADMIN_REQUESTS_BODY}
      title={UI_TEXT.PLACEHOLDERS.ADMIN_REQUESTS_TITLE}
    />
  );
}
