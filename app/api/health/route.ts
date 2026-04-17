import { NextResponse } from "next/server";

/**
 * Lightweight readiness probe for load balancers / monitoring.
 * No secrets; safe to expose publicly.
 */
export function GET() {
  return NextResponse.json({
    ok: true,
    service: "aigent-console",
    timestamp: new Date().toISOString(),
  });
}
