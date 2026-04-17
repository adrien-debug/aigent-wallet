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
import { Terminal, Zap, Shield, Activity, Lock } from "lucide-react";

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
            title="A new substrate for agents"
            description="Human-centric wallets assume discretionary signing. Agents need programmatic limits, counterparty intelligence, and replay-safe execution paths."
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12 lg:gap-8">
            {/* Block 1: White Background, Massive Typography (Col span 7) */}
            <div className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white p-10 transition-transform hover:-translate-y-1 md:col-span-7 lg:p-16">
              <div>
                <h3 className="text-balance text-4xl font-medium tracking-tight text-black sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                  Build to run the future of work
                </h3>
                <p className="mt-6 max-w-md text-lg text-black/60 sm:text-xl">
                  Author policies once, version them like services, and shadow-test
                  against live traffic before enforcement.
                </p>
              </div>
              <div className="mt-16 rounded-2xl border border-black/10 bg-black/5 p-6 font-mono text-sm text-black/60">
                <p className="text-black">policy.evaluate(intent)</p>
                <p className="mt-2">→ simulation.ok</p>
                <p>
                  → risk.score = <span className="font-semibold text-black">18</span>
                </p>
                <p>→ approval.not_required</p>
                <p className="mt-2 font-medium text-black">→ relay.broadcast()</p>
              </div>
            </div>

            {/* Block 2: Black Background, Tall (Col span 5) */}
            <div className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 transition-transform hover:-translate-y-1 md:col-span-5 lg:p-16">
              <div>
                <h3 className="text-balance text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                  The foundation
                </h3>
                <p className="mt-6 text-lg text-white/60 sm:text-xl">
                  Burst-aware smoothing for GPU and data workloads. Machine payments
                  that don't block execution.
                </p>
              </div>
              <div className="mt-16 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white/80">USDC Stream</span>
                  <span className="font-mono text-white">68%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[68%] rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* Block 3, 4, 5: Features (Small, Monochromatic) */}
            <div className="group relative col-span-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 transition-transform hover:-translate-y-1 md:col-span-4">
              <Shield className="mb-8 h-8 w-8 text-white/40 transition-colors group-hover:text-white" />
              <h3 className="text-2xl font-medium text-white">
                Deterministic Guardrails
              </h3>
              <p className="mt-4 text-lg text-white/60">
                Every spend path is explainable before broadcast.
              </p>
            </div>
            <div className="group relative col-span-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 transition-transform hover:-translate-y-1 md:col-span-4">
              <Activity className="mb-8 h-8 w-8 text-white/40 transition-colors group-hover:text-white" />
              <h3 className="text-2xl font-medium text-white">Operator Telemetry</h3>
              <p className="mt-4 text-lg text-white/60">
                Volume, drift, and anomaly signals in real-time.
              </p>
            </div>
            <div className="group relative col-span-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 transition-transform hover:-translate-y-1 md:col-span-4">
              <Lock className="mb-8 h-8 w-8 text-white/40 transition-colors group-hover:text-white" />
              <h3 className="text-2xl font-medium text-white">Scoped Credentials</h3>
              <p className="mt-4 text-lg text-white/60">
                Least-privilege keys with automatic rotation hooks.
              </p>
            </div>
          </div>
        </PageWrapper>
      </FadeInView>

      <FadeInView>
        <PageWrapper>
          <div className="relative overflow-hidden rounded-[3rem] bg-white px-6 py-32 text-center sm:px-16 sm:py-40">
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="text-balance text-6xl font-medium tracking-tighter text-black sm:text-8xl">
                Start building.
              </h2>
              <p className="mt-8 text-xl text-black/60 sm:text-2xl">
                Stand up a sandbox org, connect policies, and mirror your production
                topology in minutes.
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <RequestAccessDialog>
                  <Button className="h-14 rounded-full bg-black px-10 text-lg font-medium text-white transition-transform hover:-translate-y-1 hover:bg-black/90 hover:shadow-2xl">
                    Request access
                  </Button>
                </RequestAccessDialog>
                <Button
                  variant="outline"
                  className="h-14 rounded-full border-black/10 bg-transparent px-10 text-lg text-black transition-transform hover:-translate-y-1 hover:bg-black/5"
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
