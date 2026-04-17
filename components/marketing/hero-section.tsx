"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4"
                        >
                          <path d="M12 2L2 12l10 10 10-10L12 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Compute Broker</p>
                        <p className="font-mono text-[10px] text-white/40">
                          base: 0xc1d...f6a7
                        </p>
                      </div>
                    </div>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  </div>
                  {/* Agent 2 */}
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4"
                        >
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Market Data Agent
                        </p>
                        <p className="font-mono text-[10px] text-white/40">
                          arbitrum: 0xb3c...e4f5
                        </p>
                      </div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-white/40" />
                  </div>
                  {/* Agent 3 */}
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/40">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4"
                        >
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.5 8.5L14 11m-4 1L4.5 8.5M12 15v6.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/60">
                          Trading Execution
                        </p>
                        <p className="font-mono text-[10px] text-white/30">PAUSED</p>
                      </div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-white/20" />
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
                    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white">
                      <ArrowUpRight className="h-3 w-3 text-primary" />
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
                      Recent Transactions
                    </p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/5 text-white/40">
                          <th className="pb-3 font-medium">Agent</th>
                          <th className="pb-3 font-medium">Counterparty</th>
                          <th className="pb-3 font-medium text-right">Amount</th>
                          <th className="pb-3 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="py-4 font-medium text-white">
                            Compute Broker
                          </td>
                          <td className="py-4 font-mono text-xs text-white/60">
                            CoreWeave Settlement
                          </td>
                          <td className="py-4 text-right font-mono text-white">
                            12,400 USDC
                          </td>
                          <td className="py-4 text-right">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-3 w-3 text-primary"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>{" "}
                              CONFIRMED
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 font-medium text-white/60">
                            Trading Exec
                          </td>
                          <td className="py-4 font-mono text-xs text-white/40">
                            0xUnk…9f01
                          </td>
                          <td className="py-4 text-right font-mono text-white/60">
                            92,000 USDC
                          </td>
                          <td className="py-4 text-right">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[10px] font-medium text-white/40">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-3 w-3"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>{" "}
                              BLOCKED
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 font-medium text-white">Market Data</td>
                          <td className="py-4 font-mono text-xs text-white/60">
                            Chainlink Aggregator
                          </td>
                          <td className="py-4 text-right font-mono text-white">
                            820 ETH
                          </td>
                          <td className="py-4 text-right">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-3 w-3 text-primary"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>{" "}
                              CONFIRMED
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
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4 text-primary animate-pulse"
                  >
                    <path d="M21 12H3m18 0l-4-4m4 4l-4 4" />
                  </svg>
                </div>
                <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-white mb-4">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-4 w-4 text-primary"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Policy Evaluation
                      </span>
                    </div>
                    <pre className="font-mono text-[10px] leading-relaxed text-white/60">
                      <span className="text-white/40">// tx_hash: 0x88aa…3312</span>
                      <br />
                      {`{
  "wallet": "Trading Execution",
  "counterparty": "0xUnk…9f01",
  "amount_usd": 92000.00,
  "eval": [
    {
      "policy": "pol_human_above",
      "threshold": 75000,
      "pass": false,
      "action": "require_approval"
    },
    {
      "policy": "pol_block_unknown",
      "risk_tier": "unknown",
      `}
                      <span className="text-primary font-medium">"pass": false</span>
                      {`,
      "action": "deny"
    }
  ],
  `}
                      <span className="text-primary font-medium">
                        "result": "BLOCKED"
                      </span>
                      {`
}`}
                    </pre>
                  </div>

                  <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-xs font-medium text-white/40 mb-2">
                      Anomaly Score
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="font-mono text-3xl font-medium text-white">
                        94
                      </span>
                      <span className="text-xs text-white/30 mb-1">
                        /100 (CRITICAL)
                      </span>
                    </div>
                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[94%] rounded-full bg-primary shadow-[0_0_10px_rgba(13,139,255,0.5)]" />
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
