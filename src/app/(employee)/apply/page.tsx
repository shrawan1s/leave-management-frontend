import { ApplyLeaveContainer } from "@/components/leave/ApplyLeaveContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { UI_TEXT } from "@/constants/ui-text";

export default function ApplyLeavePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <PageHeader title={UI_TEXT.PLACEHOLDERS.APPLY_TITLE} />
      <ApplyLeaveContainer />
    </main>
  );
}
