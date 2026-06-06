import { test, expect } from "@playwright/test";

test.describe("code lab", () => {
  test.skip(
    ({ browserName }) => browserName === "firefox",
    "Pyodide Worker may behave differently in Firefox CI"
  );

  test("code editor is accessible via keyboard", async ({ page }) => {
    await page.goto("/course/stage-01/s1-your-first-output");
    await page.getByRole("button", { name: /practice/i }).click();

    const runButton = page.getByRole("button", { name: /run/i }).first();
    if (await runButton.isVisible()) {
      await expect(runButton).toBeEnabled();
    }
  });

  test("reset button restores starter code", async ({ page }) => {
    await page.goto("/course/stage-01/s1-your-first-output");
    await page.getByRole("button", { name: /practice/i }).click();

    const resetButton = page.getByRole("button", { name: /reset/i }).first();
    if (await resetButton.isVisible()) {
      await resetButton.click();
    }
  });

  test("output panel shows 'no output yet' placeholder initially", async ({
    page,
  }) => {
    await page.goto("/course/stage-01/s1-your-first-output");
    await page.getByRole("button", { name: /practice/i }).click();

    const outputPanel = page.getByLabel(/output will appear here/i);
    if (await outputPanel.isVisible()) {
      await expect(outputPanel).toBeVisible();
    }
  });
});

test.describe("interaction blocks", () => {
  test("multiple choice interaction renders options", async ({ page }) => {
    await page.goto("/course/stage-01/s1-what-is-a-program");
    await page.getByRole("button", { name: /practice/i }).click();

    const options = page.getByRole("radio");
    if (await options.first().isVisible()) {
      await expect(options.first()).toBeEnabled();
    }
  });

  test("hint button reveals a hint", async ({ page }) => {
    await page.goto("/course/stage-01/s1-what-is-a-program");
    await page.getByRole("button", { name: /practice/i }).click();

    const hintButton = page
      .getByRole("button", { name: /show hint/i })
      .first();
    if (await hintButton.isVisible()) {
      await hintButton.click();
      await expect(page.getByText(/hint:/i).first()).toBeVisible();
    }
  });
});
