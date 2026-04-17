import type {
  ChartPoint,
  DashboardMetrics,
  WalletSpend,
} from "@/types";

export const dashboardMetrics: DashboardMetrics = {
  totalBalanceUsd: 5_142_300,
  activeWallets: 4,
  monthlyVolumeUsd: 42_800_000,
  policyCompliancePct: 99.4,
  riskScore: 22,
  pendingApprovals: 3,
};

export const volumeSeries: ChartPoint[] = [
  { label: "Mon", volume: 3.2e6, count: 842 },
  { label: "Tue", volume: 4.1e6, count: 901 },
  { label: "Wed", volume: 3.8e6, count: 876 },
  { label: "Thu", volume: 5.4e6, count: 1024 },
  { label: "Fri", volume: 6.1e6, count: 1102 },
  { label: "Sat", volume: 2.9e6, count: 640 },
  { label: "Sun", volume: 2.4e6, count: 512 },
];

export const spendByWallet: WalletSpend[] = [
  { walletId: "wal_treasury_core", walletName: "Treasury Core", spendUsd: 18_200_000 },
  { walletId: "wal_compute_broker", walletName: "Compute Broker", spendUsd: 9_400_000 },
  { walletId: "wal_market_data", walletName: "Market Data Agent", spendUsd: 6_100_000 },
  { walletId: "wal_research_ops", walletName: "Research Ops", spendUsd: 2_800_000 },
  { walletId: "wal_trading_exec", walletName: "Trading Execution", spendUsd: 1_200_000 },
];

export const riskTrend: ChartPoint[] = [
  { label: "W1", volume: 28, count: 12 },
  { label: "W2", volume: 31, count: 15 },
  { label: "W3", volume: 24, count: 9 },
  { label: "W4", volume: 22, count: 8 },
];
