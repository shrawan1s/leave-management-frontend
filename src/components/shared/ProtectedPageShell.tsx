"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { UI_TEXT } from "@/constants/ui-text";
import { useAuth } from "@/hooks/useAuth";
import type { ProtectedPageShellProps } from "@/types";

export function ProtectedPageShell({
  body,
  title,
}: ProtectedPageShellProps) {
  const { logout } = useAuth();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button type="button" variant="outline" onClick={logout}>
            <LogOutIcon />
            {UI_TEXT.AUTH.LOGOUT}
          </Button>
        </div>
      </header>
      <p className="text-muted-foreground">{body}</p>
    </main>
  );
}
