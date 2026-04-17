import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/**
 * Client serveur (RSC, Server Actions, Route Handlers).
 * `setAll` peut échouer en pur RSC : le rafraîchissement de session reste géré par le middleware.
 */
export function createSupabaseServerClient() {
  const cfg = getSupabasePublicConfig();
  if (!cfg) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  const cookieStore = cookies();

  return createServerClient(cfg.url, cfg.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, headers) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
          void headers;
        } catch {
          /* Server Component : pas d’écriture cookies ici */
        }
      },
    },
  });
}
