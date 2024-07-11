const { expect } = require("@playwright/test")
class ProductsPage {
    constructor(page) {
        this.page = page
        this.btnProduct = page.locator("a[href='/products']")
        this.title = page.locator(".title")
        this.products = page.locator(".product-image-wrapper")
        this.allTitles = page.locator(".product-image-wrapper p")
        this.viewProduct = page.locator(".choose a")
        this.productName = page.locator(".product-information h2")
        this.category = page.locator(".product-information p")
        this.price = page.locator(".product-information span")
        this.availability = page.locator(".product-information b")
        this.condition = page.locator(".product-information b")
        this.brand = page.locator(".product-information b")
        this.searchInputBox=page.locator("#search_product")
        this.submitSearch=page.locator("#submit_search")
        this.featuresItems =page.locator(".features_items")
        this.searchResults=page.locator(".single-products .productinfo")
    }
    async clickProducts() {
        await this.btnProduct.click()
    }
    async VerifyAllProductIsVisible() {
        await expect(this.title).toBeVisible()
    }
    async AllProductDetailsIsVisible() {
        await this.products.first().waitFor()
        const titles = await this.allTitles.allTextContents()
        console.log(titles)
        const productImage = this.products
        for (let i = 0; i < await productImage.count(); ++i) {
            await expect(productImage.nth(i).locator("img")).toBeVisible()
            console.log("verify image is visible " + await productImage.nth(i).locator("p").first().textContent())
        }
    }
    async ViewProductAndVerifyDetails() {
        await this.viewProduct.first().click()
        await expect(this.productName).toBeVisible()
        await expect(this.category.first()).toBeVisible()
        await expect(this.price.last()).toBeVisible()
        await expect(this.availability.first()).toBeVisible()
        await expect(this.condition.nth(1)).toBeVisible()
        await expect(this.brand.last()).toBeVisible()
    }
    async SearchProduct(searchProductName) {
        await  this.products.first().waitFor()
        await this.searchInputBox.fill(searchProductName)
        await this.submitSearch.click()
        await expect(this.featuresItems).toBeVisible()
        const searchProducts = this.searchResults
        for (let i = 0; i < await searchProducts.count(); ++i) {
            const text = await searchProducts.nth(i).locator("p").textContent()
            console.log(text)
            if (text.includes(searchProductName)) {
                await expect(searchProducts.nth(i)).toBeVisible()
            }
        }
    }

}
module.exports = { ProductsPage }