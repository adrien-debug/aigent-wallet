import { API_VERSION } from "@/lib/api/constants";

/** Source unique pour la doc discovery (`GET /api/v1`). */
export const API_ROUTE_CATALOG = [
  { method: "GET" as const, path: "/api/v1", description: "Discovery — liste des routes" },
  { method: "GET" as const, path: "/api/v1/openapi", description: "Contrat OpenAPI 3 (JSON)" },
  { method: "GET" as const, path: "/api/v1/metrics", description: "KPIs + séries graphiques" },
  { method: "GET" as const, path: "/api/v1/wallets", description: "Liste wallets (seed + mémoire)" },
  { method: "POST" as const, path: "/api/v1/wallets", description: "Créer un wallet (mémoire)" },
  { method: "GET" as const, path: "/api/v1/wallets/:id", description: "Détail wallet" },
  {
    method: "GET" as const,
    path: "/api/v1/transactions",
    description: "Transactions (?status, ?q, ?walletId, ?limit, ?offset)",
  },
  { method: "GET" as const, path: "/api/v1/policies", description: "Liste policies (seed + mémoire)" },
  { method: "POST" as const, path: "/api/v1/policies", description: "Créer une policy (mémoire)" },
  { method: "GET" as const, path: "/api/v1/policies/:id", description: "Détail policy" },
  { method: "GET" as const, path: "/api/v1/audit", description: "Événements d’audit" },
  { method: "GET" as const, path: "/api/v1/alerts", description: "Alertes risque" },
  { method: "GET" as const, path: "/api/v1/team", description: "Membres (mock)" },
  { method: "GET" as const, path: "/api/v1/pricing", description: "Plans (mock)" },
  { method: "GET" as const, path: "/api/health", description: "Sonde liveness (sans auth)" },
] as const;

export function getDiscoveryPayload() {
  return {
    name: "aigent-console",
    version: API_VERSION,
    endpoints: API_ROUTE_CATALOG,
  };
}
