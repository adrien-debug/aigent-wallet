import { NextResponse } from "next/server";

export type ApiSuccess<T> = { ok: true; data: T };
export type ApiErrorBody = {
  ok: false;
  error: { code: string; message: string };
};

export function jsonOk<T>(data: T, init?: { status?: number }) {
  const body: ApiSuccess<T> = { ok: true, data };
  return NextResponse.json(body, { status: init?.status ?? 200 });
}

export function jsonErr(
  status: number,
  code: string,
  message: string,
  logContext?: Record<string, string | number | undefined>,
) {
  const safe = logContext
    ? Object.fromEntries(
        Object.entries(logContext).filter(([, v]) => v !== undefined),
      ) as Record<string, string | number>
    : undefined;
  console.error(
    "[api]",
    JSON.stringify({ code, httpStatus: status, ...(safe ?? {}) }),
  );
  const body: ApiErrorBody = { ok: false, error: { code, message } };
  return NextResponse.json(body, { status });
}
