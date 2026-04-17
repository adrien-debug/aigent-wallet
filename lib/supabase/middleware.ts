import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

export type SupabaseSessionResult = {
  response: NextResponse;
  user: User | null;
};

/**
 * Rafraîchit la session Auth (cookies). À exécuter sur les routes « pages », pas sur `/api/v1`.
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */
export async function updateSupabaseSession(
  request: NextRequest,
): Promise<SupabaseSessionResult> {
  const cfg = getSupabasePublicConfig();
  if (!cfg) {
    return { response: NextResponse.next({ request }), user: null };
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response: supabaseResponse, user };
}
