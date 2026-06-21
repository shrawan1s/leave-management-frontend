import { MyLeavesContainer } from "@/components/leave/MyLeavesContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { UI_TEXT } from "@/constants/ui-text";

export default function MyLeavesPage() {
  return (
    <main className="flex w-full flex-col gap-6">
      <PageHeader title={UI_TEXT.PLACEHOLDERS.MY_LEAVES_TITLE} />
      <MyLeavesContainer />
    </main>
  );
}
