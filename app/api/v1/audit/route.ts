import { auditEvents } from "@/data/audit";
import { jsonOk } from "@/lib/api/response";

export function GET(request: Request) {
  return jsonOk({ events: auditEvents, count: auditEvents.length }, { request });
}
