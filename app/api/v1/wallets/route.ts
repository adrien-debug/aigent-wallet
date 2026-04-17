import { listWallets, persistWallet } from "@/lib/api/memory-store";
import { readJson } from "@/lib/api/read-json";
import { jsonErr, jsonOk } from "@/lib/api/response";
import {
  buildStubWallet,
  isNetworkId,
  isWalletType,
} from "@/lib/api/stubs";

export function GET(request: Request) {
  const wallets = listWallets();
  return jsonOk({ wallets, count: wallets.length }, { request });
}

type CreateWalletBody = {
  name?: unknown;
  type?: unknown;
  network?: unknown;
  agent?: unknown;
  dailyCapUsd?: unknown;
  policyId?: unknown;
  policyName?: unknown;
  parentId?: unknown;
  tags?: unknown;
};

export async function POST(request: Request) {
  const parsed = await readJson<CreateWalletBody>(request);
  if (!parsed.ok) {
    return jsonErr(400, "invalid_body", parsed.message, undefined, request);
  }
  const b = parsed.data;
  if (typeof b.name !== "string" || !b.name.trim()) {
    return jsonErr(400, "validation_error", "Field `name` is required.", {
      field: "name",
    }, request);
  }
  if (!isWalletType(b.type)) {
    return jsonErr(400, "validation_error", "Invalid `type`.", { field: "type" }, request);
  }
  if (!isNetworkId(b.network)) {
    return jsonErr(400, "validation_error", "Invalid `network`.", {
      field: "network",
    }, request);
  }
  if (typeof b.agent !== "string" || !b.agent.trim()) {
    return jsonErr(400, "validation_error", "Field `agent` is required.", {
      field: "agent",
    }, request);
  }
  if (typeof b.dailyCapUsd !== "number" || !Number.isFinite(b.dailyCapUsd)) {
    return jsonErr(400, "validation_error", "`dailyCapUsd` must be a number.", {
      field: "dailyCapUsd",
    }, request);
  }
  if (b.dailyCapUsd < 0) {
    return jsonErr(400, "validation_error", "`dailyCapUsd` must be >= 0.", {
      field: "dailyCapUsd",
    }, request);
  }

  const wallet = buildStubWallet({
    name: b.name,
    type: b.type,
    network: b.network,
    agent: b.agent,
    dailyCapUsd: b.dailyCapUsd,
    policyId: typeof b.policyId === "string" ? b.policyId : undefined,
    policyName: typeof b.policyName === "string" ? b.policyName : undefined,
    parentId:
      b.parentId === null
        ? null
        : typeof b.parentId === "string"
          ? b.parentId
          : undefined,
    tags: Array.isArray(b.tags) ? b.tags : undefined,
  });

  persistWallet(wallet);

  console.info(
    "[api]",
    JSON.stringify({ event: "wallet_created", walletId: wallet.id }),
  );

  return jsonOk(
    {
      wallet,
      persisted: "memory",
      note: "Survives warm server instances; cold starts reset the store.",
    },
    { status: 201, request },
  );
}
