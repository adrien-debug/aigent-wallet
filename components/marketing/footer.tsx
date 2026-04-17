import Link from "next/link";
import { PRODUCT_NAME } from "@/lib/constants";
import { getConsoleEntryHref } from "@/lib/supabase/env";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold">{PRODUCT_NAME}</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Programmable treasury for autonomous systems. Policies, simulation, and
            audit by default.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3 lg:max-w-lg">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/product" className="hover:text-foreground">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-foreground">
                  Security
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Build
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/developers" className="hover:text-foreground">
                  Developers
                </Link>
              </li>
              <li>
                <Link href={getConsoleEntryHref()} className="hover:text-foreground">
                  Demo console
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Company
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
          </p>
          <p className="font-mono text-[11px]">Sandbox data · No on-chain execution</p>
        </div>
      </div>
    </footer>
  );
}
