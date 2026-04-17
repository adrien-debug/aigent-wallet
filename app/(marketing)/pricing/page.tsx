import { FadeInView } from "@/components/shared/fade-in-view";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { SectionHeader } from "@/components/marketing/section-header";
import { PricingCard } from "@/components/marketing/pricing-card";
import { pricingPlans } from "@/data/pricing";

export default function PricingPage() {
  return (
    <div className="border-b border-border/60 py-16 sm:py-20">
      <PageWrapper>
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
