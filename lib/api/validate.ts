import { jsonErr } from "@/lib/api/response";
import type { NextResponse } from "next/server";

type ErrResponse = NextResponse;

export type Val<T> = { ok: true; value: T } | { ok: false; response: ErrResponse };

function validationError(
  request: Request,
  field: string,
  message: string,
): ErrResponse {
  return jsonErr(400, "validation_error", message, { field }, request);
}

export function reqTrimmedString(
  body: Record<string, unknown>,
  key: string,
  request: Request,
): Val<string> {
  const v = body[key];
  if (typeof v !== "string" || !v.trim()) {
    return {
      ok: false,
      response: validationError(request, key, `Field \`${key}\` is required.`),
    };
  }
  return { ok: true, value: v.trim() };
}

export function reqFiniteNumber(
  body: Record<string, unknown>,
  key: string,
  request: Request,
  min?: number,
): Val<number> {
  const v = body[key];
  if (typeof v !== "number" || !Number.isFinite(v)) {
    return {
      ok: false,
      response: validationError(request, key, `\`${key}\` must be a number.`),
    };
  }
  if (min !== undefined && v < min) {
    return {
      ok: false,
      response: validationError(request, key, `\`${key}\` must be >= ${min}.`),
    };
  }
  return { ok: true, value: v };
}

export function reqDiscriminant<T>(
  body: Record<string, unknown>,
  key: string,
  request: Request,
  guard: (v: unknown) => v is T,
): Val<T> {
  const v = body[key];
  if (!guard(v)) {
    return {
      ok: false,
      response: validationError(request, key, `Invalid \`${key}\`.`),
    };
  }
  return { ok: true, value: v };
}

/** Champ optionnel : `undefined` si absent, erreur si présent mais invalide. */
export function optDiscriminant<T>(
  body: Record<string, unknown>,
  key: string,
  request: Request,
  guard: (v: unknown) => v is T,
): Val<T | undefined> {
  const v = body[key];
  if (v === undefined) return { ok: true, value: undefined };
  if (!guard(v)) {
    return {
      ok: false,
      response: validationError(request, key, `Invalid \`${key}\`.`),
    };
  }
  return { ok: true, value: v };
}
