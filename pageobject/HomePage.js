const { expect } = require('@playwright/test')
class HomePage {
    constructor(page){
        this.page=page
        this.pageHeader=page.locator("h1 span").first()
        this.subscription=page.locator(".single-widget h2")
        this.subscribeEmail=page.locator("#susbscribe_email")
        this.btnSubscribe=page.locator("#subscribe")
        this.alertSuccess=page.locator(".alert-success")

    }
    async goto(){
       
        await this.page.goto("https://automationexercise.com/",{"waitUntil":'domcontentloaded'})
        
        
    }
    async VerifyHomePageIsVisible(){
        await expect(this.pageHeader).toBeVisible()

    }
    async Subscription(email){
        await expect(this.subscription).toHaveText("Subscription")
        await this.subscribeEmail.fill(email)
        await this.btnSubscribe.click()
        await expect(this.alertSuccess).toBeVisible()
    }
}
module.exports ={HomePage}