import { expect, test } from "@playwright/test";

const supabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

test.describe("auth guards", () => {
  test.skip(!supabaseConfigured, "Requires NEXT_PUBLIC_SUPABASE_URL to test guards");

  test("/app redirects to /login when no session", async ({ page }) => {
    const res = await page.goto("/app", { waitUntil: "domcontentloaded" });
    expect(res?.status()).toBe(200);
    await expect(page).toHaveURL(/\/login(\?|$)/);
  });

  test("login page renders", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  });

  test("signout rejects GET", async ({ request }) => {
    const res = await request.get("/auth/signout", { maxRedirects: 0 });
    expect(res.status()).toBe(405);
  });
});

test.describe("auth disabled fallback", () => {
  test.skip(supabaseConfigured, "Only runs when Supabase env is unset");

  test("/app reachable in demo mode", async ({ page }) => {
    const res = await page.goto("/app");
    expect(res?.status()).toBe(200);
  });
});
