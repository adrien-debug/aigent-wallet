/** Console routes that require a Supabase session when auth env is set. */
export function isDashboardPath(pathname: string): boolean {
  return pathname === "/app" || pathname.startsWith("/app/");
}

/** Routes du flux auth : accessibles sans session. */
export function isAuthFlowPath(pathname: string): boolean {
  return (
    pathname === "/login" ||
    pathname.startsWith("/auth/callback") ||
    pathname === "/auth/signout"
  );
}

/**
 * Empêche open-redirect : uniquement chemins relatifs same-origin.
 * Rejette `//evil`, `https:`, etc.
 */
export function safeNextPath(
  next: string | null | undefined,
  fallback = "/app",
): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}
