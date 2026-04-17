import type { NetworkId, WalletType } from "@/types";

export const API_VERSION = "1.2.0";

export const TX_DEFAULT_LIMIT = 50;
export const TX_MAX_LIMIT = 200;

/** Réponse POST wallets/policies — comportement serverless / mémoire process. */
export const MEMORY_PERSIST_NOTE =
  "Survives warm server instances; cold starts reset the store.";

export const WALLET_TYPES: readonly WalletType[] = [
  "treasury",
  "agent",
  "execution",
  "research",
];

export const NETWORK_IDS: readonly NetworkId[] = [
  "ethereum",
  "arbitrum",
  "base",
  "polygon",
];

export const POLICY_SEVERITY_VALUES = [
  "info",
  "low",
  "medium",
  "high",
  "critical",
] as const;

export const POLICY_STATUS_VALUES = ["enforced", "shadow", "draft"] as const;
