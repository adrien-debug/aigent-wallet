import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("marketing home renders", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("api health responds", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("ok");
  });

  test("api v1 discovery without bearer", async ({ request }) => {
    const res = await request.get("/api/v1");
    // 200 if AIGENT_API_KEY is unset (open), 401 if set.
    expect([200, 401]).toContain(res.status());
  });
});
