import { NextResponse } from "next/server";

export type ApiSuccess<T> = { ok: true; data: T };
export type ApiErrorBody = {
  ok: false;
  error: { code: string; message: string };
  requestId?: string;
};

export function jsonOk<T>(
  data: T,
  init?: { status?: number; request?: Request },
) {
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
    ? Object.fromEntries(
        Object.entries(logContext).filter(([, v]) => v !== undefined),
      ) as Record<string, string | number>
    : undefined;
  console.error(
    "[api]",
    JSON.stringify({
      code,
      httpStatus: status,
      ...(rid ? { requestId: rid } : {}),
      ...(safe ?? {}),
    }),
  );
  const body: ApiErrorBody = {
    ok: false,
    error: { code, message },
    ...(rid ? { requestId: rid } : {}),
  };
  const res = NextResponse.json(body, { status });
  if (rid) res.headers.set("x-request-id", rid);
  return res;
}
