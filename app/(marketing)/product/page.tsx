import type { Metadata } from "next";
import { FadeInView } from "@/components/shared/fade-in-view";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { SectionHeader } from "@/components/marketing/section-header";
import { FeatureCard } from "@/components/marketing/feature-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Agent-native wallets with policy compilation, sub-wallets, streaming payments, and AI-grade audit trails.",
};

export default function ProductPage() {
  return (
    <div className="border-b border-border/60 py-16 sm:py-20">
      <PageWrapper>
        <FadeInView>
          <SectionHeader
            eyebrow="Product"
            title="Aigent is not a consumer wallet with an API bolted on"
            description="It is financial infrastructure for autonomous actors: hierarchical treasuries, policy compilation, simulation, approvals, and an audit trail designed for operators and regulators alike."
          />
        </FadeInView>
        <FadeInView className="mt-12 grid gap-6 lg:grid-cols-3">
          <FeatureCard
            title="How it works"
            description="Agents declare intents. Policies evaluate against live risk context. Approved intents flow to isolated signing paths with rate limits and trace IDs."
          />
          <FeatureCard
            title="Why not a classic wallet"
            description="Classic wallets optimize for human discretion. Aigent optimizes for machine throughput with operator-grade controls and explainable denials."
          />
          <FeatureCard
            title="Architecture"
            description="Control plane for policy and audit, execution plane for signing and relay, and observability plane for drift, anomalies, and replay."
          />
        </FadeInView>
        <FadeInView className="mt-16">
          <SectionHeader
            eyebrow="Capabilities"
            title="Everything your agents touch is governed"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                t: "Wallet policies",
                d: "Versioned rules with shadow mode, staged rollout, and per-wallet attachment.",
              },
              {
                t: "Agent permissions",
                d: "Scoped credentials with spend ceilings, asset allowlists, and counterparties graph.",
              },
              {
                t: "Sub-wallets",
                d: "Treasury fans into isolated scopes so a research agent cannot move execution capital.",
              },
              {
                t: "Streaming payments",
                d: "M2M micro-settlements with velocity smoothing for compute and data markets.",
              },
              {
                t: "Approvals",
                d: "Quorum workflows with timers, escalation, and automatic freeze on SLA breach.",
              },
              {
                t: "Logs & AI audit trail",
                d: "Structured events with model attribution when copilots propose financial actions.",
              },
            ].map((item) => (
              <FeatureCard key={item.t} title={item.t} description={item.d} />
            ))}
          </div>
        </FadeInView>
        <FadeInView className="mt-16">
          <SectionHeader
            eyebrow="Built for"
            title="Teams shipping autonomous economics"
          />
          <Card className="mt-8 border-border/80 bg-card/70">
            <CardContent className="flex flex-wrap gap-2 p-6">
              {[
                "AI agents",
                "Trading bots",
                "Compute brokers",
                "Autonomous marketplaces",
                "Internal copilots with budgets",
              ].map((label) => (
                <Badge
                  key={label}
                  variant="secondary"
                  className="rounded-lg px-3 py-1.5 text-sm"
                >
                  {label}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </FadeInView>
      </PageWrapper>
    </div>
  );
}
