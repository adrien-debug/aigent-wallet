import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { enforceApiKey } from "@/lib/api/auth";
import { stampApiResponse } from "@/lib/api/stamp-response";

export function middleware(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);

  const corsOrigin = process.env.AIGENT_CORS_ORIGIN?.trim();
  const browserOrigin = request.headers.get("origin");
  const allowCors = Boolean(
    corsOrigin && browserOrigin && browserOrigin === corsOrigin,
  );

  if (request.method === "OPTIONS" && allowCors && corsOrigin) {
    const res = new NextResponse(null, { status: 204 });
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type, x-request-id",
    );
    res.headers.set("Access-Control-Max-Age", "86400");
    return stampApiResponse(res, requestId, true, corsOrigin);
  }

  const auth = enforceApiKey(request);
  if (auth) {
    return stampApiResponse(auth, requestId, allowCors, corsOrigin);
  }

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });
  return stampApiResponse(res, requestId, allowCors, corsOrigin);
}

export const config = {
  matcher: ["/api/v1", "/api/v1/:path*"],
};
