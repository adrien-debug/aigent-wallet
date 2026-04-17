import type { Metadata } from "next";
import Link from "next/link";
import { MetricCard } from "@/components/dashboard/metric-card";
import {
  RiskTrendChart,
  SpendByWalletChart,
  TxCountChart,
  VolumeChart,
} from "@/components/dashboard/overview-charts";
import { OnboardingBanner } from "@/components/dashboard/onboarding-banner";
import { AuditTimeline } from "@/components/dashboard/audit-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dashboardMetrics, riskTrend, spendByWallet, volumeSeries } from "@/data/metrics";
import { transactions } from "@/data/transactions";
import { wallets } from "@/data/wallets";
import { riskAlerts } from "@/data/alerts";
import { auditEvents } from "@/data/audit";
import { policies } from "@/data/policies";
import { formatNumber, formatUsd } from "@/lib/utils";
import { StatusBadge, RiskBadge } from "@/components/dashboard/status-badge";

export const metadata: Metadata = {
  title: "Overview",
  description: "Balances, volume, risk, alerts, and recent audit activity across agent wallets.",
};

export default function AppOverviewPage() {
  const recentTx = transactions.slice(0, 5);
  const activeWallets = wallets.filter((w) => w.status === "active").slice(0, 4);
  const breaches = policies.filter((p) => p.status === "shadow");
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live posture of treasuries, policies, and risk signals across environments.
        </p>
      </div>
      <OnboardingBanner />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard title="Total balance" value={formatUsd(dashboardMetrics.totalBalanceUsd)} />
        <MetricCard
          title="Active agent wallets"
          value={String(dashboardMetrics.activeWallets)}
          hint="Paused or frozen wallets excluded."
        />
        <MetricCard
          title="30d volume"
          value={formatUsd(dashboardMetrics.monthlyVolumeUsd)}
        />
        <MetricCard
          title="Policy compliance"
          value={`${formatNumber(dashboardMetrics.policyCompliancePct, 1)}%`}
          hint="Rolling 7d window, weighted by notional."
        />
        <MetricCard
          title="Risk score"
          value={`${dashboardMetrics.riskScore} / 100`}
          hint="Composite model across velocity and counterparties."
        />
        <MetricCard
          title="Pending approvals"
          value={String(dashboardMetrics.pendingApprovals)}
          hint="Awaiting quorum or SLA escalation."
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <VolumeChart data={volumeSeries} />
        <TxCountChart data={volumeSeries} />
        <SpendByWalletChart data={spendByWallet} />
        <RiskTrendChart data={riskTrend} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/80 bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent transactions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/app/transactions">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTx.map((tx) => (
              <div
                key={tx.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 bg-background/40 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{tx.walletName}</p>
                  <p className="font-mono text-xs text-muted-foreground">{tx.hash}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{formatNumber(tx.amount, 0)} {tx.token}</span>
                  <StatusBadge kind="transaction" value={tx.status} />
                  <RiskBadge flag={tx.riskFlag} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Active wallets</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/app/wallets">Manage</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeWallets.map((w) => (
              <div
                key={w.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 bg-background/40 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.agent}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm">{formatUsd(w.balanceUsd)}</p>
                  <Badge variant="outline" className="mt-1 text-[11px]">
                    {w.network}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Recent alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riskAlerts.slice(0, 3).map((a) => (
              <div key={a.id} className="rounded-xl border border-border/70 bg-background/40 p-3">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Policy breaches (shadow)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {breaches.map((p) => (
              <div key={p.id} className="rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 p-3">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Shadow mode · would affect {p.walletsAffected} wallets
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <AuditTimeline events={auditEvents.slice(0, 5)} />
    </div>
  );
}
