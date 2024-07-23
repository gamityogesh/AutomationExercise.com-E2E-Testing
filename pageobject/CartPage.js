const { expect } = require("@playwright/test");
class CartPage {
  constructor(page) {
    this.page = page;
    this.btnViewCart = page.locator("[href*='view_cart']");
    this.addToCart = page.locator(".add-to-cart");
    this.closeModel = page.locator(".close-modal");
    this.viewCartLink = page.locator(".modal-body a");
    this.cartDescription = page.locator(".cart_description a");
    this.cartPrice = page.locator(".cart_price p");
    this.disabled = page.locator(".disabled");
    this.cartTotalPrice = page.locator(".cart_total_price");
  }
  async GoToCart() {
    await this.btnViewCart.first().click();
  }
  async addProductAndViewCart() {
    await this.addToCart.first().hover();
    await this.addToCart.first().click();
    await this.closeModel.click();
    await this.addToCart.nth(2).hover();
    await this.addToCart.nth(2).click();
    await this.viewCartLink.click();
  }
  async verifyAllProductDetails() {
    await expect(this.cartDescription.first()).toHaveText("Blue Top");
    await expect(this.cartDescription.nth(1)).toHaveText("Men Tshirt");
    await expect(this.cartPrice.first()).toHaveText("Rs. 500");
    await expect(this.cartPrice.nth(1)).toHaveText("Rs. 400");
    await expect(this.disabled.first()).toHaveText("1");
    await expect(this.disabled.nth(1)).toHaveText("1");
    await expect(this.cartTotalPrice.first()).toHaveText("Rs. 500");
    await expect(this.cartTotalPrice.nth(1)).toHaveText("Rs. 400");
  }
}
module.exports = { CartPage };
