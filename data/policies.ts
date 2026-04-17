import type { PolicyRule } from "@/types";

export const policies: PolicyRule[] = [
  {
    id: "pol_daily_cap",
    name: "Daily spend cap",
    description:
      "Hard ceiling on 24h net outflows per wallet, rolling window with burst smoothing.",
    status: "enforced",
    severity: "medium",
    walletsAffected: 4,
    condition: "sum(outflow, 24h) > cap → deny + alert",
    lastEvaluated: "2026-04-17T08:14:02.000Z",
    executions24h: 1842,
  },
  {
    id: "pol_whitelist",
    name: "Whitelist contracts only",
    description:
      "Agents may only interact with protocol addresses on the approved registry.",
    status: "enforced",
    severity: "high",
    walletsAffected: 2,
    condition: "to ∉ registry → deny",
    lastEvaluated: "2026-04-17T08:13:58.000Z",
    executions24h: 6201,
  },
  {
    id: "pol_stable_only",
    name: "Stablecoin-only outbound",
    description:
      "Treasury outbound transfers restricted to USDC/USDT on allowlisted bridges.",
    status: "enforced",
    severity: "high",
    walletsAffected: 1,
    condition: "asset ∉ {USDC, USDT} → deny",
    lastEvaluated: "2026-04-17T08:13:55.000Z",
    executions24h: 412,
  },
  {
    id: "pol_human_above",
    name: "Human approval above threshold",
    description:
      "Single-tx notional above policy threshold routes to quorum approval workflow.",
    status: "enforced",
    severity: "critical",
    walletsAffected: 1,
    condition: "amount > $75k → approval_required",
    lastEvaluated: "2026-04-17T08:12:11.000Z",
    executions24h: 88,
  },
  {
    id: "pol_block_unknown",
    name: "Block unknown counterparties",
    description:
      "Any counterparty without a verified risk profile is blocked pending review.",
    status: "enforced",
    severity: "medium",
    walletsAffected: 1,
    condition: "counterparty.risk_tier = unknown → deny",
    lastEvaluated: "2026-04-17T08:11:40.000Z",
    executions24h: 1204,
  },
  {
    id: "pol_freeze_anomaly",
    name: "Freeze on anomaly score > 80",
    description:
      "Automatic wallet freeze when composite anomaly model exceeds threshold.",
    status: "shadow",
    severity: "critical",
    walletsAffected: 5,
    condition: "anomaly_score > 80 → freeze + page",
    lastEvaluated: "2026-04-17T08:10:02.000Z",
    executions24h: 0,
  },
];
