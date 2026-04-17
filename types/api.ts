/** Envelope JSON commun aux routes `/api/v1`. */

export type ApiSuccess<T> = { ok: true; data: T };

export type ApiErrorBody = {
  ok: false;
  error: { code: string; message: string };
  requestId?: string;
};
