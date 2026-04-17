import { jsonOk } from "@/lib/api/response";

const ENDPOINTS = [
  { method: "GET", path: "/api/v1", description: "This discovery document" },
  { method: "GET", path: "/api/v1/openapi", description: "OpenAPI 3.0 JSON" },
  { method: "GET", path: "/api/v1/metrics", description: "Dashboard KPIs and chart series" },
  { method: "GET", path: "/api/v1/wallets", description: "List wallets (seed + in-memory)" },
  { method: "POST", path: "/api/v1/wallets", description: "Create wallet (in-memory on warm isolate)" },
  { method: "GET", path: "/api/v1/wallets/:id", description: "Wallet by id" },
  {
    method: "GET",
    path: "/api/v1/transactions",
    description: "Transactions (?status,&q,&walletId,&limit,&offset)",
  },
  { method: "GET", path: "/api/v1/policies", description: "List policies (seed + in-memory)" },
  { method: "POST", path: "/api/v1/policies", description: "Create policy (in-memory)" },
  { method: "GET", path: "/api/v1/policies/:id", description: "Policy by id" },
  { method: "GET", path: "/api/v1/audit", description: "Audit events" },
  { method: "GET", path: "/api/v1/alerts", description: "Risk alerts" },
  { method: "GET", path: "/api/v1/team", description: "Team members (mock)" },
  { method: "GET", path: "/api/v1/pricing", description: "Pricing plans (mock)" },
  { method: "GET", path: "/api/health", description: "Liveness probe (no auth)" },
] as const;

export function GET(request: Request) {
  return jsonOk(
    {
      name: "aigent-console",
      version: "1.1",
      endpoints: ENDPOINTS,
    },
    { request },
  );
}
