import type { User } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Utilisateur courant en RSC, ou `null` si Supabase non configuré / pas de session. */
export async function getServerUser(): Promise<User | null> {
  if (!getSupabasePublicConfig()) return null;
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
