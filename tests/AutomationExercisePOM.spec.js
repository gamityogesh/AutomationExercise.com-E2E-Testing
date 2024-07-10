const { test, expect } = require('@playwright/test')
const { POManager } = require('../pageobject/POManager')
const loginDataSet=JSON.parse(JSON.stringify(require('../utils/loginData.json')))

test('Test Case 1: Register User', async ({ page }) => {
    const userName = 'test'
    const email = 'qwerty123@test.com'
    const password = 'qwerty@123'
    const poManager = new POManager(page)
    const homePage = poManager.getHomePage()
    await homePage.goto()
    await homePage.VerifyHomePageIsVisible()
    const userRegisterPage = poManager.getUserRegisterPage()
    await userRegisterPage.NewUserSignup(userName, email)
    await userRegisterPage.EnterAccountInformation(userName, email, password, "8", "April", "2020")
    await userRegisterPage.AddressInformation("teste", "teste", "teste", "teste", "teste", "India", "teste", "teste", "253640", "9714069922")
    await userRegisterPage.CreateAccount()

})
test.only('Test Case 2: Login User with correct email and password', async ({ page }) => {
    const poManager = new POManager(page)
    const homePage = poManager.getHomePage()
    await homePage.goto()
    await homePage.VerifyHomePageIsVisible()
    const loginPage = poManager.getLoginPage()
    await loginPage.validUserLogin(loginDataSet.email, loginDataSet.password)
    //await loginPage.AccountDelete()
})
