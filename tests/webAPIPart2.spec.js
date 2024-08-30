const { test, expect } = require("@playwright/test");
let webContext;
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator("[name=username]").fill("Admin");
  await page.locator("[name=password]").fill("admin123");
  await page.locator("[type='submit']").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "demo.json" });
  webContext = await browser.newContext({ storageState: "demo.json" });
});
test("login with valid username and password", async () => {
  const page = await webContext.newPage();
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await expect(page.locator("text='Admin'")).toBeVisible();
});
test("add new user", async () => {
  const page = await webContext.newPage();
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator("text='Admin'").click();
  await page.locator("text=' Add '").click();
  await page.locator(".oxd-select-text--after").first().click();
  await page.locator("[role='listbox'] span").first().click();
  await page.locator("[placeholder*='Type']").pressSequentially("");
  await page.locator(".oxd-select-text--after").last().click();
  await page.locator("[role='listbox'] span").first().click();
  await page.locator(".oxd-input-group .oxd-input").first().fill("yelena");
  await page.locator("[type='password']").first().fill("abdc1234");
  await page.locator("[type='password']").last().fill("abdc1234");
  await page.locator("text='Save'").click();


});

