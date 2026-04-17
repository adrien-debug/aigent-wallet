import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getConsoleEntryHref, getSupabasePublicConfig } from "@/lib/supabase/env";

describe("getSupabasePublicConfig", () => {
  const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prevKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });

  afterEach(() => {
    if (prevUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;
    if (prevKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = prevKey;
  });

  it("returns null when URL missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "k";
    expect(getSupabasePublicConfig()).toBeNull();
  });

  it("returns null when anon key missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://x.supabase.co";
    expect(getSupabasePublicConfig()).toBeNull();
  });

  it("trims and returns config", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = " https://x.supabase.co ";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = " anon ";
    expect(getSupabasePublicConfig()).toEqual({
      url: "https://x.supabase.co",
      anonKey: "anon",
    });
  });
});

describe("getConsoleEntryHref", () => {
  const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prevKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });

  afterEach(() => {
    if (prevUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;
    if (prevKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = prevKey;
  });

  it("points to demo console when Supabase unset", () => {
    expect(getConsoleEntryHref()).toBe("/app");
  });

  it("points to login when Supabase configured", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://x.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";
    expect(getConsoleEntryHref()).toBe("/login?next=/app");
  });
});
