import { policies } from "@/data/policies";
import { jsonErr, jsonOk } from "@/lib/api/response";
import { readJson } from "@/lib/api/read-json";
import {
  buildStubPolicy,
  isPolicySeverity,
  isPolicyStatus,
} from "@/lib/api/stubs";

export function GET() {
  return jsonOk({ policies, count: policies.length });
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
    return jsonErr(400, "invalid_body", parsed.message);
  }
  const b = parsed.data;
  if (typeof b.name !== "string" || !b.name.trim()) {
    return jsonErr(400, "validation_error", "Field `name` is required.", {
      field: "name",
    });
  }
  if (typeof b.description !== "string" || !b.description.trim()) {
    return jsonErr(400, "validation_error", "Field `description` is required.", {
      field: "description",
    });
  }
  if (typeof b.condition !== "string" || !b.condition.trim()) {
    return jsonErr(400, "validation_error", "Field `condition` is required.", {
      field: "condition",
    });
  }
  if (!isPolicySeverity(b.severity)) {
    return jsonErr(400, "validation_error", "Invalid `severity`.", {
      field: "severity",
    });
  }
  if (b.status !== undefined && !isPolicyStatus(b.status)) {
    return jsonErr(400, "validation_error", "Invalid `status`.", { field: "status" });
  }

  const policy = buildStubPolicy({
    name: b.name,
    description: b.description,
    condition: b.condition,
    severity: b.severity,
    status: b.status !== undefined ? b.status : undefined,
  });

  console.info(
    "[api]",
    JSON.stringify({ event: "policy_stub_created", policyId: policy.id }),
  );

  return jsonOk(
    {
      policy,
      stub: true,
      note: "Not persisted; wire to storage to append to GET /api/v1/policies.",
    },
    { status: 201 },
  );
}
