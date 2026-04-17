import { policies } from "@/data/policies";
import { jsonOk } from "@/lib/api/response";

export function GET() {
  return jsonOk({ policies, count: policies.length });
}
