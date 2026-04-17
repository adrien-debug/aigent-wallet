"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { DASHBOARD_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TopbarBreadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const current = DASHBOARD_NAV.find((n) => n.href === pathname);
  const label = current?.label ?? "Console";

  if (pathname === "/app") {
    return (
      <nav
        className={cn(
          "flex min-w-0 items-center text-xs text-muted-foreground",
          className,
        )}
        aria-label="Fil d’Ariane"
      >
        <span className="truncate font-medium text-foreground">Overview</span>
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        "flex min-w-0 items-center gap-1 text-xs text-muted-foreground",
        className,
      )}
      aria-label="Fil d’Ariane"
    >
      <Link
        href="/app"
        className="shrink-0 rounded-md px-1 py-0.5 transition-colors hover:bg-muted/60 hover:text-foreground"
      >
        Console
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
      <span className="truncate font-medium text-foreground">{label}</span>
    </nav>
  );
}
