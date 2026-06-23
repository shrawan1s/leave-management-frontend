"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { UI_TEXT } from "@/constants/ui-text";

/**
 * Toggles the app between light and dark themes.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button
      aria-label={UI_TEXT.THEME.LABEL}
      size="icon"
      type="button"
      variant="outline"
      onClick={() => setTheme(nextTheme)}
    >
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
