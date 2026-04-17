"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Shield,
  Bot,
  Activity,
  CheckCircle2,
  XCircle,
  Terminal,
  Cpu,
  Globe,
} from "lucide-react";
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
          className="mt-32 w-full max-w-[1200px]"
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

            {/* Dashboard Content - 3 Column Layout */}
            <div className="flex flex-col lg:flex-row h-auto lg:h-[600px]">
              {/* Left Sidebar: Agents List */}
              <div className="flex w-full flex-col border-b border-white/5 bg-white/[0.01] lg:w-72 lg:border-b-0 lg:border-r">
                <div className="border-b border-white/5 px-6 py-4">
                  <p className="text-xs font-medium uppercase tracking-widest text-white/40">
                    Active Agents
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {/* Agent 1 */}
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          DeFi Trader Alpha
                        </p>
                        <p className="font-mono text-[10px] text-white/40">
                          0x7a2...4f9c
                        </p>
                      </div>
                    </div>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  </div>
                  {/* Agent 2 */}
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          AWS Provisioner
                        </p>
                        <p className="font-mono text-[10px] text-white/40">us-east-1</p>
                      </div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  {/* Agent 3 */}
                  <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Data Scraper</p>
                        <p className="font-mono text-[10px] text-red-400">
                          POLICY_BREACH
                        </p>
                      </div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                  </div>
                </div>
              </div>

              {/* Main Content: Chart + Transactions */}
              <div className="flex flex-1 flex-col">
                {/* Top Half: Chart */}
                <div className="relative flex flex-col border-b border-white/5 p-8 lg:h-1/2">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:32px_32px] opacity-5" />
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/50">
                        Treasury Volume (24h)
                      </p>
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
                  <div className="relative z-10 mt-8 flex-1 w-full">
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

                {/* Bottom Half: Transactions */}
                <div className="flex flex-col lg:h-1/2">
                  <div className="border-b border-white/5 px-8 py-4">
                    <p className="text-xs font-medium uppercase tracking-widest text-white/40">
                      Recent Intents
                    </p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 px-8">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/5 text-white/40">
                          <th className="pb-3 font-medium">Agent</th>
                          <th className="pb-3 font-medium">Action</th>
                          <th className="pb-3 font-medium text-right">Amount</th>
                          <th className="pb-3 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="py-4 font-medium text-white">DeFi Trader</td>
                          <td className="py-4 font-mono text-xs text-white/60">
                            swap_usdc_eth
                          </td>
                          <td className="py-4 text-right font-mono text-white">
                            -$12,450.00
                          </td>
                          <td className="py-4 text-right">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                              <CheckCircle2 className="h-3 w-3" /> APPROVED
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 font-medium text-white">Data Scraper</td>
                          <td className="py-4 font-mono text-xs text-white/60">
                            pay_proxy_api
                          </td>
                          <td className="py-4 text-right font-mono text-white">
                            -$4,200.00
                          </td>
                          <td className="py-4 text-right">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-400">
                              <XCircle className="h-3 w-3" /> BLOCKED
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 font-medium text-white">
                            AWS Provisioner
                          </td>
                          <td className="py-4 font-mono text-xs text-white/60">
                            topup_billing
                          </td>
                          <td className="py-4 text-right font-mono text-white">
                            -$850.00
                          </td>
                          <td className="py-4 text-right">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                              <CheckCircle2 className="h-3 w-3" /> APPROVED
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Sidebar: Policy Trace */}
              <div className="flex w-full flex-col border-t border-white/5 bg-[#050505] lg:w-80 lg:border-l lg:border-t-0">
                <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-widest text-white/40">
                    Live Trace
                  </p>
                  <Activity className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                    <div className="flex items-center gap-2 text-red-400 mb-4">
                      <Shield className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Policy Violation
                      </span>
                    </div>
                    <pre className="font-mono text-[10px] leading-relaxed text-white/60">
                      <span className="text-white/40">// intent_id: req_9x2a</span>
                      <br />
                      {`{
  "agent": "data_scraper",
  "action": "pay_proxy_api",
  "amount": 4200.00,
  "eval": [
    {
      "rule": "known_vendor",
      "pass": true
    },
    {
      "rule": "daily_limit",
      "val": 4200,
      "max": 1000,
      `}
                      <span className="text-red-400 font-bold">"pass": false</span>
                      {`
    }
  ],
  `}
                      <span className="text-red-400 font-bold">"result": "DENY"</span>
                      {`
}`}
                    </pre>
                  </div>

                  <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-xs font-medium text-white/40 mb-2">
                      Risk Engine
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="font-mono text-3xl font-medium text-red-400">
                        89
                      </span>
                      <span className="text-xs text-white/30 mb-1">/100 (HIGH)</span>
                    </div>
                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[89%] rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
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
