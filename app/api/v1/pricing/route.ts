import { pricingPlans } from "@/data/pricing";
import { jsonOk } from "@/lib/api/response";

export function GET() {
  return jsonOk({ plans: pricingPlans, count: pricingPlans.length });
}
