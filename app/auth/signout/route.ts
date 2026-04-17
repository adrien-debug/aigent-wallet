import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

async function signOut(request: Request) {
  const cfg = getSupabasePublicConfig();
  if (!cfg) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const cookieStore = cookies();
  const supabase = createServerClient(cfg.url, cfg.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options),
        );
        void headers;
      },
    },
  });

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[auth/signout]", error.message);
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

/**
 * POST only — protects against CSRF logouts triggered by third-party `<img>` /
 * link prefetch. The dropdown menu submits a same-origin form to this route.
 */
export async function POST(request: Request) {
  return signOut(request);
}
