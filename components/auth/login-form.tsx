"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { safeNextPath } from "@/lib/supabase/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  initialNext?: string;
};

export function LoginForm({ initialNext }: Props) {
  const next = safeNextPath(initialNext, "/app");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Enter an email address.");
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      const redirect = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: { emailRedirectTo: redirect },
      });
      if (error) {
        console.error("[login]", error.message);
        setStatus("error");
        setMessage(error.message);
        return;
      }
      setStatus("sent");
      setMessage("Check your inbox for the sign-in link.");
    } catch (err) {
      console.error("[login]", err);
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="login-email">Work email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "sent"}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={status === "loading" || status === "sent"}
      >
        {status === "loading" ? "Sending…" : "Send magic link"}
      </Button>
      {message ? (
        <p
          className={
            status === "error"
              ? "text-sm text-destructive"
              : "text-sm text-muted-foreground"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
