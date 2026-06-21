import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import type { AuthShellProps } from "@/types";

export function AuthShell({
  children,
  footerHref,
  footerLabel,
  footerText,
  title,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4 py-8">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
          <p className="text-sm text-muted-foreground">
            {footerText}{" "}
            <Link
              className="font-medium text-foreground underline"
              href={footerHref}
            >
              {footerLabel}
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
