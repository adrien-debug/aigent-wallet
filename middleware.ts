import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { handleApiV1Edge } from "@/lib/api/edge-middleware";
import { getSupabasePublicConfig } from "@/lib/supabase/env";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

function isApiV1Path(pathname: string) {
  return pathname === "/api/v1" || pathname.startsWith("/api/v1/");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isApiV1Path(pathname)) {
    return handleApiV1Edge(request);
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (getSupabasePublicConfig()) {
    return updateSupabaseSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/v1",
    "/api/v1/:path*",
    /*
     * Pages + auth : exclut assets statiques.
     * /api/health et autres /api/* hors v1 : court-circuités dans le handler.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
