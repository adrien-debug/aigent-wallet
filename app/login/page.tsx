import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { MarketingBackground } from "@/components/marketing/background";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getConsoleEntryHref, getSupabasePublicConfig } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the Aigent console with email (magic link).",
};

function errorMessage(code: string | undefined): string | null {
  if (!code) return null;
  if (code === "missing_code") return "Missing authorization code. Request a new link.";
  if (code === "auth") return "Sign-in failed. Try again or contact support.";
  return "Something went wrong.";
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const configured = !!getSupabasePublicConfig();
  const nextParam = searchParams.next;
  const next =
    typeof nextParam === "string"
      ? nextParam
      : Array.isArray(nextParam)
        ? nextParam[0]
        : undefined;
  const errParam = searchParams.error;
  const err =
    typeof errParam === "string"
      ? errParam
      : Array.isArray(errParam)
        ? errParam[0]
        : undefined;
  const authError = errorMessage(err);

  return (
    <div className="relative flex min-h-screen flex-col">
      <MarketingBackground />
      <header className="relative z-10 flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur sm:px-6">
        <Button variant="ghost" asChild>
          <Link href="/">Home</Link>
        </Button>
        <ThemeToggle />
      </header>
      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md border-border/80 bg-card/90 shadow-lg backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">Sign in</CardTitle>
            <CardDescription>
              {configured
                ? "We’ll email you a one-time link (no password)."
                : "Supabase is not configured — use demo mode below."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {authError ? (
              <p className="text-sm text-destructive" role="alert">
                {authError}
              </p>
            ) : null}
            {configured ? (
              <LoginForm initialNext={next} />
            ) : (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Set{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    NEXT_PUBLIC_SUPABASE_URL
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    NEXT_PUBLIC_SUPABASE_ANON_KEY
                  </code>{" "}
                  to enable email sign-in.
                </p>
                <Button asChild className="w-full">
                  <Link href={getConsoleEntryHref()}>Open demo console</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
