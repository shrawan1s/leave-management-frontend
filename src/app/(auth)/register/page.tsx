import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ROUTES } from "@/constants/routes";
import { UI_TEXT } from "@/constants/ui-text";

export default function RegisterPage() {
  return (
    <AuthShell
      footerHref={ROUTES.LOGIN}
      footerLabel={UI_TEXT.AUTH.REGISTER_FOOTER_LABEL}
      footerText={UI_TEXT.AUTH.REGISTER_FOOTER_TEXT}
      title={UI_TEXT.AUTH.REGISTER_TITLE}
    >
      <RegisterForm />
    </AuthShell>
  );
}
