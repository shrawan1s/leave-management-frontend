import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { ROUTES } from "@/constants/routes";
import { UI_TEXT } from "@/constants/ui-text";

export default function LoginPage() {
  return (
    <AuthShell
      footerHref={ROUTES.REGISTER}
      footerLabel={UI_TEXT.AUTH.LOGIN_FOOTER_LABEL}
      footerText={UI_TEXT.AUTH.LOGIN_FOOTER_TEXT}
      title={UI_TEXT.AUTH.LOGIN_TITLE}
    >
      <LoginForm />
    </AuthShell>
  );
}
