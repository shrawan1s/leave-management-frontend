"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UI_TEXT } from "@/constants/ui-text";
import { cn } from "@/lib/utils";
import type { PasswordInputProps } from "@/types";

export function PasswordInput({
  isVisible,
  onToggleVisibility,
  ...inputProps
}: PasswordInputProps) {
  return (
    <div className="relative">
      <Input
        className="pr-10"
        type={isVisible ? "text" : "password"}
        {...inputProps}
      />
      <button
        aria-label={
          isVisible
            ? UI_TEXT.AUTH.HIDE_PASSWORD
            : UI_TEXT.AUTH.SHOW_PASSWORD
        }
        className={cn(
          "absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none",
          "hover:bg-transparent hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring/40",
          "active:translate-y-[-50%] active:bg-transparent",
        )}
        type="button"
        onClick={onToggleVisibility}
      >
        {isVisible ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </div>
  );
}
