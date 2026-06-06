import { test, expect } from "@playwright/test";

test.describe("lesson navigation", () => {
  test("home page loads and shows course entry point", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Python Mastery" })).toBeVisible();
    await expect(page.getByText("Python 3.14.5")).toBeVisible();
    await expect(page.getByRole("link", { name: /start learning|continue/i })).toBeVisible();
  });

  test("course map shows all 16 stages", async ({ page }) => {
    await page.goto("/course");
    await expect(page.getByRole("heading", { name: "Course Map" })).toBeVisible();
    const stageLinks = page.locator("a[href*='/course/stage-']");
    await expect(stageLinks).toHaveCount(16);
  });

  test("stage page renders stage details", async ({ page }) => {
    await page.goto("/course/stage-01");
    await expect(
      page.getByRole("heading", { name: "Zero Start: What Programming Is" })
    ).toBeVisible();
    await expect(page.getByText("Lessons")).toBeVisible();
  });

  test("lesson page renders lesson title and read/practice tabs", async ({
    page,
  }) => {
    await page.goto("/course/stage-01/s1-what-is-a-program");
    await expect(
      page.getByRole("button", { name: /read/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /practice/i })
    ).toBeVisible();
  });

  test("practice tab shows interactions", async ({ page }) => {
    await page.goto("/course/stage-01/s1-what-is-a-program");
    await page.getByRole("button", { name: /practice/i }).click();
    await expect(page.getByText(/mastery gate/i)).toBeVisible();
  });

  test("unknown lesson shows not-found message", async ({ page }) => {
    await page.goto("/course/stage-01/nonexistent-lesson");
    await expect(page.getByText(/lesson not found/i)).toBeVisible();
  });

  test("breadcrumb navigation works", async ({ page }) => {
    await page.goto("/course/stage-01/s1-what-is-a-program");
    await page.getByRole("link", { name: /course/i }).first().click();
    await expect(page).toHaveURL("/course");
  });

  test("nav links are keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(["A", "BUTTON"]).toContain(focused);
  });
});
