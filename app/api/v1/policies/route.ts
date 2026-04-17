import { listPolicies, persistPolicy } from "@/lib/api/memory-store";
import { readJson } from "@/lib/api/read-json";
import { jsonErr, jsonOk } from "@/lib/api/response";
import {
  buildStubPolicy,
  isPolicySeverity,
  isPolicyStatus,
} from "@/lib/api/stubs";

export function GET(request: Request) {
  const policies = listPolicies();
  return jsonOk({ policies, count: policies.length }, { request });
}

type CreatePolicyBody = {
  name?: unknown;
  description?: unknown;
  condition?: unknown;
  severity?: unknown;
  status?: unknown;
};

export async function POST(request: Request) {
  const parsed = await readJson<CreatePolicyBody>(request);
  if (!parsed.ok) {
    return jsonErr(400, "invalid_body", parsed.message, undefined, request);
  }
  const b = parsed.data;
  if (typeof b.name !== "string" || !b.name.trim()) {
    return jsonErr(400, "validation_error", "Field `name` is required.", {
      field: "name",
    }, request);
  }
  if (typeof b.description !== "string" || !b.description.trim()) {
    return jsonErr(400, "validation_error", "Field `description` is required.", {
      field: "description",
    }, request);
  }
  if (typeof b.condition !== "string" || !b.condition.trim()) {
    return jsonErr(400, "validation_error", "Field `condition` is required.", {
      field: "condition",
    }, request);
  }
  if (!isPolicySeverity(b.severity)) {
    return jsonErr(400, "validation_error", "Invalid `severity`.", {
      field: "severity",
    }, request);
  }
  if (b.status !== undefined && !isPolicyStatus(b.status)) {
    return jsonErr(400, "validation_error", "Invalid `status`.", { field: "status" }, request);
  }

  const policy = buildStubPolicy({
    name: b.name,
    description: b.description,
    condition: b.condition,
    severity: b.severity,
    status: b.status !== undefined ? b.status : undefined,
  });

  persistPolicy(policy);

  console.info(
    "[api]",
    JSON.stringify({ event: "policy_created", policyId: policy.id }),
  );

  return jsonOk(
    {
      policy,
      persisted: "memory",
      note: "Survives warm server instances; cold starts reset the store.",
    },
    { status: 201, request },
  );
}
