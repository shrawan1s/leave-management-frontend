"use client";

import { FormEvent, useState } from "react";
import { Loader2Icon, LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { UI_TEXT } from "@/constants/ui-text";
import { useAuth } from "@/hooks/useAuth";
import type { LoginPayload } from "@/types";

const initialValues: LoginPayload = {
  email: "",
  password: "",
};

export function LoginForm() {
  const { isLoading, login } = useAuth();
  const [values, setValues] = useState<LoginPayload>(initialValues);
  const [errors, setErrors] = useState<Partial<LoginPayload>>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function validate(): boolean {
    const nextErrors: Partial<LoginPayload> = {};

    if (!values.email.trim()) {
      nextErrors.email = UI_TEXT.VALIDATION.EMAIL_REQUIRED;
    }

    if (values.password.length < 6) {
      nextErrors.password = UI_TEXT.VALIDATION.PASSWORD_MIN;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await login(values);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">{UI_TEXT.AUTH.EMAIL}</Label>
        <Input
          id="email"
          placeholder={UI_TEXT.PLACEHOLDER.EMAIL}
          type="email"
          value={values.email}
          onChange={(event) =>
            setValues((current) => ({ ...current, email: event.target.value }))
          }
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{UI_TEXT.AUTH.PASSWORD}</Label>
        <PasswordInput
          id="password"
          isVisible={isPasswordVisible}
          placeholder={UI_TEXT.PLACEHOLDER.PASSWORD}
          value={values.password}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              password: event.target.value,
            }))
          }
          aria-invalid={Boolean(errors.password)}
          onToggleVisibility={() =>
            setIsPasswordVisible((isVisible) => !isVisible)
          }
        />
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password}</p>
        ) : null}
      </div>
      <Button className="w-full" disabled={isLoading} type="submit">
        {isLoading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <LogInIcon />
        )}
        {UI_TEXT.AUTH.SIGN_IN}
      </Button>
    </form>
  );
}
