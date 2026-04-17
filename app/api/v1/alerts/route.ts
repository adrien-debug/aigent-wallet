import { riskAlerts } from "@/data/alerts";
import { jsonOk } from "@/lib/api/response";

export function GET(request: Request) {
  return jsonOk({ alerts: riskAlerts, count: riskAlerts.length }, { request });
}
