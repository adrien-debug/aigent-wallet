"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { PRODUCT_NAME, MARKETING_NAV } from "@/lib/constants";
import { getConsoleEntryHref } from "@/lib/supabase/env";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { RequestAccessDialog } from "@/components/marketing/request-access-dialog";

export function Navbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-sm">
            Ai
          </span>
          <span>{PRODUCT_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Marketing">
          {MARKETING_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <Link href={getConsoleEntryHref()}>View demo</Link>
          </Button>
          <RequestAccessDialog />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,320px)]">
              <div className="mt-8 flex flex-col gap-4">
                {MARKETING_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={getConsoleEntryHref()}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-primary"
                >
                  View demo
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
