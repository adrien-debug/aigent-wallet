import { pricingPlans } from "@/data/pricing";
import { jsonOk } from "@/lib/api/response";

export function GET(request: Request) {
  return jsonOk({ plans: pricingPlans, count: pricingPlans.length }, { request });
}
