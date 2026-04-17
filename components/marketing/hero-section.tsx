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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-48 pb-32">
      {/* Spotlight Radial Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(13,139,255,0.15),rgba(255,255,255,0))] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial={initial}
          animate={animate}
          className="flex max-w-5xl flex-col items-center space-y-12"
        >
          <motion.div variants={fadeUp} className="space-y-8">
            <h1 className="text-balance bg-gradient-to-b from-white to-white/50 bg-clip-text text-7xl font-medium tracking-tighter text-transparent sm:text-8xl lg:text-[8.5rem] lg:leading-[0.85]">
              Autonomous <br className="hidden sm:block" />
              Treasury.
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-xl text-white/50 sm:text-2xl">
              The financial OS for AI agents.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <RequestAccessDialog>
              <Button className="h-14 rounded-full bg-white px-10 text-lg font-medium text-black shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-transform hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]">
                Start building
              </Button>
            </RequestAccessDialog>
            <Button
              variant="outline"
              className="h-14 rounded-full border-white/10 bg-white/5 px-10 text-lg text-white backdrop-blur-md transition-transform hover:-translate-y-1 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href={getConsoleEntryHref()}>
                View demo
                <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Minimalist Dashboard Metrics */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-32 w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050505] shadow-[0_0_120px_-20px_rgba(13,139,255,0.15)]">
            {/* Glass reflection top edge */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Subtle background glow */}
            <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />

            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-8 py-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-white/50">
                  Network Telemetry
                </span>
              </div>
              <div className="hidden items-center gap-4 font-mono text-xs text-white/30 sm:flex">
                <span>SYS.UPTIME: 99.99%</span>
                <span>NODE: EU-WEST-1</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Metric 1 */}
              <div className="relative border-b border-white/5 p-10 md:border-b-0 md:border-r">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/40">Total Volume</p>
                  <span className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-emerald-400">
                    +14.2%
                  </span>
                </div>
                <p className="mt-6 font-mono text-5xl font-medium tracking-tighter text-white sm:text-6xl">
                  {formatUsd(dashboardMetrics.totalBalanceUsd)}
                </p>
                <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-primary/50 to-primary" />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="relative border-b border-white/5 p-10 md:border-b-0 md:border-r">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/40">Policy Compliance</p>
                  <span className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-emerald-400">
                    STABLE
                  </span>
                </div>
                <p className="mt-6 font-mono text-5xl font-medium tracking-tighter text-white sm:text-6xl">
                  {formatNumber(dashboardMetrics.policyCompliancePct, 1)}%
                </p>
                <div className="mt-8 flex h-8 items-end gap-1">
                  {[40, 60, 50, 80, 70, 90, 85, 100, 95, 99].map((h, i) => (
                    <div
                      key={i}
                      className="w-full rounded-t-sm bg-white/10 transition-all hover:bg-primary/50"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Metric 3 */}
              <div className="relative p-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/40">P99 Latency</p>
                  <span className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-primary">
                    OPTIMAL
                  </span>
                </div>
                <p className="mt-6 font-mono text-5xl font-medium tracking-tighter text-white sm:text-6xl">
                  12<span className="text-3xl text-white/40">ms</span>
                </p>
                <div className="mt-8 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs text-white/40">API Gateway</span>
                  <div className="ml-auto font-mono text-xs text-white/60">4ms</div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-xs text-white/40">Policy Engine</span>
                  <div className="ml-auto font-mono text-xs text-white/60">8ms</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
