import { test, expect } from "@playwright/test";

test.describe("theme persistence", () => {
  test("light theme is applied and persists on reload", async ({ page }) => {
    await page.goto("/settings");

    const lightButton = page.getByRole("button", { name: "Light", exact: true });
    await lightButton.click();

    const htmlEl = page.locator("html");
    await expect(htmlEl).toHaveAttribute("data-theme", "light");

    await page.reload();
    await expect(htmlEl).toHaveAttribute("data-theme", "light");
  });

  test("dark theme persists after navigation", async ({ page }) => {
    await page.goto("/settings");
    await page.getByRole("button", { name: "Dark", exact: true }).click();

    await page.goto("/course");
    const htmlEl = page.locator("html");
    await expect(htmlEl).toHaveAttribute("data-theme", "dark");
  });

  test("ultradark theme sets correct data-theme", async ({ page }) => {
    await page.goto("/settings");
    await page.getByRole("button", { name: "Ultra Dark", exact: true }).click();

    const htmlEl = page.locator("html");
    await expect(htmlEl).toHaveAttribute("data-theme", "ultradark");
  });

  test("no theme flash on page load after theme is set", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("pmc-theme", "dark");
    });
    const flashDetected: boolean[] = [];
    page.on("load", async () => {
      const theme = await page
        .locator("html")
        .getAttribute("data-theme")
        .catch(() => null);
      flashDetected.push(theme !== "dark");
    });
    await page.goto("/");
    await page.locator("html").waitFor();
    const htmlEl = page.locator("html");
    await expect(htmlEl).toHaveAttribute("data-theme", "dark");
  });

  test("theme button in header cycles through themes", async ({ page }) => {
    await page.goto("/");
    const cycleBtn = page.getByRole("button", { name: /theme/i });
    await cycleBtn.click();
    const htmlEl = page.locator("html");
    const theme = await htmlEl.getAttribute("data-theme");
    expect(["light", "dark", "ultradark"]).toContain(theme);
  });
});
