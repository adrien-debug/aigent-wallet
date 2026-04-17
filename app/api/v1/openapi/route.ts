import { openApiDocument } from "@/lib/api/openapi-spec";
import { jsonOk } from "@/lib/api/response";

export function GET(request: Request) {
  return jsonOk(openApiDocument, { request });
}
