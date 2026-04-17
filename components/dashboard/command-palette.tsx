"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DASHBOARD_NAV } from "@/lib/constants";

const routes = [
  { label: "Marketing home", href: "/" },
  ...DASHBOARD_NAV.map((n) => ({ label: n.label, href: n.href })),
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return routes;
    return routes.filter((r) => r.label.toLowerCase().includes(s));
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-9 w-full max-w-sm items-center gap-2 rounded-lg border border-border/80 bg-muted/20 px-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/40 lg:flex"
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" aria-hidden />
        <span className="flex-1">Search…</span>
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search and navigate across marketing and console routes.
        </DialogDescription>
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to page…"
            className="border-0 bg-transparent focus-visible:ring-0"
            autoFocus
          />
        </div>
        <ul className="max-h-72 overflow-auto p-2 text-sm">
          {filtered.map((r) => (
            <li key={r.href}>
              <button
                type="button"
                className="flex w-full rounded-md px-2 py-2 text-left hover:bg-muted"
                onClick={() => {
                  router.push(r.href);
                  setOpen(false);
                  setQ("");
                }}
              >
                {r.label}
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  {r.href}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
