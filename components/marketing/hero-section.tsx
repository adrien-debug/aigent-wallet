"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Shield } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RequestAccessDialog } from "@/components/marketing/request-access-dialog";
import { formatNumber, formatUsd } from "@/lib/utils";
import { dashboardMetrics } from "@/data/metrics";
import { getConsoleEntryHref } from "@/lib/supabase/env";

export function HeroSection() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : "hidden";
  const animate = reduce ? undefined : "show";
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Background image only — no full-screen tint overlays (they crushed contrast). */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/heroes/hero-home.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.28]"
          priority
          quality={85}
        />
      </div>
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <motion.div
          variants={staggerContainer}
          initial={initial}
          animate={animate}
          className="space-y-8"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="muted" className="border-border/80">
              <Shield className="mr-1 h-3 w-3" aria-hidden />
              Policy-native · Simulation-first
            </Badge>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.35rem] lg:leading-[1.05]">
              Financial OS for AI Agents
            </h1>
            <p className="max-w-xl text-pretty text-base text-foreground/75 sm:text-lg">
              Aigent is programmable treasury for autonomous systems: sub-wallets,
              machine payments, policy enforcement, and an audit trail your security
              team can actually trust.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <RequestAccessDialog />
            <Button variant="outline" asChild>
              <Link href={getConsoleEntryHref()}>
                View demo
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted-foreground"
          >
            {["Agent Commerce", "AI Ops", "Autonomous Finance", "Machine Payments"].map(
              (label) => (
                <span key={label} className="font-medium tracking-wide">
                  {label}
                </span>
              ),
            )}
          </motion.div>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <Card className="relative overflow-hidden border-border/80 bg-gradient-to-b from-card to-background p-1 shadow-card">
            <div className="rounded-xl border border-border/60 bg-surface/80 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Organization</p>
                  <p className="text-sm font-medium">Aigent · Production</p>
                </div>
                <Badge variant="success" className="text-[11px]">
                  Live
                </Badge>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/70 bg-background/40 p-3">
                  <p className="text-[11px] text-muted-foreground">Total balance</p>
                  <p className="mt-1 font-mono text-lg font-semibold">
                    {formatUsd(dashboardMetrics.totalBalanceUsd)}
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/40 p-3">
                  <p className="text-[11px] text-muted-foreground">Policy compliance</p>
                  <p className="mt-1 font-mono text-lg font-semibold">
                    {formatNumber(dashboardMetrics.policyCompliancePct, 1)}%
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/40 p-3">
                  <p className="text-[11px] text-muted-foreground">Active wallets</p>
                  <p className="mt-1 font-mono text-lg font-semibold">
                    {dashboardMetrics.activeWallets}
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/40 p-3">
                  <p className="text-[11px] text-muted-foreground">Risk score</p>
                  <p className="mt-1 font-mono text-lg font-semibold">
                    {dashboardMetrics.riskScore}
                    <span className="text-xs font-normal text-muted-foreground">
                      {" "}
                      /100
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-dashed border-border/80 bg-muted/10 px-3 py-2 text-[11px] text-muted-foreground">
                Mock console · approvals, simulations, and audit events stream here in
                production.
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
