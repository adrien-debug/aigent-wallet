import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const UNAUTHORIZED_BODY = {
  ok: false as const,
  error: {
    code: "unauthorized",
    message: "Missing or invalid Authorization Bearer token.",
  },
};

/**
 * When `AIGENT_API_KEY` is set, all `/api/v1/*` requests must send
 * `Authorization: Bearer <same value>`.
 * When unset, requests are allowed (local dev only); a warning is logged once per isolate.
 */
export function enforceApiKey(request: NextRequest): NextResponse | null {
  const expected = process.env.AIGENT_API_KEY?.trim();
  if (!expected) {
    if (!(globalThis as { __aigentAuthWarned?: boolean }).__aigentAuthWarned) {
      (globalThis as { __aigentAuthWarned?: boolean }).__aigentAuthWarned = true;
      console.warn(
        "[api] AIGENT_API_KEY is not set — /api/v1 is open (set the key in production)",
      );
    }
    return null;
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    console.error(
      "[api]",
      JSON.stringify({ code: "unauthorized", httpStatus: 401, reason: "missing_bearer" }),
    );
    return NextResponse.json(UNAUTHORIZED_BODY, { status: 401 });
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token || token !== expected) {
    console.error(
      "[api]",
      JSON.stringify({ code: "unauthorized", httpStatus: 401, reason: "invalid_token" }),
    );
    return NextResponse.json(UNAUTHORIZED_BODY, { status: 401 });
  }

  return null;
}
