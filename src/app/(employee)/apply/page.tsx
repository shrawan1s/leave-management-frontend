import { ProtectedPageShell } from "@/components/shared/ProtectedPageShell";
import { UI_TEXT } from "@/constants/ui-text";

export default function ApplyLeavePage() {
  return (
    <ProtectedPageShell
      body={UI_TEXT.PLACEHOLDERS.APPLY_BODY}
      title={UI_TEXT.PLACEHOLDERS.APPLY_TITLE}
    />
  );
}
