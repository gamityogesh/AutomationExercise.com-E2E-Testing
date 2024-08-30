const { test, expect } = require("@playwright/test");
const { promises } = require("dns");
test("Test Case 14: Place Order: Register while Checkout", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://automationexercise.com/products");
  const productName = "Sleeves Printed Top - White";
  const products = page.locator(".product-image-wrapper");
  for (let i = 0; i < (await products.count()); ++i) {
    const text = await products.nth(i).locator(".productinfo p").textContent();
    if (text === productName) {
      await products.nth(i).locator(".choose a").click();
      break;
    }
  }
  await page.locator(".cart").click();
  await page.locator(".modal-body a").click();
  await page.locator(".check_out").click();
  await page.locator(".modal-body [href*='login']").click();
  await page.locator("[data-qa='login-email']").fill("qwerty123@test.com");
  await page.locator("[data-qa='login-password']").fill("qwerty@123");
  await page.locator("[data-qa='login-button']").click();
  await page.locator("a[href*='view_cart']").first().click();
  await page.locator(".check_out").click();
  await expect(page.locator(".step-one .heading").first()).toBeVisible();
  await expect(page.locator(".step-one .heading").first()).toBeVisible();
  await page
    .locator("[name='message']")
    .fill("If you would like to add a comment about your order");
  await page.locator(".check_out").click();
  await page.locator("[name='name_on_card']").fill("yogesh gamit");
  await page.locator("[name='card_number']").fill("464646464666");
  await page.locator("[name='cvc']").fill("088");
  await page.locator("[name='expiry_month']").fill("088");
  await page.locator("[name='expiry_year']").fill("2024");
  const btnSubmit = page.locator(".submit-button");
  await Promise.all([page.waitForEvent("close"), btnSubmit.click()]);
  console.log(await page.locator("#success_message .alert").textContent());
  const message = page.locator("#success_message .alert");
  await expect(message).toBeVisible();
  await expect(message).toContainText(
    "Your order has been placed successfully!"
  );
});
test("submit demo", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/submit.html");
  await page.locator("#submit-btn").click();
  await expect(page.locator("#message")).toBeVisible();
});
test("mouse focus events ", async ({ page }) => {
  await page.goto("https://www.orangehrm.com/en/30-day-free-trial");
  const fullName = page.locator("#Form_getForm_Name");
  await fullName.focus();
  await fullName.fill("abcd");
});
