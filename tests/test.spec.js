const { test, expect } = require("@playwright/test");
const { stat } = require("fs");
test("test demo", async ({ page }) => {
  await page.goto("https://automationexercise.com/products");
  await expect(page.locator(".title")).toBeVisible();
  await page.locator(".product-image-wrapper").first().waitFor();
  const titles = await page
    .locator(".product-image-wrapper p")
    .allTextContents();
  console.log(titles);
  const img = page.locator(".product-image-wrapper");
  for (let i = 0; i < (await img.count()); ++i) {
    await expect(img.nth(i).locator("img")).toBeVisible();
    console.log(
      "verify image is " + (await img.nth(i).locator("p").first().textContent())
    );
  }
  await page.locator(".choose a").first().click();
  await expect(page.locator(".product-information h2")).toBeVisible();
  await expect(page.locator(".product-information p").first()).toBeVisible();
  await expect(page.locator(".product-information span").last()).toBeVisible();
  await expect(page.locator(".product-information b").first()).toBeVisible();
  await expect(page.locator(".product-information b").nth(1)).toBeVisible();
  await expect(page.locator(".product-information b").last()).toBeVisible();
});
test("search products", async ({ page }) => {
  const searchProductName = "Sleeveless";
  await page.goto("https://automationexercise.com/products", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator(".title")).toBeVisible();
  await page.locator(".product-image-wrapper").first().waitFor();
  await page.locator("#search_product").fill(searchProductName);
  await page.locator("#submit_search").click();
  await expect(page.locator(".features_items")).toBeVisible();
  const searchProducts = page.locator(".single-products .productinfo");
  for (let i = 0; i < (await searchProducts.count()); ++i) {
    const text = await searchProducts.nth(i).locator("p").textContent();
    console.log(text);
    if (text.includes(searchProductName)) {
      await expect(searchProducts.nth(i)).toBeVisible();
    }
  }
});
test("Test Case 12: Add Products in Cart", async ({ page }) => {
  await page.goto("https://automationexercise.com/products", {
    waitUntil: "domcontentloaded",
  });
  await page.locator(".add-to-cart").first().hover();
  await page.locator(".add-to-cart").first().click();
  await page.locator(".close-modal").click();
  await page.locator(".add-to-cart").nth(2).hover();
  await page.locator(".add-to-cart").nth(2).click();
  await page.locator(".modal-body a").click();
  await expect(page.locator(".cart_description a").first()).toHaveText(
    "Blue Top"
  );
  await expect(page.locator(".cart_description a").nth(1)).toHaveText(
    "Men Tshirt"
  );
  await expect(page.locator(".cart_price p").first()).toHaveText("Rs. 500");
  await expect(page.locator(".cart_price p").nth(1)).toHaveText("Rs. 400");
  await expect(page.locator(".disabled").first()).toHaveText("1");
  await expect(page.locator(".disabled").nth(1)).toHaveText("1");
  await expect(page.locator(".cart_total_price").first()).toHaveText("Rs. 500");
  await expect(page.locator(".cart_total_price").nth(1)).toHaveText("Rs. 400");
});
test("Test Case 13: Verify Product quantity in Cart", async ({ page }) => {
  await page.goto("https://automationexercise.com/products", {
    waitUntil: "domcontentloaded",
  });
  const productName = "Sleeves Printed Top - White";
  const products = page.locator(".product-image-wrapper");
  for (let i = 0; i < (await products.count()); ++i) {
    const text = await products.nth(i).locator(".productinfo p").textContent();
    if (text === productName) {
      await products.nth(i).locator(".choose a").click();
      break;
    }
  }
  await page.locator("#quantity").fill("4");
  await page.locator(".cart").click();
  await page.locator(".modal-body a").click();
  await expect(page.locator(".disabled")).toHaveText("4");
});
test("Test Case 14: Place Order: Register while Checkout", async ({ page }) => {
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
  const message = page.locator("#success_message .alert");
  await page.locator(".submit-button").click();
  await message.waitFor({ state: "visible" });
  await expect(message).toContainText(
    "Your order has been placed successfully!"
  );
});
