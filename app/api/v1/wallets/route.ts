import { MEMORY_PERSIST_NOTE } from "@/lib/api/constants";
import { apiLogInfo } from "@/lib/api/log";
import { listWallets, persistWallet } from "@/lib/api/memory-store";
import { readJson } from "@/lib/api/read-json";
import { jsonErr, jsonOk } from "@/lib/api/response";
import {
  buildStubWallet,
  isNetworkId,
  isWalletType,
} from "@/lib/api/stubs";
import {
  reqDiscriminant,
  reqFiniteNumber,
  reqTrimmedString,
} from "@/lib/api/validate";

export function GET(request: Request) {
  const wallets = listWallets();
  return jsonOk({ wallets, count: wallets.length }, { request });
}

type CreateWalletBody = Record<string, unknown>;

export async function POST(request: Request) {
  const parsed = await readJson<CreateWalletBody>(request);
  if (!parsed.ok) {
    return jsonErr(400, "invalid_body", parsed.message, undefined, request);
  }
  const b = parsed.data;

  const name = reqTrimmedString(b, "name", request);
  if (!name.ok) return name.response;

  const type = reqDiscriminant(b, "type", request, isWalletType);
  if (!type.ok) return type.response;

  const network = reqDiscriminant(b, "network", request, isNetworkId);
  if (!network.ok) return network.response;

  const agent = reqTrimmedString(b, "agent", request);
  if (!agent.ok) return agent.response;

  const dailyCapUsd = reqFiniteNumber(b, "dailyCapUsd", request, 0);
  if (!dailyCapUsd.ok) return dailyCapUsd.response;

  const policyId =
    typeof b.policyId === "string" ? b.policyId : undefined;
  const policyName =
    typeof b.policyName === "string" ? b.policyName : undefined;
  const parentId =
    b.parentId === null
      ? null
      : typeof b.parentId === "string"
        ? b.parentId
        : undefined;
  const tags = Array.isArray(b.tags) ? b.tags : undefined;

  const wallet = buildStubWallet({
    name: name.value,
    type: type.value,
    network: network.value,
    agent: agent.value,
    dailyCapUsd: dailyCapUsd.value,
    policyId,
    policyName,
    parentId,
    tags,
  });

  persistWallet(wallet);
  apiLogInfo("wallet_created", { walletId: wallet.id });

  return jsonOk(
    {
      wallet,
      persisted: "memory",
      note: MEMORY_PERSIST_NOTE,
    },
    { status: 201, request },
  );
}
