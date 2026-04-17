import type { Metadata } from "next";
import { FadeInView } from "@/components/shared/fade-in-view";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { SectionHeader } from "@/components/marketing/section-header";
import { PricingCard } from "@/components/marketing/pricing-card";
import { PageHero } from "@/components/marketing/page-hero";
import { pricingPlans } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Starter, Growth, and Enterprise plans for wallet limits, policies, audit retention, risk engine, and API access.",
  openGraph: {
    images: [{ url: "/heroes/hero-pricing.png", width: 1920, height: 1080 }],
  },
};

export default function PricingPage() {
  return (
    <div className="border-b border-border/60">
      <PageHero src="/heroes/hero-pricing.png" alt="Aigent pricing tier monoliths" />
      <PageWrapper className="py-14 sm:py-18">
        <FadeInView>
          <SectionHeader
            align="center"
            eyebrow="Pricing"
            title="Predictable economics for autonomous finance"
            description="Start in sandbox, graduate to production with the same policy primitives. Enterprise programs include bespoke risk models and dedicated infrastructure."
          />
        </FadeInView>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <FadeInView key={plan.id}>
              <PricingCard plan={plan} />
            </FadeInView>
          ))}
        </div>
      </PageWrapper>
    </div>
  );
}
