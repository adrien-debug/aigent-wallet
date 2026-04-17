import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { enforceApiKey } from "@/lib/api/auth";

export function middleware(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);

  const corsOrigin = process.env.AIGENT_CORS_ORIGIN?.trim();
  const browserOrigin = request.headers.get("origin");
  const allowCors = Boolean(
    corsOrigin && browserOrigin && browserOrigin === corsOrigin,
  );

  function withCors(res: NextResponse) {
    res.headers.set("x-request-id", requestId);
    if (allowCors) {
      res.headers.set("Access-Control-Allow-Origin", corsOrigin!);
      res.headers.set("Access-Control-Allow-Credentials", "true");
    }
    return res;
  }

  if (request.method === "OPTIONS" && allowCors) {
    const res = new NextResponse(null, { status: 204 });
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type, x-request-id",
    );
    res.headers.set("Access-Control-Max-Age", "86400");
    return withCors(res);
  }

  const auth = enforceApiKey(request);
  if (auth) {
    return withCors(auth);
  }

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });
  return withCors(res);
}

export const config = {
  matcher: ["/api/v1", "/api/v1/:path*"],
};
