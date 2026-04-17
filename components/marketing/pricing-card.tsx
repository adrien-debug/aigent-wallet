import { Check } from "lucide-react";
import Link from "next/link";
import type { PricingPlan } from "@/types";
import { formatUsd } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const entries = Object.entries(plan.features) as [
    keyof PricingPlan["features"],
    string,
  ][];
  const labels: Record<keyof PricingPlan["features"], string> = {
    wallets: "Wallets",
    policies: "Policies",
    auditRetention: "Audit retention",
    riskEngine: "Risk engine",
    api: "API access",
    support: "Support",
    customInfra: "Infrastructure",
  };
  return (
    <Card
      className={cn(
        "flex flex-col border-border/80 bg-card/80",
        plan.highlighted &&
          "border-primary/40 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]",
      )}
    >
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">{plan.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
          </div>
          {plan.highlighted ? (
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
              Most common
            </span>
          ) : null}
        </div>
        <div className="pt-2">
          {plan.priceUsd == null ? (
            <p className="text-3xl font-semibold tracking-tight">Custom</p>
          ) : (
            <p className="text-3xl font-semibold tracking-tight">
              {formatUsd(plan.priceUsd)}
              <span className="text-base font-normal text-muted-foreground"> / mo</span>
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 pb-6">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-medium">{labels[key]}</p>
              <p className="text-muted-foreground">{value}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={plan.highlighted ? "default" : "outline"}
          asChild
        >
          <Link href="/developers">{plan.cta}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
