import type { NetworkId, PolicyRule, Wallet, WalletType } from "@/types";

function randomHexAddress(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `0x${hex}`;
}

const WALLET_TYPES: WalletType[] = ["treasury", "agent", "execution", "research"];
const NETWORKS: NetworkId[] = ["ethereum", "arbitrum", "base", "polygon"];

export function buildStubWallet(input: {
  name: string;
  type: WalletType;
  network: NetworkId;
  agent: string;
  dailyCapUsd: number;
  policyId?: string;
  policyName?: string;
  parentId?: string | null;
  tags?: string[];
}): Wallet {
  const id = `wal_stub_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
  return {
    id,
    name: input.name.trim(),
    type: input.type,
    network: input.network,
    status: "active",
    balanceUsd: 0,
    policyId: input.policyId?.trim() || "pol_unassigned",
    policyName: input.policyName?.trim() || "No policy attached",
    agent: input.agent.trim(),
    dailyCapUsd: input.dailyCapUsd,
    spentTodayUsd: 0,
    address: randomHexAddress(),
    parentId: input.parentId === undefined ? null : input.parentId,
    tags: Array.isArray(input.tags) ? input.tags.map(String) : [],
  };
}

export function buildStubPolicy(input: {
  name: string;
  description: string;
  condition: string;
  severity: PolicyRule["severity"];
  status?: PolicyRule["status"];
}): PolicyRule {
  const id = `pol_stub_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
  return {
    id,
    name: input.name.trim(),
    description: input.description.trim(),
    status: input.status ?? "draft",
    severity: input.severity,
    walletsAffected: 0,
    condition: input.condition.trim(),
    lastEvaluated: new Date().toISOString(),
    executions24h: 0,
  };
}

export function isWalletType(v: unknown): v is WalletType {
  return typeof v === "string" && (WALLET_TYPES as string[]).includes(v);
}

export function isNetworkId(v: unknown): v is NetworkId {
  return typeof v === "string" && (NETWORKS as string[]).includes(v);
}

export function isPolicySeverity(v: unknown): v is PolicyRule["severity"] {
  return (
    typeof v === "string" &&
    ["info", "low", "medium", "high", "critical"].includes(v)
  );
}

export function isPolicyStatus(v: unknown): v is PolicyRule["status"] {
  return typeof v === "string" && ["enforced", "shadow", "draft"].includes(v);
}
