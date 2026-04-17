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
              The financial operating system built for AI agents.
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

        {/* Minimalist 3D Dashboard Metrics */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, rotateX: 15 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-32 w-full max-w-4xl [perspective:1000px]"
        >
          <div className="relative rounded-[2.5rem] border border-white/10 bg-black/40 p-2 shadow-[0_0_100px_-20px_rgba(13,139,255,0.15)] backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent opacity-50" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 px-8 py-12 sm:px-16 sm:py-16">
              <div className="grid grid-cols-1 gap-12 divide-y divide-white/10 sm:grid-cols-3 sm:gap-6 sm:divide-x sm:divide-y-0">
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium uppercase tracking-widest text-white/40">
                    Volume
                  </p>
                  <p className="mt-4 font-mono text-5xl font-medium tracking-tighter text-white">
                    {formatUsd(dashboardMetrics.totalBalanceUsd)}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium uppercase tracking-widest text-white/40">
                    Compliance
                  </p>
                  <p className="mt-4 font-mono text-5xl font-medium tracking-tighter text-white">
                    {formatNumber(dashboardMetrics.policyCompliancePct, 1)}%
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium uppercase tracking-widest text-white/40">
                    Latency
                  </p>
                  <p className="mt-4 font-mono text-5xl font-medium tracking-tighter text-white">
                    12ms
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
