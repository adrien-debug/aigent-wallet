"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInView } from "@/components/shared/fade-in-view";
import { SectionHeader } from "@/components/marketing/section-header";
import { FeatureCard } from "@/components/marketing/feature-card";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequestAccessDialog } from "@/components/marketing/request-access-dialog";
import { staggerContainer, fadeUp } from "@/lib/motion";

const logos = [
  "Northwind Autonomy",
  "Lattice Compute",
  "Helio Markets",
  "Vector Research",
  "Kite M2M",
];

export function SocialProof() {
  return (
    <FadeInView>
      <PageWrapper className="py-14">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Used by autonomous infra teams
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((name) => (
            <div
              key={name}
              className="flex h-12 items-center justify-center rounded-xl border border-border/70 bg-card/50 text-center text-xs font-medium text-muted-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </PageWrapper>
    </FadeInView>
  );
}

export function LandingSections() {
  return (
    <div className="space-y-24 pb-24 pt-10 sm:space-y-28 sm:pb-28">
      <FadeInView>
        <PageWrapper>
          <SectionHeader
            eyebrow="Architecture"
            title="Why agent wallets need a new substrate"
            description="Human-centric wallets assume discretionary signing. Agents need programmatic limits, counterparty intelligence, and replay-safe execution paths that survive scale."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Deterministic guardrails"
              description="Policies compile to evaluation traces. Every spend path is explainable before broadcast."
            />
            <FeatureCard
              title="Hierarchical treasuries"
              description="Treasury fans out into scoped sub-wallets with caps, asset rules, and agent ownership."
            />
            <FeatureCard
              title="Operator-grade telemetry"
              description="Volume, drift, and anomaly signals surface where finance and platform teams already work."
            />
          </div>
        </PageWrapper>
      </FadeInView>

      <FadeInView>
        <PageWrapper className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Treasury"
            title="Programmable treasury for autonomous systems"
            description="Model budgets as code. Route machine payments through simulation, approvals, and immutable audit without slowing agents down."
          />
          <Card className="border-border/80 bg-card/70">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Streaming settlement</span>
                <Badge variant="muted">USDC</Badge>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[68%] rounded-full bg-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Sub-second policy checks on outbound flows with burst-aware smoothing for
                GPU and data workloads.
              </p>
            </CardContent>
          </Card>
        </PageWrapper>
      </FadeInView>

      <FadeInView>
        <PageWrapper className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Card className="order-2 border-border/80 bg-card/70 lg:order-1">
            <CardContent className="space-y-3 p-6 font-mono text-xs text-muted-foreground">
              <p className="text-foreground">policy.evaluate(intent)</p>
              <p>→ simulation.ok</p>
              <p>→ risk.score = 18</p>
              <p>→ approval.not_required</p>
              <p className="text-emerald-300">→ relay.broadcast()</p>
            </CardContent>
          </Card>
          <div className="order-1 space-y-6 lg:order-2">
            <SectionHeader
              eyebrow="Policy engine"
              title="Rules that behave like infrastructure"
              description="Author policies once, version them like services, and shadow-test against live traffic before enforcement."
            />
          </div>
        </PageWrapper>
      </FadeInView>

      <FadeInView>
        <PageWrapper>
          <SectionHeader
            align="center"
            eyebrow="Payments"
            title="Machine-native payments with adult supervision"
            description="M2M transfers inherit counterparty risk models, velocity controls, and circuit breakers tuned for autonomous actors."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={fadeUp}>
              <FeatureCard
                title="Counterparty graph"
                description="First-touch flows pause or route to review based on historical behavior and attestations."
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <FeatureCard
                title="Approvals that scale"
                description="Quorum workflows with SLA timers, delegated break-glass, and automatic rollback on breach."
              />
            </motion.div>
          </motion.div>
        </PageWrapper>
      </FadeInView>

      <FadeInView>
        <PageWrapper className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Risk & audit"
            title="Risk controls with receipts"
            description="Anomaly models, rate limits, and policy drift alerts converge into a single audit timeline with trace IDs end-to-end."
          />
          <FeatureCard
            title="Immutable audit trail"
            description="Every decision—allow, deny, review—ships with structured context for regulators and internal security."
          />
        </PageWrapper>
      </FadeInView>

      <FadeInView>
        <PageWrapper>
          <SectionHeader
            eyebrow="Orchestration"
            title="Multi-wallet orchestration without chaos"
            description="Visualize parent treasuries, agent scopes, and policy attachments in one surface purpose-built for operators."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <FeatureCard title="Parent / child graphs" description="Navigate complex hierarchies with health signals per node." />
            <FeatureCard title="Scoped credentials" description="Agents receive least-privilege keys with automatic rotation hooks." />
            <FeatureCard title="Environment parity" description="Sandbox policies against production-shaped traffic safely." />
          </div>
        </PageWrapper>
      </FadeInView>

      <FadeInView>
        <PageWrapper className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Developers"
            title="Developer-first integration"
            description="Typed SDKs, signed webhooks, and policy hooks that fit into the same CI/CD rigor as the rest of your stack."
          />
          <Card className="border-border/80 bg-card/70">
            <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
              <p className="text-foreground font-medium">Ship faster</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Deterministic local fixtures for agents</li>
                <li>OpenAPI-compatible control plane</li>
                <li>Replayable simulations in PR checks</li>
              </ul>
            </CardContent>
          </Card>
        </PageWrapper>
      </FadeInView>

      <FadeInView>
        <PageWrapper>
          <Card className="border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card">
            <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">Ready when your agents are</p>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  Stand up a sandbox org, connect policies, and mirror your production
                  topology without moving funds.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <RequestAccessDialog />
                <Button variant="outline" asChild>
                  <Link href="/developers">Developer docs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </PageWrapper>
      </FadeInView>
    </div>
  );
}
