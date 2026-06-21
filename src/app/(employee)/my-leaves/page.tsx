import { ProtectedPageShell } from "@/components/shared/ProtectedPageShell";
import { UI_TEXT } from "@/constants/ui-text";

export default function MyLeavesPage() {
  return (
    <ProtectedPageShell
      body={UI_TEXT.PLACEHOLDERS.MY_LEAVES_BODY}
      title={UI_TEXT.PLACEHOLDERS.MY_LEAVES_TITLE}
    />
  );
}
