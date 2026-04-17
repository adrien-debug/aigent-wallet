import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { enforceApiKey } from "@/lib/api/auth";

export function middleware(request: NextRequest) {
  const auth = enforceApiKey(request);
  if (auth) return auth;
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/v1", "/api/v1/:path*"],
};
