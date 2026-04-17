import type { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For early agent deployments validating policy + audit workflows.",
    priceUsd: 499,
    cta: "Start in sandbox",
    features: {
      wallets: "Up to 5 agent wallets",
      policies: "25 active rules",
      auditRetention: "30 days immutable",
      riskEngine: "Baseline scoring",
      api: "100k signed requests / mo",
      support: "Email, 48h SLA",
      customInfra: "Shared tenancy",
    },
  },
  {
    id: "growth",
    name: "Growth",
    description: "Production-grade orchestration for autonomous finance teams.",
    priceUsd: 2499,
    cta: "Book architecture review",
    highlighted: true,
    features: {
      wallets: "Up to 50 wallets + sub-wallets",
      policies: "Unlimited with staging",
      auditRetention: "1 year + export",
      riskEngine: "Custom models + thresholds",
      api: "5M signed requests / mo",
      support: "Dedicated channel, 4h SLA",
      customInfra: "VPC peering optional",
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Global programs with bespoke controls and on-prem options.",
    priceUsd: null,
    cta: "Contact sales",
    features: {
      wallets: "Unlimited, hierarchical treasury",
      policies: "Multi-region policy mesh",
      auditRetention: "7+ years, WORM options",
      riskEngine: "Federated + third-party feeds",
      api: "Custom rate + private relays",
      support: "24/7 + named TAM",
      customInfra: "Dedicated clusters, HSM paths",
    },
  },
];
