const { test, expect } = require("@playwright/test");
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
test.only("Test Case 14: Place Order: Register while Checkout", async ({
  page,
}) => {
  test.slow();
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
  await btnSubmit.click();
  await page.waitForTimeout(2000);
  console.log(await page.locator("#success_message .alert").textContent());
  const message = page.locator("#success_message .alert");
  await expect(message).toContainText(
    "Your order has been placed successfully!"
  );
});

test("Test Case 15: Place Order: Register before Checkout", async ({
  page,
}) => {});

test("Test Case 18: View Category Products", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await expect(page.locator(".left-sidebar h2").first()).toBeVisible();
  await page.locator("[href*='Women']").click();
  const category = page.locator("#Women .panel-body li");
  for (let i = 0; i < (await category.count()); i++) {
    const categoryName = await category.nth(i).locator("a").textContent();
    if (categoryName === "Tops ") {
      await category.nth(i).locator("a").click();
      break;
    }
  }
  await expect(page.locator(".features_items .title")).toBeVisible();
  await expect(page.locator(".features_items .title")).toContainText(
    "Women - Tops Products"
  );
});
