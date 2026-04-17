import type { DeveloperSnippet } from "@/types";

export const developerSnippets: DeveloperSnippet[] = [
  {
    id: "sn_init",
    title: "Initialize client",
    language: "ts",
    code: `import { Aigent } from "@aigent/node";

const aigent = new Aigent({
  apiKey: process.env.AIGENT_API_KEY!,
  environment: "sandbox",
});

const wallet = await aigent.wallets.retrieve("wal_compute_broker");`,
  },
  {
    id: "sn_policy",
    title: "Evaluate before spend",
    language: "ts",
    code: `const decision = await aigent.policies.evaluate({
  walletId: "wal_compute_broker",
  intent: {
    type: "transfer",
    asset: "USDC",
    amount: "12400",
    to: "0xA11ce…44b2",
  },
});

if (decision.status === "deny") {
  throw new PolicyViolation(decision.traceId);
}`,
  },
  {
    id: "sn_webhook",
    title: "Verify webhook signature",
    language: "ts",
    code: `import { verifyWebhook } from "@aigent/node/webhooks";

export async function POST(req: Request) {
  const payload = await verifyWebhook(req, process.env.AIGENT_WH_SECRET!);
  // route: audit.alert_created | approval.required | wallet.frozen
  return Response.json({ received: true });
}`,
  },
  {
    id: "sn_cli",
    title: "CLI quickstart",
    language: "bash",
    code: `npm i -g @aigent/cli
aigent login
aigent wallets list --env production`,
  },
];
