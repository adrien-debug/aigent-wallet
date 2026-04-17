import { policies } from "@/data/policies";
import { jsonErr, jsonOk } from "@/lib/api/response";

export function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (!id?.trim()) {
    return jsonErr(400, "invalid_id", "Policy id is required.");
  }
  const policy = policies.find((p) => p.id === id);
  if (!policy) {
    return jsonErr(404, "policy_not_found", "Policy not found.", {
      policyId: id,
    });
  }
  return jsonOk({ policy });
}
