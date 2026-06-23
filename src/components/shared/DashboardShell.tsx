"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDaysIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { ROUTES } from "@/constants/routes";
import { UI_TEXT } from "@/constants/ui-text";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { DashboardNavItem, DashboardShellProps } from "@/types";

const employeeNavItems: DashboardNavItem[] = [
  {
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboardIcon,
    label: UI_TEXT.NAV.DASHBOARD,
  },
  {
    href: ROUTES.APPLY,
    icon: CalendarDaysIcon,
    label: UI_TEXT.NAV.APPLY,
  },
  {
    href: ROUTES.MY_LEAVES,
    icon: ClipboardListIcon,
    label: UI_TEXT.NAV.MY_LEAVES,
  },
];

const adminNavItems: DashboardNavItem[] = [
  {
    href: ROUTES.ADMIN_DASHBOARD,
    icon: LayoutDashboardIcon,
    label: UI_TEXT.NAV.ADMIN_DASHBOARD,
  },
  {
    href: ROUTES.ADMIN_REQUESTS,
    icon: ClipboardCheckIcon,
    label: UI_TEXT.NAV.ADMIN_REQUESTS,
  },
];

/**
 * Role-aware protected shell with sidebar navigation and logout confirmation.
 */
export function DashboardShell({ children, role }: DashboardShellProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navItems = role === "ADMIN" ? adminNavItems : employeeNavItems;

  async function confirmLogout() {
    setIsLogoutDialogOpen(false);
    await logout();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <aside className="flex flex-col border-b bg-card px-4 py-4 md:sticky md:top-0 md:min-h-screen md:w-64 md:shrink-0 md:border-r md:border-b-0 xl:w-72">
          <div className="flex items-center justify-between gap-3">
            <Link
              className="text-base font-semibold tracking-normal"
              href={navItems[0]?.href ?? "/"}
            >
              {UI_TEXT.META.TITLE}
            </Link>
            <ThemeToggle />
          </div>

          <nav
            aria-label={UI_TEXT.NAV.MENU_LABEL}
            className="mt-4 flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Button
                  key={item.href}
                  asChild
                  className={cn(
                    "h-10 justify-start gap-2 px-3",
                    isActive && "bg-primary text-primary-foreground",
                  )}
                  variant={isActive ? "default" : "ghost"}
                >
                  <Link href={item.href}>
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>

          <div className="mt-4 border-t pt-4 md:mt-auto">
            <Button
              className="w-full justify-start gap-2"
              type="button"
              variant="ghost"
              onClick={() => setIsLogoutDialogOpen(true)}
            >
              <LogOutIcon className="size-4" />
              <span>{UI_TEXT.NAV.LOGOUT}</span>
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
            {children}
          </div>
        </div>
      </div>
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{UI_TEXT.AUTH.LOGOUT_TITLE}</DialogTitle>
            <DialogDescription>
              {UI_TEXT.AUTH.LOGOUT_DESCRIPTION}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLogoutDialogOpen(false)}
            >
              {UI_TEXT.AUTH.LOGOUT_CANCEL}
            </Button>
            <Button type="button" onClick={confirmLogout}>
              <LogOutIcon className="size-4" />
              {UI_TEXT.AUTH.LOGOUT_CONFIRM}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
