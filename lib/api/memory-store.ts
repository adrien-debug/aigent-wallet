/** Store append-only en mémoire process (voir README — serverless cold start). */
import type { PolicyRule, Wallet } from "@/types";
import { wallets as seedWallets } from "@/data/wallets";
import { policies as seedPolicies } from "@/data/policies";

/**
 * In-process append-only store (survives warm isolates; resets on cold start).
 * Merged after seed data from `data/*`.
 */
const createdWallets: Wallet[] = [];
const createdPolicies: PolicyRule[] = [];

export function listWallets(): Wallet[] {
  return [...seedWallets, ...createdWallets];
}

export function listPolicies(): PolicyRule[] {
  return [...seedPolicies, ...createdPolicies];
}

export function getWalletById(id: string): Wallet | undefined {
  return listWallets().find((w) => w.id === id);
}

export function getPolicyById(id: string): PolicyRule | undefined {
  return listPolicies().find((p) => p.id === id);
}

export function persistWallet(wallet: Wallet) {
  createdWallets.push(wallet);
}

export function persistPolicy(policy: PolicyRule) {
  createdPolicies.push(policy);
}
