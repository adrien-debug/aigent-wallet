import { riskAlerts } from "@/data/alerts";
import { jsonOk } from "@/lib/api/response";

export function GET() {
  return jsonOk({ alerts: riskAlerts, count: riskAlerts.length });
}
