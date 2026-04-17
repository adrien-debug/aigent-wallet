import { API_VERSION } from "@/lib/api/constants";

/** OpenAPI 3.0 — contract for `/api/v1` (maintenu à la main, version alignée sur `API_VERSION`). */
export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Aigent Console API",
    version: API_VERSION,
    description:
      "Mock control plane for agent treasuries. Set AIGENT_API_KEY and send Authorization: Bearer.",
  },
  servers: [{ url: "/api/v1", description: "Same host (append to deployment origin)" }],
  paths: {
    "/": {
      get: {
        summary: "List endpoints",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Discovery payload" } },
      },
    },
    "/openapi": {
      get: {
        summary: "OpenAPI document",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "This specification (JSON)" } },
      },
    },
    "/metrics": {
      get: {
        summary: "Dashboard metrics and chart series",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "KPIs + charts" } },
      },
    },
    "/wallets": {
      get: {
        summary: "List wallets (seed + created in-memory)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Wallet list" } },
      },
      post: {
        summary: "Create wallet (stub; persisted in-memory on warm isolate)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "type", "network", "agent", "dailyCapUsd"],
                properties: {
                  name: { type: "string" },
                  type: {
                    type: "string",
                    enum: ["treasury", "agent", "execution", "research"],
                  },
                  network: {
                    type: "string",
                    enum: ["ethereum", "arbitrum", "base", "polygon"],
                  },
                  agent: { type: "string" },
                  dailyCapUsd: { type: "number", minimum: 0 },
                  policyId: { type: "string" },
                  policyName: { type: "string" },
                  parentId: { type: "string", nullable: true },
                  tags: { type: "array", items: { type: "string" } },
                },
              },
            },
          },
        },
        responses: { "201": { description: "Created stub" } },
      },
    },
    "/wallets/{id}": {
      get: {
        summary: "Wallet by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { "200": { description: "Wallet" }, "404": { description: "Not found" } },
      },
    },
    "/transactions": {
      get: {
        summary: "Transactions with filters and pagination",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "status",
            in: "query",
            schema: {
              type: "string",
              enum: ["all", "confirmed", "pending", "failed", "blocked"],
            },
          },
          { name: "q", in: "query", schema: { type: "string" } },
          { name: "walletId", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "integer", default: 50, maximum: 200 } },
          { name: "offset", in: "query", schema: { type: "integer", default: 0 } },
        ],
        responses: { "200": { description: "Page of transactions" } },
      },
    },
    "/policies": {
      get: {
        summary: "List policies (seed + created)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Policy list" } },
      },
      post: {
        summary: "Create policy stub",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "description", "condition", "severity"],
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  condition: { type: "string" },
                  severity: {
                    type: "string",
                    enum: ["info", "low", "medium", "high", "critical"],
                  },
                  status: {
                    type: "string",
                    enum: ["enforced", "shadow", "draft"],
                  },
                },
              },
            },
          },
        },
        responses: { "201": { description: "Created stub" } },
      },
    },
    "/policies/{id}": {
      get: {
        summary: "Policy by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { "200": { description: "Policy" }, "404": { description: "Not found" } },
      },
    },
    "/audit": {
      get: {
        summary: "Audit events",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Events" } },
      },
    },
    "/alerts": {
      get: {
        summary: "Risk alerts",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Alerts" } },
      },
    },
    "/team": {
      get: {
        summary: "Team members (mock)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Members" } },
      },
    },
    "/pricing": {
      get: {
        summary: "Pricing plans (mock)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Plans" } },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "API key",
        description: "Use the same value as AIGENT_API_KEY",
      },
    },
  },
} as const;
