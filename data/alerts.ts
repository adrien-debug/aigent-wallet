import type { RiskAlert } from "@/types";

export const riskAlerts: RiskAlert[] = [
  {
    id: "al_001",
    title: "Velocity spike on outbound USDC",
    severity: "high",
    timestamp: "2026-04-17T08:02:00.000Z",
    wallet: "Compute Broker",
    detail: "3σ above 7d baseline for 15m window.",
  },
  {
    id: "al_002",
    title: "New counterparty first-touch",
    severity: "medium",
    timestamp: "2026-04-17T07:40:00.000Z",
    wallet: "Market Data Agent",
    detail: "Contract not seen in prior 90d interactions.",
  },
  {
    id: "al_003",
    title: "Policy deviation: stable-only",
    severity: "low",
    timestamp: "2026-04-17T06:10:00.000Z",
    wallet: "Treasury Core",
    detail: "Shadow rule would have altered routing on bridge fee path.",
  },
  {
    id: "al_004",
    title: "Budget drift vs forecast",
    severity: "medium",
    timestamp: "2026-04-16T18:22:00.000Z",
    wallet: "Research Ops",
    detail: "Rolling 7d spend +18% vs plan.",
  },
];
