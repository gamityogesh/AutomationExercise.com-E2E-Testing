const { test, expect } = require('@playwright/test')
test('test demo', async ({ page }) => {
    await page.goto("https://automationexercise.com/products")
    await expect(page.locator(".title")).toBeVisible()
    await page.locator(".product-image-wrapper").first().waitFor()
    const titles = await page.locator(".product-image-wrapper p").allTextContents()
    console.log(titles)
    const img = page.locator(".product-image-wrapper")
    for (let i = 0; i < await img.count(); ++i) {
        await expect(img.nth(i).locator("img")).toBeVisible()
        console.log("verify image is " + await img.nth(i).locator("p").first().textContent())
    }
    await page.locator(".choose a").first().click()
    await expect(page.locator(".product-information h2")).toBeVisible()
    await expect(page.locator(".product-information p").first()).toBeVisible()
    await expect(page.locator(".product-information span").last()).toBeVisible()
    await expect(page.locator(".product-information b").first()).toBeVisible()
    await expect(page.locator(".product-information b").nth(1)).toBeVisible()
    await expect(page.locator(".product-information b").last()).toBeVisible()


})
test('search products', async ({ page }) => {
    const searchProductName="Sleeveless"
    await page.goto("https://automationexercise.com/products",{"waitUntil":'domcontentloaded'})
    await expect(page.locator(".title")).toBeVisible()
    await page.locator(".product-image-wrapper").first().waitFor()
    await page.locator("#search_product").fill(searchProductName)
    await page.locator("#submit_search").click()
    await expect(page.locator(".features_items")).toBeVisible()
    const searchProducts=page.locator(".single-products .productinfo")
    for(let i=0;i<await searchProducts.count();++i){
        const text= await searchProducts.nth(i).locator("p").textContent()
        console.log(text)
       if(text.includes(searchProductName)){
        await expect(searchProducts.nth(i)).toBeVisible()
       }
    }

    
})

