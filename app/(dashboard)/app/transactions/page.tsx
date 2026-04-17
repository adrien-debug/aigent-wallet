"use client";

import { useMemo, useState } from "react";
import { transactions } from "@/data/transactions";
import { TransactionTable } from "@/components/dashboard/transaction-table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, RiskBadge } from "@/components/dashboard/status-badge";
import { formatNumber } from "@/lib/utils";
import type { Transaction } from "@/types";

export default function TransactionsPage() {
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<"all" | Transaction["status"]>("all");

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      if (tab !== "all" && tx.status !== tab) return false;
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return (
        tx.walletName.toLowerCase().includes(s) ||
        tx.hash.toLowerCase().includes(s) ||
        tx.counterparty.toLowerCase().includes(s)
      );
    });
  }, [q, tab]);

  const selected = useMemo(
    () => transactions.find((t) => t.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Searchable ledger with risk overlays and settlement states.
        </p>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Search wallet, hash, counterparty…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="max-w-md"
          aria-label="Search transactions"
        />
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Card className="border-border/80 bg-card/80">
        <CardHeader>
          <CardTitle className="text-base">Ledger</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <TransactionTable rows={filtered} selectedId={selectedId} onSelect={setSelectedId} />
          <p className="mt-4 text-xs text-muted-foreground">
            Showing {filtered.length} of {transactions.length} events (mock pagination).
          </p>
        </CardContent>
      </Card>
      {selected ? (
        <Card className="border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Transaction detail</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Hash</p>
              <p className="font-mono text-xs">{selected.hash}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Timestamp</p>
              <p className="font-mono text-xs">{new Date(selected.timestamp).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Wallet</p>
              <p>{selected.walletName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Counterparty</p>
              <p className="break-all font-mono text-xs">{selected.counterparty}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Amount</p>
              <p className="font-mono">
                {formatNumber(selected.amount, 0)} {selected.token}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge kind="transaction" value={selected.status} />
              <RiskBadge flag={selected.riskFlag} />
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
