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

        {/* Premium Software Dashboard UI */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-32 w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#030303] shadow-[0_0_120px_-20px_rgba(13,139,255,0.15)] ring-1 ring-white/5">
            {/* Top Bar (macOS style) */}
            <div className="flex h-12 items-center justify-between border-b border-white/5 bg-white/[0.02] px-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-white/10" />
                <div className="h-3 w-3 rounded-full bg-white/10" />
                <div className="h-3 w-3 rounded-full bg-white/10" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                Aigent Console · Production
              </div>
              <div className="w-12" /> {/* Spacer for symmetry */}
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Main Chart Area (Left 2/3) */}
              <div className="relative flex flex-col border-b border-white/5 p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
                {/* Subtle grid background for the chart area */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:32px_32px] opacity-5" />

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/50">Treasury Volume</p>
                    <p className="mt-2 font-mono text-4xl font-medium tracking-tighter text-white sm:text-5xl">
                      {formatUsd(dashboardMetrics.totalBalanceUsd)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    <ArrowUpRight className="h-3 w-3" />
                    14.2%
                  </div>
                </div>

                {/* SVG Area Chart */}
                <div className="relative z-10 mt-12 flex-1 min-h-[180px] w-full">
                  <svg
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                  >
                    <defs>
                      <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(13, 139, 255, 0.25)" />
                        <stop offset="100%" stopColor="rgba(13, 139, 255, 0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 C20,80 30,65 50,65 C70,65 80,75 100,75 C120,75 130,40 150,40 C170,40 180,55 200,55 C220,55 230,20 250,20 C270,20 280,35 300,35 C320,35 330,10 350,10 C370,10 380,25 400,25 L400,100 L0,100 Z"
                      fill="url(#chart-gradient)"
                    />
                    <path
                      d="M0,80 C20,80 30,65 50,65 C70,65 80,75 100,75 C120,75 130,40 150,40 C170,40 180,55 200,55 C220,55 230,20 250,20 C270,20 280,35 300,35 C320,35 330,10 350,10 C370,10 380,25 400,25"
                      fill="none"
                      stroke="#0d8bff"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>

              {/* Sidebar Metrics (Right 1/3) */}
              <div className="flex flex-col bg-white/[0.01]">
                {/* Compliance */}
                <div className="flex-1 border-b border-white/5 p-8">
                  <p className="text-sm font-medium text-white/50">Policy Compliance</p>
                  <div className="mt-4 flex items-baseline gap-3">
                    <p className="font-mono text-4xl font-medium tracking-tighter text-white">
                      {formatNumber(dashboardMetrics.policyCompliancePct, 1)}%
                    </p>
                    <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40">
                      TARGET 99.0%
                    </span>
                  </div>
                  <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[99.4%] rounded-full bg-primary shadow-[0_0_10px_rgba(13,139,255,0.5)]" />
                  </div>
                </div>

                {/* Risk & Wallets */}
                <div className="flex flex-1 gap-6 p-8">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white/50">Active Wallets</p>
                    <p className="mt-4 font-mono text-3xl font-medium tracking-tighter text-white">
                      {dashboardMetrics.activeWallets}
                    </p>
                  </div>
                  <div className="w-px bg-white/5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white/50">Risk Score</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <p className="font-mono text-3xl font-medium tracking-tighter text-white">
                        {dashboardMetrics.riskScore}
                      </p>
                      <span className="text-sm text-white/30">/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
