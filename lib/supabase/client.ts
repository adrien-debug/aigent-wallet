"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/** Client navigateur — à utiliser dans les composants client uniquement. */
export function createSupabaseBrowserClient() {
  const cfg = getSupabasePublicConfig();
  if (!cfg) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  return createBrowserClient(cfg.url, cfg.anonKey);
}
