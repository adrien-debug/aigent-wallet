import type { Transaction } from "@/types";

const TX_STATUSES: Transaction["status"][] = [
  "confirmed",
  "pending",
  "failed",
  "blocked",
];

export function parseTransactionStatus(
  raw: string | null,
): Transaction["status"] | "all" | null {
  if (raw == null || raw === "" || raw === "all") return "all";
  if (TX_STATUSES.includes(raw as Transaction["status"])) {
    return raw as Transaction["status"];
  }
  return null;
}

export function filterTransactions(
  rows: Transaction[],
  opts: {
    q?: string;
    status: Transaction["status"] | "all";
    walletId?: string;
  },
): Transaction[] {
  let out = rows;
  if (opts.status !== "all") {
    out = out.filter((t) => t.status === opts.status);
  }
  if (opts.walletId) {
    out = out.filter((t) => t.walletId === opts.walletId);
  }
  if (opts.q?.trim()) {
    const s = opts.q.trim().toLowerCase();
    out = out.filter(
      (t) =>
        t.walletName.toLowerCase().includes(s) ||
        t.hash.toLowerCase().includes(s) ||
        t.counterparty.toLowerCase().includes(s) ||
        t.id.toLowerCase().includes(s),
    );
  }
  return out;
}
