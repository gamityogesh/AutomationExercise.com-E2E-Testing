const { test, expect } = require('@playwright/test')
const { POManager } = require('../pageobject/POManager')
const loginDataSet = JSON.parse(JSON.stringify(require('../utils/loginData.json')))
let poManager;
test.beforeEach(async ({ page }) => {
    poManager = new POManager(page)
    const homePage = poManager.getHomePage()
    await homePage.goto()
    await homePage.VerifyHomePageIsVisible()
})

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
test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    const poManager = new POManager(page)
    const homePage = poManager.getHomePage()
    await homePage.goto()
    await homePage.VerifyHomePageIsVisible()
    const loginPage = poManager.getLoginPage()
    await loginPage.validUserLogin(loginDataSet.email, loginDataSet.password)
    //await loginPage.AccountDelete()
})
test("Test Case 3: Login User with incorrect email and password", async ({ page }) => {
    const poManager = new POManager(page)
    const homePage = poManager.getHomePage()
    await homePage.goto()
    await homePage.VerifyHomePageIsVisible()
    const loginPage = poManager.getLoginPage()
    await loginPage.invalidUserLogin("qqwerty@text.com", "qwerty123")
})
test('Test Case 4: Logout User', async ({ page }) => {
    const poManager = new POManager(page)
    const homePage = poManager.getHomePage()
    await homePage.goto()
    await homePage.VerifyHomePageIsVisible()
    const loginPage = poManager.getLoginPage()
    await loginPage.validUserLogin(loginDataSet.email, loginDataSet.password)
    await loginPage.UserLogout()
})
test('Test Case 5: Register User with existing email', async ({ page }) => {
    const poManager = new POManager(page)
    const homePage = poManager.getHomePage()
    await homePage.goto()
    await homePage.VerifyHomePageIsVisible()
    const userRegisterPage = poManager.getUserRegisterPage()
    await userRegisterPage.userRegisterWithExistingEmail("abcd", "qwerty123@test.com")
})
test('Test Case 6: Contact Us Form', async ({ page }) => {
    const poManager = new POManager(page)
    const homePage = poManager.getHomePage()
    await homePage.goto()
    await homePage.VerifyHomePageIsVisible()
    const contactusPage = poManager.getContact_usPage()
    await contactusPage.EnterContact_usDetails("test", "test@test.com", "test", "test", "image.jpg")
    await homePage.VerifyHomePageIsVisible()
})
test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    // const poManager = new POManager(page)
    // const homePage = poManager.getHomePage()
    // await homePage.goto()
    // await homePage.VerifyHomePageIsVisible()
    const testCasePage = poManager.getTestCasePage()
    await testCasePage.VerifyTestCasePage()

})
test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
    test.slow()
    const productsPage = poManager.getProductsPage()
    await productsPage.clickProducts()
    await productsPage.VerifyAllProductIsVisible()
    await productsPage.AllProductDetailsIsVisible()
    await productsPage.ViewProductAndVerifyDetails()
})
test('Test Case 9: Search Product', async () => {
    const searchProductName = "Sleeveless"
    const productsPage = poManager.getProductsPage()
    await productsPage.clickProducts()
    await productsPage.SearchProduct(searchProductName)

})
test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
    const homePage = poManager.getHomePage()
    await homePage.Subscription("test@test.com")
    
})








