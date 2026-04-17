"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowLeftRight,
  LayoutDashboard,
  ScrollText,
  Settings,
  Shield,
  Wallet,
} from "lucide-react";
import { DASHBOARD_NAV, PRODUCT_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const icons = {
  LayoutDashboard,
  Wallet,
  Shield,
  ArrowLeftRight,
  Activity,
  ScrollText,
  Settings,
} as const;

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col border-r border-border/60 bg-card/40 px-3 py-4">
      <Link
        href="/"
        onClick={onNavigate}
        className="mb-6 flex items-center gap-2 px-2 text-sm font-semibold tracking-tight"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-xs">
          Ai
        </span>
        <span>{PRODUCT_NAME}</span>
      </Link>
      <nav className="flex flex-1 flex-col gap-1" aria-label="Console">
        {DASHBOARD_NAV.map((item) => {
          const Icon = icons[item.icon];
          const active =
            pathname === item.href ||
            (item.href !== "/app" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 rounded-xl border border-border/70 bg-background/40 p-3 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Sandbox</p>
        <p className="mt-1">No keys leave this device. Data is illustrative.</p>
      </div>
    </div>
  );
}
