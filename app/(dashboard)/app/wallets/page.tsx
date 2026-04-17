"use client";

import { useMemo, useState } from "react";
import { wallets } from "@/data/wallets";
import { transactions } from "@/data/transactions";
import { WalletTable } from "@/components/dashboard/wallet-table";
import { WalletCard } from "@/components/dashboard/wallet-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatUsd } from "@/lib/utils";
import { StatusBadge } from "@/components/dashboard/status-badge";

export default function WalletsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(wallets[0]?.id ?? null);
  const selected = useMemo(
    () => wallets.find((w) => w.id === selectedId) ?? null,
    [selectedId],
  );
  const recent = useMemo(
    () => transactions.filter((t) => t.walletId === selectedId).slice(0, 4),
    [selectedId],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Wallets</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hierarchical treasuries with scoped agents, caps, and attached policies.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {wallets.map((w) => (
          <WalletCard
            key={w.id}
            wallet={w}
            selected={selectedId === w.id}
            onSelect={() => setSelectedId(w.id)}
          />
        ))}
      </div>
      <Card className="border-border/80 bg-card/80">
        <CardHeader>
          <CardTitle className="text-base">Directory</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <WalletTable rows={wallets} selectedId={selectedId} onSelect={setSelectedId} />
        </CardContent>
      </Card>
      {selected ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/80 bg-card/80">
            <CardHeader>
              <CardTitle className="text-base">Wallet detail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge kind="wallet" value={selected.status} />
                <Badge variant="outline">{selected.type}</Badge>
                <Badge variant="outline" className="font-mono">
                  {selected.network}
                </Badge>
              </div>
              <Separator />
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">Balance</dt>
                  <dd className="font-mono text-base">{formatUsd(selected.balanceUsd)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Daily cap</dt>
                  <dd className="font-mono text-base">{formatUsd(selected.dailyCapUsd)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Spent today</dt>
                  <dd className="font-mono text-base">{formatUsd(selected.spentTodayUsd)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Policy</dt>
                  <dd>{selected.policyName}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-muted-foreground">Address</dt>
                  <dd className="font-mono text-xs">{selected.address}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-muted-foreground">Tags</dt>
                  <dd className="flex flex-wrap gap-1 pt-1">
                    {selected.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <Card className="border-border/80 bg-card/80">
            <CardHeader>
              <CardTitle className="text-base">Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recent.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent transactions for this wallet.</p>
              ) : (
                recent.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border/60 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{tx.category}</p>
                      <p className="font-mono text-xs text-muted-foreground">{tx.hash}</p>
                    </div>
                    <p className="font-mono text-sm">
                      {tx.amount} {tx.token}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
