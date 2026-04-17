import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { handleApiV1Edge } from "@/lib/api/edge-middleware";
import { getSupabasePublicConfig } from "@/lib/supabase/env";
import { updateSupabaseSession } from "@/lib/supabase/middleware";
import { isDashboardPath, safeNextPath } from "@/lib/supabase/routes";

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

  if (!getSupabasePublicConfig()) {
    return NextResponse.next();
  }

  const { response, user } = await updateSupabaseSession(request);

  if (isDashboardPath(pathname) && !user) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", safeNextPath(pathname, "/app"));
    return NextResponse.redirect(login);
  }

  if (pathname === "/login" && user) {
    const next = safeNextPath(
      request.nextUrl.searchParams.get("next") ?? undefined,
      "/app",
    );
    return NextResponse.redirect(new URL(next, request.url));
  }

  return response;
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
