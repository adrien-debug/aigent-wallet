import type { Metadata } from "next";
import { RiskPanel } from "@/components/dashboard/risk-panel";
import { MetricCard } from "@/components/dashboard/metric-card";
import {
  RiskTrendChart,
  SpendByWalletChart,
} from "@/components/dashboard/overview-charts";
import { riskAlerts } from "@/data/alerts";
import { riskTrend, spendByWallet } from "@/data/metrics";
import { transactions } from "@/data/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Risk",
  description:
    "Global score, anomaly feed, blocked flows, and counterparty heat indicators.",
};

export default function RiskPage() {
  const blocked = transactions.filter((t) => t.status === "blocked");
  const highRisk = transactions.filter((t) => t.riskFlag === "high");
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Risk</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Composite scoring, blocked flows, and counterparties under elevated review.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Global risk score"
          value="22 / 100"
          hint="Lower is calmer."
        />
        <MetricCard title="Blocked (24h)" value={String(blocked.length)} />
        <MetricCard title="High-risk flags" value={String(highRisk.length)} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <RiskTrendChart data={riskTrend} />
        <SpendByWalletChart data={spendByWallet} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <RiskPanel alerts={riskAlerts} />
        <Card className="border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Heat indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {[
              { label: "Velocity", value: 62, tone: "amber" },
              { label: "Counterparty trust", value: 28, tone: "emerald" },
              { label: "Policy drift", value: 41, tone: "amber" },
              { label: "Budget adherence", value: 74, tone: "sky" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-mono">{row.value}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${row.value}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-border/70 bg-background/40 p-3 text-xs text-muted-foreground">
              Suspicious behavior queue is empty in sandbox. In production, this surface
              triages model-driven alerts with analyst notes.
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/80 bg-card/80">
        <CardHeader>
          <CardTitle className="text-base">High-risk counterparties</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {["0xUnk…9f01", "TORN router (flagged)", "New CEX deposit"].map((c) => (
            <Badge key={c} variant="danger" className="font-mono text-[11px]">
              {c}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
