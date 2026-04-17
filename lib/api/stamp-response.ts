import type { NextResponse } from "next/server";

/** En-têtes communs : corrélation + CORS optionnel (voir middleware). */
export function stampApiResponse(
  response: NextResponse,
  requestId: string,
  allowCors: boolean,
  corsOrigin: string | undefined,
): NextResponse {
  response.headers.set("x-request-id", requestId);
  if (allowCors && corsOrigin) {
    response.headers.set("Access-Control-Allow-Origin", corsOrigin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
  return response;
}
