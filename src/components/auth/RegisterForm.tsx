"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Loader2Icon,
  UserPlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { UI_TEXT } from "@/constants/ui-text";
import { useAuth } from "@/hooks/useAuth";
import type { RegisterFormValues } from "@/types";

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  department: "",
  joinDate: "",
};

export function RegisterForm() {
  const { isLoading, register } = useAuth();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({});
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const buttonLabel = useMemo(
    () =>
      step === 1 ? UI_TEXT.AUTH.CONTINUE : UI_TEXT.AUTH.CREATE_ACCOUNT,
    [step],
  );

  function updateValue(field: keyof RegisterFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validateStepOne(): boolean {
    const nextErrors: Partial<RegisterFormValues> = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = UI_TEXT.VALIDATION.NAME_MIN;
    }

    if (!values.email.trim()) {
      nextErrors.email = UI_TEXT.VALIDATION.EMAIL_REQUIRED;
    }

    if (values.password.length < 6) {
      nextErrors.password = UI_TEXT.VALIDATION.PASSWORD_MIN;
    }

    if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = UI_TEXT.VALIDATION.CONFIRM_PASSWORD_MATCH;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateStepTwo(): boolean {
    const nextErrors: Partial<RegisterFormValues> = {};

    if (values.department.trim().length < 2) {
      nextErrors.department = UI_TEXT.VALIDATION.DEPARTMENT_MIN;
    }

    if (!values.joinDate) {
      nextErrors.joinDate = UI_TEXT.VALIDATION.JOIN_DATE_REQUIRED;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 1) {
      if (validateStepOne()) {
        setStep(2);
      }

      return;
    }

    if (!validateStepTwo()) {
      return;
    }

    await register({
      name: values.name,
      email: values.email,
      password: values.password,
      department: values.department,
      joinDate: values.joinDate,
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {step === 1 ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">{UI_TEXT.AUTH.NAME}</Label>
            <Input
              id="name"
              placeholder={UI_TEXT.PLACEHOLDER.NAME}
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? (
              <p className="text-sm text-destructive">{errors.name}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{UI_TEXT.AUTH.EMAIL}</Label>
            <Input
              id="email"
              placeholder={UI_TEXT.PLACEHOLDER.EMAIL}
              type="email"
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
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
              onChange={(event) => updateValue("password", event.target.value)}
              aria-invalid={Boolean(errors.password)}
              onToggleVisibility={() =>
                setIsPasswordVisible((isVisible) => !isVisible)
              }
            />
            {errors.password ? (
              <p className="text-sm text-destructive">{errors.password}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {UI_TEXT.AUTH.CONFIRM_PASSWORD}
            </Label>
            <PasswordInput
              id="confirmPassword"
              isVisible={isConfirmPasswordVisible}
              placeholder={UI_TEXT.PLACEHOLDER.CONFIRM_PASSWORD}
              value={values.confirmPassword}
              onChange={(event) =>
                updateValue("confirmPassword", event.target.value)
              }
              aria-invalid={Boolean(errors.confirmPassword)}
              onToggleVisibility={() =>
                setIsConfirmPasswordVisible((isVisible) => !isVisible)
              }
            />
            {errors.confirmPassword ? (
              <p className="text-sm text-destructive">
                {errors.confirmPassword}
              </p>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="department">{UI_TEXT.AUTH.DEPARTMENT}</Label>
            <Input
              id="department"
              placeholder={UI_TEXT.PLACEHOLDER.DEPARTMENT}
              value={values.department}
              onChange={(event) => updateValue("department", event.target.value)}
              aria-invalid={Boolean(errors.department)}
            />
            {errors.department ? (
              <p className="text-sm text-destructive">{errors.department}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="joinDate">{UI_TEXT.AUTH.JOIN_DATE}</Label>
            <Input
              id="joinDate"
              placeholder={UI_TEXT.PLACEHOLDER.JOIN_DATE}
              type="date"
              value={values.joinDate}
              onChange={(event) => updateValue("joinDate", event.target.value)}
              aria-invalid={Boolean(errors.joinDate)}
            />
            {errors.joinDate ? (
              <p className="text-sm text-destructive">{errors.joinDate}</p>
            ) : null}
          </div>
        </>
      )}
      <div className="flex gap-2">
        {step === 2 ? (
          <Button
            className="flex-1"
            disabled={isLoading}
            type="button"
            variant="outline"
            onClick={() => setStep(1)}
          >
            <ArrowLeftIcon />
            {UI_TEXT.AUTH.BACK}
          </Button>
        ) : null}
        <Button className="flex-1" disabled={isLoading} type="submit">
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : step === 1 ? (
            <ArrowRightIcon />
          ) : (
            <UserPlusIcon />
          )}
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}
