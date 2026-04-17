import { jsonOk } from "@/lib/api/response";

const ENDPOINTS = [
  { method: "GET", path: "/api/v1/metrics", description: "Dashboard KPIs and chart series" },
  { method: "GET", path: "/api/v1/wallets", description: "List wallets" },
  { method: "GET", path: "/api/v1/wallets/:id", description: "Wallet by id" },
  { method: "GET", path: "/api/v1/transactions", description: "Transactions (?status,&q,&walletId)" },
  { method: "GET", path: "/api/v1/policies", description: "List policies" },
  { method: "GET", path: "/api/v1/policies/:id", description: "Policy by id" },
  { method: "GET", path: "/api/v1/audit", description: "Audit events" },
  { method: "GET", path: "/api/v1/alerts", description: "Risk alerts" },
  { method: "GET", path: "/api/v1/team", description: "Team members (mock)" },
  { method: "GET", path: "/api/v1/pricing", description: "Pricing plans (mock)" },
  { method: "GET", path: "/api/health", description: "Liveness probe" },
] as const;

export function GET() {
  return jsonOk({
    name: "aigent-console",
    version: 1,
    endpoints: ENDPOINTS,
  });
}
