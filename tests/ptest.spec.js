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
  await context.storageState({ path: "pTest.json" });
  webContext = await browser.newContext({ storageState: "pTest.json" });
});

test("login with valid email id and password", async () => {
  const page = await webContext.newPage();
  await page.goto("https://automationexercise.com/login");
  await expect(page.locator("text=' Delete Account'")).toBeVisible();
});
test("add to product", async () => {
  const page = await webContext.newPage();
  await page.goto("https://automationexercise.com/login");
  await page.locator(".product-overlay p").first().waitFor();
  const products = page.locator(".single-products");
  const productName = "Sleeves Printed Top - White";
  //   console.log(await page.locator(".product-overlay p").allTextContents());
  for (let i = 1; i < (await products.count()); i++) {
    if (
      (await products.nth(i).locator("p").first().textContent()) === productName
    ) {
      await products.nth(i).locator("a").first().click();
      break;
    }
  }
  await page.locator("text='View Cart'").click();
  await expect(page.locator("h4 a")).toHaveText(productName);
  await page.locator(".check_out").click();
  await expect(page.locator("h4 a")).toHaveText(productName);
  await page.locator(".check_out").click();

});
