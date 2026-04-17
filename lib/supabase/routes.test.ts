import { describe, expect, it } from "vitest";
import { isAuthFlowPath, isDashboardPath, safeNextPath } from "@/lib/supabase/routes";

describe("isDashboardPath", () => {
  it("matches /app and nested", () => {
    expect(isDashboardPath("/app")).toBe(true);
    expect(isDashboardPath("/app/wallets")).toBe(true);
    expect(isDashboardPath("/apple")).toBe(false);
    expect(isDashboardPath("/login")).toBe(false);
  });
});

describe("isAuthFlowPath", () => {
  it("matches login, callback, signout", () => {
    expect(isAuthFlowPath("/login")).toBe(true);
    expect(isAuthFlowPath("/auth/callback")).toBe(true);
    expect(isAuthFlowPath("/auth/signout")).toBe(true);
    expect(isAuthFlowPath("/app")).toBe(false);
  });
});

describe("safeNextPath", () => {
  it("allows same-origin relative paths", () => {
    expect(safeNextPath("/app/settings", "/app")).toBe("/app/settings");
  });

  it("rejects open redirects", () => {
    expect(safeNextPath("//evil.com", "/app")).toBe("/app");
    expect(safeNextPath("https://evil.com", "/app")).toBe("/app");
    expect(safeNextPath("", "/app")).toBe("/app");
  });

  it("uses fallback when undefined", () => {
    expect(safeNextPath(undefined, "/app")).toBe("/app");
  });
});
