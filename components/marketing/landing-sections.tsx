"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInView } from "@/components/shared/fade-in-view";
import { SectionHeader } from "@/components/marketing/section-header";
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
    <div className="space-y-32 pb-32 pt-16 sm:space-y-40 sm:pb-40">
      <FadeInView>
        <PageWrapper>
          <SectionHeader
            align="center"
            eyebrow="The OS"
            title="A new substrate for agents"
            description="Human-centric wallets assume discretionary signing. Agents need programmatic limits, counterparty intelligence, and replay-safe execution paths."
          />

          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
            {/* Block 1: Policy Engine (Large) */}
            <div className="group relative col-span-1 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] md:col-span-2 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Terminal className="mb-6 h-8 w-8 text-primary" />
              <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                Infrastructure as Code
              </h3>
              <p className="mt-4 max-w-md text-lg text-white/60">
                Author policies once, version them like services, and shadow-test
                against live traffic before enforcement.
              </p>
              <div className="mt-10 rounded-2xl border border-white/10 bg-black/50 p-6 font-mono text-sm text-white/40 shadow-inner">
                <p className="text-white/80">policy.evaluate(intent)</p>
                <p className="mt-2">→ simulation.ok</p>
                <p>
                  → risk.score = <span className="text-primary">18</span>
                </p>
                <p>→ approval.not_required</p>
                <p className="mt-2 text-emerald-400">→ relay.broadcast()</p>
              </div>
            </div>

            {/* Block 2: Streaming (Tall) */}
            <div className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div>
                <Zap className="mb-6 h-8 w-8 text-primary" />
                <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  Sub-second Settlement
                </h3>
                <p className="mt-4 text-lg text-white/60">
                  Burst-aware smoothing for GPU and data workloads. Machine payments
                  that don't block execution.
                </p>
              </div>
              <div className="mt-12 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white/80">USDC Stream</span>
                  <span className="font-mono text-primary">68%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[68%] rounded-full bg-primary shadow-[0_0_12px_rgba(13,139,255,0.8)]" />
                </div>
              </div>
            </div>

            {/* Block 3, 4, 5: Features (Small) */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04]">
              <Shield className="mb-6 h-6 w-6 text-white/40 transition-colors group-hover:text-primary" />
              <h3 className="text-xl font-medium text-white">
                Deterministic Guardrails
              </h3>
              <p className="mt-3 text-base text-white/60">
                Every spend path is explainable before broadcast.
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04]">
              <Activity className="mb-6 h-6 w-6 text-white/40 transition-colors group-hover:text-primary" />
              <h3 className="text-xl font-medium text-white">Operator Telemetry</h3>
              <p className="mt-3 text-base text-white/60">
                Volume, drift, and anomaly signals in real-time.
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04]">
              <Lock className="mb-6 h-6 w-6 text-white/40 transition-colors group-hover:text-primary" />
              <h3 className="text-xl font-medium text-white">Scoped Credentials</h3>
              <p className="mt-3 text-base text-white/60">
                Least-privilege keys with automatic rotation hooks.
              </p>
            </div>
          </div>
        </PageWrapper>
      </FadeInView>

      <FadeInView>
        <PageWrapper>
          <div className="relative overflow-hidden rounded-[3rem] border border-primary/20 bg-primary/5 px-6 py-20 text-center sm:px-16 sm:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(13,139,255,0.15),transparent)]" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-balance text-4xl font-medium tracking-tight text-white sm:text-6xl">
                Ready when your agents are.
              </h2>
              <p className="mt-6 text-lg text-white/60 sm:text-xl">
                Stand up a sandbox org, connect policies, and mirror your production
                topology without moving funds.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <RequestAccessDialog />
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-white/10 bg-white/5 px-8 text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/developers">Developer docs</Link>
                </Button>
              </div>
            </div>
          </div>
        </PageWrapper>
      </FadeInView>
    </div>
  );
}
