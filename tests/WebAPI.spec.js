const { test, expect } = require("@playwright/test");
let webContext;
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://automationexercise.com/login");
  await page.locator("[name='email']").first().fill("qwerty123@test.com");
  await page.locator("[name='password']").fill("qwerty@123");
  await page.locator("text='Login'").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("login with valid email and password", async () => {
  const page = await webContext.newPage();
  await page.goto("https://automationexercise.com/login");
  await expect(page.locator("text='Logout'")).toBeVisible();
});
test("login with invalid email and password", async () => {
  const page = await webContext.newPage();
  await page.goto("https://automationexercise.com/login");
  await expect(page.locator("text='Delete Account'")).toBeVisible();
});
