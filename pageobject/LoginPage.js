const { expect } = require('@playwright/test')
class LoginPage{
    constructor(page){
        this.page=page
        this.btnLoginLink=page.locator("[href*='login']")
        this.loginToYearAcc=page.locator(".login-form h2")
        this.email=page.locator("[data-qa='login-email']")
        this.password=page.locator("[type='password']")
        this.btnLogin=page.locator("[data-qa='login-button']")
        this.loggedInAs=page.locator('text= Logged in as ')
        this.btnDelete=page.locator("a[href*='delete_account']")
        this.textDelete=page.locator("h2 b")
    }
    async validUserLogin(email,password){
        await this.btnLoginLink.click()
        await expect(this.loginToYearAcc).toBeVisible()
        await this.email.fill(email)
        await this.password.fill(password)
        await this.btnLogin.click()
        await expect(this.loggedInAs).toBeVisible()
    }
    async AccountDelete(){
        await this.btnDelete.click()
        await expect(this.textDelete).toBeVisible()
    }
}
module.exports={LoginPage}