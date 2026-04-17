import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero-section";
import { LandingSections, SocialProof } from "@/components/marketing/landing-sections";

export const metadata: Metadata = {
  title: "Financial OS for AI Agents",
  description:
    "Programmable treasury for autonomous systems: policies, machine payments, audit, and risk controls.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <LandingSections />
    </>
  );
}
