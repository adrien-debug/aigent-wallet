import { MEMORY_PERSIST_NOTE } from "@/lib/api/constants";
import { apiLogInfo } from "@/lib/api/log";
import { listPolicies, persistPolicy } from "@/lib/api/memory-store";
import { readJson } from "@/lib/api/read-json";
import { jsonErr, jsonOk } from "@/lib/api/response";
import {
  buildStubPolicy,
  isPolicySeverity,
  isPolicyStatus,
} from "@/lib/api/stubs";
import {
  optDiscriminant,
  reqDiscriminant,
  reqTrimmedString,
} from "@/lib/api/validate";

export function GET(request: Request) {
  const policies = listPolicies();
  return jsonOk({ policies, count: policies.length }, { request });
}

type CreatePolicyBody = Record<string, unknown>;

export async function POST(request: Request) {
  const parsed = await readJson<CreatePolicyBody>(request);
  if (!parsed.ok) {
    return jsonErr(400, "invalid_body", parsed.message, undefined, request);
  }
  const b = parsed.data;

  const name = reqTrimmedString(b, "name", request);
  if (!name.ok) return name.response;

  const description = reqTrimmedString(b, "description", request);
  if (!description.ok) return description.response;

  const condition = reqTrimmedString(b, "condition", request);
  if (!condition.ok) return condition.response;

  const severity = reqDiscriminant(b, "severity", request, isPolicySeverity);
  if (!severity.ok) return severity.response;

  const status = optDiscriminant(b, "status", request, isPolicyStatus);
  if (!status.ok) return status.response;

  const policy = buildStubPolicy({
    name: name.value,
    description: description.value,
    condition: condition.value,
    severity: severity.value,
    status: status.value,
  });

  persistPolicy(policy);
  apiLogInfo("policy_created", { policyId: policy.id });

  return jsonOk(
    {
      policy,
      persisted: "memory",
      note: MEMORY_PERSIST_NOTE,
    },
    { status: 201, request },
  );
}
