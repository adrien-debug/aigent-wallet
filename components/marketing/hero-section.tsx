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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-40 pb-24">
      {/* Spotlight Radial Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(13,139,255,0.2),rgba(255,255,255,0))] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial={initial}
          animate={animate}
          className="flex max-w-4xl flex-col items-center space-y-10"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <h1 className="text-balance bg-gradient-to-b from-white to-white/60 bg-clip-text text-6xl font-medium tracking-tighter text-transparent sm:text-8xl lg:text-[6.5rem] lg:leading-[0.95]">
              Autonomous <br className="hidden sm:block" />
              Treasury
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-white/50 sm:text-xl">
              Programmable wallets, machine payments, and policy enforcement. The
              financial operating system built for AI agents.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <RequestAccessDialog>
              <Button className="h-12 rounded-full px-8 text-base font-medium shadow-[0_0_40px_-10px_rgba(13,139,255,0.5)] transition-shadow hover:shadow-[0_0_60px_-15px_rgba(13,139,255,0.7)]">
                Request access
              </Button>
            </RequestAccessDialog>
            <Button
              variant="outline"
              className="h-12 rounded-full border-white/10 bg-white/5 px-8 text-base text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href={getConsoleEntryHref()}>
                View demo
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* 3D Floating Dashboard Card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, rotateX: 15 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-24 w-full max-w-5xl [perspective:1000px]"
        >
          <div className="relative rounded-3xl border border-white/10 bg-black/40 p-2 shadow-[0_0_100px_-20px_rgba(13,139,255,0.2)] backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-50" />
            <div className="relative rounded-2xl border border-white/10 bg-black/60 p-8 sm:p-10">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                    Organization
                  </p>
                  <p className="mt-1 text-base font-medium text-white">
                    Aigent · Production
                  </p>
                </div>
                <Badge className="border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400">
                  Live
                </Badge>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                  <p className="text-sm font-medium text-white/40">Total balance</p>
                  <p className="mt-3 font-mono text-3xl font-medium text-white">
                    {formatUsd(dashboardMetrics.totalBalanceUsd)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                  <p className="text-sm font-medium text-white/40">Policy compliance</p>
                  <p className="mt-3 font-mono text-3xl font-medium text-white">
                    {formatNumber(dashboardMetrics.policyCompliancePct, 1)}%
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                  <p className="text-sm font-medium text-white/40">Active wallets</p>
                  <p className="mt-3 font-mono text-3xl font-medium text-white">
                    {dashboardMetrics.activeWallets}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                  <p className="text-sm font-medium text-white/40">Risk score</p>
                  <p className="mt-3 font-mono text-3xl font-medium text-white">
                    {dashboardMetrics.riskScore}
                    <span className="text-base font-normal text-white/40"> /100</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
