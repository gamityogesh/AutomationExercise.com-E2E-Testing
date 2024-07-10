const { expect } = require('@playwright/test')
class HomePage {
    constructor(page){
        this.page=page
        this.pageHeader=page.locator("h1 span").first()
    }
    async goto(){
       
        await this.page.goto("https://automationexercise.com/")
        
        
    }
    async VerifyHomePageIsVisible(){
        await expect(this.pageHeader).toBeVisible()

    }
}
module.exports ={HomePage}