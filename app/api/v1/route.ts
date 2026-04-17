import { getDiscoveryPayload } from "@/lib/api/endpoints";
import { jsonOk } from "@/lib/api/response";

export function GET(request: Request) {
  return jsonOk(getDiscoveryPayload(), { request });
}
