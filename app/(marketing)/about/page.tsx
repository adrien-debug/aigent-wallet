import type { Metadata } from "next";
import { FadeInView } from "@/components/shared/fade-in-view";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card, CardContent } from "@/components/ui/card";

const principles = [
  {
    title: "Determinism over vibes",
    body: "Financial decisions should be reproducible, testable, and explainable—not vibes-based prompts.",
  },
  {
    title: "Operators are first-class",
    body: "Finance, security, and platform teams get interfaces designed for incident response and audit.",
  },
  {
    title: "Agents are economic actors",
    body: "We build for a world where software spends money continuously, not occasionally.",
  },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "Mission and principles for programmable financial infrastructure built for autonomous, economic agents.",
};

export default function AboutPage() {
  return (
    <div className="border-b border-border/60 py-16 sm:py-20">
      <PageWrapper>
        <FadeInView>
          <SectionHeader
            eyebrow="About"
            title="Autonomous systems deserve autonomous-grade money"
            description="AI agents are becoming economic actors. Wallets built for humans are insufficient: they lack policy depth, machine-safe approvals, and evidence-grade telemetry. Aigent builds programmable financial infrastructure for autonomous systems—serious enough for regulated environments, fast enough for agents."
          />
        </FadeInView>
        <FadeInView className="mt-12 grid gap-6 lg:grid-cols-3">
          {principles.map((p) => (
            <Card key={p.title} className="border-border/80 bg-card/80">
              <CardContent className="p-6">
                <p className="text-base font-semibold">{p.title}</p>
                <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </FadeInView>
        <FadeInView className="mt-12">
          <Card className="border-border/80 bg-gradient-to-br from-card to-background">
            <CardContent className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold">Manifesto</p>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                  We will not glamorize unchecked agent spend. We will not ship casino aesthetics. We
                  will instrument every meaningful decision, default to deny, and give humans the
                  levers they need when models misbehave.
                </p>
              </div>
              <div className="space-y-4 font-mono text-xs text-muted-foreground">
                <p>2025 · Internal design partner program</p>
                <p>2026 · Risk engine v2 + federated approvals</p>
                <p>Next · Policy mesh across regions</p>
              </div>
            </CardContent>
          </Card>
        </FadeInView>
      </PageWrapper>
    </div>
  );
}
