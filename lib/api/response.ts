import { apiLogError } from "@/lib/api/log";
import type { ApiErrorBody, ApiSuccess } from "@/types/api";
import { NextResponse } from "next/server";

export type { ApiErrorBody, ApiSuccess } from "@/types/api";

export function jsonOk<T>(data: T, init?: { status?: number; request?: Request }) {
  const body: ApiSuccess<T> = { ok: true, data };
  const res = NextResponse.json(body, { status: init?.status ?? 200 });
  const rid = init?.request?.headers.get("x-request-id");
  if (rid) res.headers.set("x-request-id", rid);
  return res;
}

export function jsonErr(
  status: number,
  code: string,
  message: string,
  logContext?: Record<string, string | number | undefined>,
  request?: Request,
) {
  const rid = request?.headers.get("x-request-id") ?? undefined;
  const safe = logContext
    ? (Object.fromEntries(
        Object.entries(logContext).filter(([, v]) => v !== undefined),
      ) as Record<string, string | number>)
    : undefined;
  apiLogError(code, status, { ...safe, requestId: rid });
  const body: ApiErrorBody = {
    ok: false,
    error: { code, message },
    ...(rid ? { requestId: rid } : {}),
  };
  const res = NextResponse.json(body, { status });
  if (rid) res.headers.set("x-request-id", rid);
  return res;
}
