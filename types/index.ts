export type NetworkId = "ethereum" | "arbitrum" | "base" | "polygon";

export type WalletStatus = "active" | "paused" | "frozen";

export type WalletType = "treasury" | "agent" | "execution" | "research";

export interface Wallet {
  id: string;
  name: string;
  type: WalletType;
  network: NetworkId;
  status: WalletStatus;
  balanceUsd: number;
  policyId: string;
  policyName: string;
  agent: string;
  dailyCapUsd: number;
  spentTodayUsd: number;
  address: string;
  parentId: string | null;
  tags: string[];
}

export type TxStatus = "confirmed" | "pending" | "failed" | "blocked";

export type TxCategory = "treasury" | "m2m" | "compute" | "data" | "defi" | "internal";

export interface Transaction {
  id: string;
  hash: string;
  timestamp: string;
  walletId: string;
  walletName: string;
  counterparty: string;
  amount: number;
  token: string;
  network: NetworkId;
  category: TxCategory;
  status: TxStatus;
  riskFlag: "none" | "low" | "medium" | "high";
}

export type PolicySeverity = "info" | "low" | "medium" | "high" | "critical";

export type PolicyStatus = "enforced" | "shadow" | "draft";

export interface PolicyRule {
  id: string;
  name: string;
  description: string;
  status: PolicyStatus;
  severity: PolicySeverity;
  walletsAffected: number;
  condition: string;
  lastEvaluated: string;
  executions24h: number;
}

export type AuditResult = "allow" | "deny" | "review" | "alert";

export interface AuditEvent {
  id: string;
  actor: string;
  wallet: string;
  eventType: string;
  result: AuditResult;
  timestamp: string;
  traceId: string;
}

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface RiskAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  timestamp: string;
  wallet: string;
  detail: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited";
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceUsd: number | null;
  cta: string;
  highlighted?: boolean;
  features: {
    wallets: string;
    policies: string;
    auditRetention: string;
    riskEngine: string;
    api: string;
    support: string;
    customInfra: string;
  };
}

export interface DashboardMetrics {
  totalBalanceUsd: number;
  activeWallets: number;
  monthlyVolumeUsd: number;
  policyCompliancePct: number;
  riskScore: number;
  pendingApprovals: number;
}

export interface ChartPoint {
  label: string;
  volume: number;
  count: number;
}

export interface WalletSpend {
  walletId: string;
  walletName: string;
  spendUsd: number;
}

export interface DeveloperSnippet {
  id: string;
  title: string;
  language: "ts" | "bash";
  code: string;
}
