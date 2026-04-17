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
        "fixed inset-x-0 top-6 z-50 mx-auto flex max-w-5xl justify-center px-4",
        className,
      )}
    >
      <div className="flex h-14 w-full items-center justify-between gap-8 rounded-full border border-white/10 bg-background/60 px-6 shadow-2xl backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white shadow-inner">
            Ai
          </span>
          <span className="text-white">{PRODUCT_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Marketing">
          {MARKETING_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button
            variant="ghost"
            className="hidden text-white/80 hover:bg-white/10 hover:text-white sm:inline-flex"
            asChild
          >
            <Link href={getConsoleEntryHref()}>View demo</Link>
          </Button>
          <RequestAccessDialog>
            <Button className="h-10 rounded-full px-4 text-sm font-medium">
              Request access
            </Button>
          </RequestAccessDialog>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 md:hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100%,320px)] border-white/10 bg-background/80 backdrop-blur-xl"
            >
              <div className="mt-8 flex flex-col gap-4">
                {MARKETING_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-white/80 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={getConsoleEntryHref()}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-primary hover:text-primary/80"
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
