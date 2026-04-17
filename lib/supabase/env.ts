export type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

/** URL + clé anon (public). Sans ça, auth Supabase est désactivée côté app. */
export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

/** Lien vers la console : login si Supabase est configuré, sinon accès direct démo. */
export function getConsoleEntryHref(): string {
  return getSupabasePublicConfig() ? "/login?next=/app" : "/app";
}
