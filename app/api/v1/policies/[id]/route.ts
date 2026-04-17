import { getPolicyById } from "@/lib/api/memory-store";
import { jsonErr, jsonOk } from "@/lib/api/response";

export function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!id?.trim()) {
    return jsonErr(400, "invalid_id", "Policy id is required.", undefined, request);
  }
  const policy = getPolicyById(id);
  if (!policy) {
    return jsonErr(
      404,
      "policy_not_found",
      "Policy not found.",
      {
        policyId: id,
      },
      request,
    );
  }
  return jsonOk({ policy }, { request });
}
