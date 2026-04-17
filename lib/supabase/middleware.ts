import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/**
 * Rafraîchit la session Auth (cookies). À exécuter sur les routes « pages », pas sur `/api/v1`.
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */
export async function updateSupabaseSession(request: NextRequest) {
  const cfg = getSupabasePublicConfig();
  if (!cfg) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(cfg.url, cfg.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value),
        );
      },
    },
  });

  await supabase.auth.getUser();

  return supabaseResponse;
}
