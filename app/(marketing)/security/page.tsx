import type { Metadata } from "next";
import { FadeInView } from "@/components/shared/fade-in-view";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  {
    title: "Policy-based access",
    body: "Every spend path is checked against compiled policies with deterministic traces.",
  },
  {
    title: "Transaction simulation",
    body: "Intents are dry-run against chain state and internal risk models before signing.",
  },
  {
    title: "Threshold approvals",
    body: "High-notional flows require quorum approval with SLA timers and escalation paths.",
  },
  {
    title: "Key isolation",
    body: "Material keys live in isolated execution cells with minimal attack surface and rotation hooks.",
  },
  {
    title: "Audit logs",
    body: "Immutable, structured events with trace IDs from intent to broadcast for every decision.",
  },
  {
    title: "Rate limits",
    body: "Per-wallet and per-agent throttles protect against runaway automation and abuse.",
  },
  {
    title: "Anomaly detection",
    body: "Composite models score velocity, counterparties, and policy drift with operator alerts.",
  },
  {
    title: "Spend controls",
    body: "Caps, asset restrictions, and circuit breakers tuned for autonomous workloads.",
  },
  {
    title: "Emergency freeze",
    body: "One-click org-wide freeze with scoped thaw workflows and automatic paging.",
  },
];

export const metadata: Metadata = {
  title: "Security",
  description:
    "Policy-based access, simulation, threshold approvals, key isolation, audit logs, rate limits, and emergency freeze.",
};

export default function SecurityPage() {
  return (
    <div className="border-b border-border/60 py-16 sm:py-20">
      <PageWrapper>
        <FadeInView>
          <SectionHeader
            eyebrow="Security"
            title="Controls you can defend in a board room"
            description="Aigent assumes breach: least privilege by default, explicit approvals for sensitive paths, and evidence-grade logging so security teams sleep better while agents move faster."
          />
        </FadeInView>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FadeInView key={item.title}>
              <Card className="h-full border-border/80 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-base">
                    <span className="mr-2 font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            </FadeInView>
          ))}
        </div>
      </PageWrapper>
    </div>
  );
}
