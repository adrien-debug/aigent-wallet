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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Spotlight Radial Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(13,139,255,0.25),rgba(255,255,255,0))] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial={initial}
          animate={animate}
          className="flex max-w-3xl flex-col items-center space-y-8"
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="rounded-full border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white backdrop-blur-md"
            >
              <Shield className="mr-2 h-4 w-4 text-primary" aria-hidden />
              Policy-native · Simulation-first
            </Badge>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-6">
            <h1 className="text-balance bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:text-7xl lg:text-[5rem] lg:leading-[1.1]">
              Financial OS for <br className="hidden sm:block" />
              Autonomous Agents
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-white/60 sm:text-xl">
              Aigent is programmable treasury for autonomous systems: sub-wallets,
              machine payments, policy enforcement, and an audit trail your security
              team can actually trust.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <RequestAccessDialog />
            <Button
              variant="outline"
              className="h-12 rounded-full border-white/10 bg-white/5 px-8 text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
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
          className="mt-20 w-full max-w-5xl [perspective:1000px]"
        >
          <div className="relative rounded-2xl border border-white/10 bg-black/40 p-2 shadow-[0_0_80px_-20px_rgba(13,139,255,0.3)] backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-50" />
            <div className="relative rounded-xl border border-white/10 bg-black/60 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                    Organization
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Aigent · Production
                  </p>
                </div>
                <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  Live
                </Badge>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs font-medium text-white/40">Total balance</p>
                  <p className="mt-2 font-mono text-2xl font-bold text-white">
                    {formatUsd(dashboardMetrics.totalBalanceUsd)}
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs font-medium text-white/40">Policy compliance</p>
                  <p className="mt-2 font-mono text-2xl font-bold text-white">
                    {formatNumber(dashboardMetrics.policyCompliancePct, 1)}%
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs font-medium text-white/40">Active wallets</p>
                  <p className="mt-2 font-mono text-2xl font-bold text-white">
                    {dashboardMetrics.activeWallets}
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs font-medium text-white/40">Risk score</p>
                  <p className="mt-2 font-mono text-2xl font-bold text-white">
                    {dashboardMetrics.riskScore}
                    <span className="text-sm font-normal text-white/40"> /100</span>
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] py-4 text-xs text-white/40">
                Mock console · approvals, simulations, and audit events stream here in
                production.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
