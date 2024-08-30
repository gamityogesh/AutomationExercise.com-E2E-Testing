const { test, expect } = require("@playwright/test");
const { customTest } = require("../utils/test-base");
const { POManager } = require("../pageobject/POManager");
const loginDataSet = JSON.parse(
  JSON.stringify(require("../utils/loginData.json"))
);
let poManager;
test.beforeEach(async ({ page }) => {
  poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.VerifyHomePageIsVisible();
});

customTest(
  "Test Case 1: Register User",
  async ({ page, testDataForRegister }) => {
    const poManager = new POManager(page);
    const homePage = poManager.getHomePage();
    await homePage.goto();
    await homePage.VerifyHomePageIsVisible();
    const userRegisterPage = poManager.getUserRegisterPage();
    await userRegisterPage.NewUserSignup(
      testDataForRegister.userName,
      testDataForRegister.email
    );
    await userRegisterPage.EnterAccountInformation(
      testDataForRegister.userName,
      testDataForRegister.email,
      testDataForRegister.password,
      testDataForRegister.day,
      testDataForRegister.month,
      testDataForRegister.year
    );
    await userRegisterPage.AddressInformation(
      testDataForRegister.fname,
      testDataForRegister.lname,
      testDataForRegister.compony,
      testDataForRegister.add1,
      testDataForRegister.add2,
      testDataForRegister.country,
      testDataForRegister.state,
      testDataForRegister.city,
      testDataForRegister.zipCode,
      testDataForRegister.mobileNo
    );
    await userRegisterPage.CreateAccount();
  }
);
test("Test Case 2: Login User with correct email and password", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.VerifyHomePageIsVisible();
  const loginPage = poManager.getLoginPage();
  await loginPage.validUserLogin(loginDataSet.email, loginDataSet.password);
  //await loginPage.AccountDelete()
});
test("Test Case 3: Login User with incorrect email and password", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.VerifyHomePageIsVisible();
  const loginPage = poManager.getLoginPage();
  await loginPage.invalidUserLogin("qqwerty@text.com", "qwerty123");
});
test("Test Case 4: Logout User", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.VerifyHomePageIsVisible();
  const loginPage = poManager.getLoginPage();
  await loginPage.validUserLogin(loginDataSet.email, loginDataSet.password);
  await loginPage.UserLogout();
});
test("Test Case 5: Register User with existing email", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.VerifyHomePageIsVisible();
  const userRegisterPage = poManager.getUserRegisterPage();
  await userRegisterPage.userRegisterWithExistingEmail(
    "abcd",
    "qwerty123@test.com"
  );
});
test("Test Case 6: Contact Us Form", async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = poManager.getHomePage();
  await homePage.goto();
  await homePage.VerifyHomePageIsVisible();
  const contactusPage = poManager.getContact_usPage();
  await contactusPage.EnterContact_usDetails(
    "test",
    "test@test.com",
    "test",
    "test",
    "image.jpg"
  );
  await homePage.VerifyHomePageIsVisible();
});
test("Test Case 7: Verify Test Cases Page", async ({ page }) => {
  // const poManager = new POManager(page)
  // const homePage = poManager.getHomePage()
  // await homePage.goto()
  // await homePage.VerifyHomePageIsVisible()
  const testCasePage = poManager.getTestCasePage();
  await testCasePage.VerifyTestCasePage();
});
test("Test Case 8: Verify All Products and product detail page", async ({
  page,
}) => {
  test.slow();
  const productsPage = poManager.getProductsPage();
  await productsPage.clickProducts();
  await productsPage.VerifyAllProductIsVisible();
  await productsPage.AllProductDetailsIsVisible();
  await productsPage.ViewProductAndVerifyDetails();
});
test("Test Case 9: Search Product", async () => {
  const searchProductName = "Sleeveless";
  const productsPage = poManager.getProductsPage();
  await productsPage.clickProducts();
  await productsPage.SearchProduct(searchProductName);
});
test("Test Case 10: Verify Subscription in home page", async ({ page }) => {
  const homePage = poManager.getHomePage();
  await homePage.Subscription("test@test.com");
});
test("Test Case 11: Verify Subscription in Cart page", async ({ page }) => {
  const cartPage = poManager.getCartPage();
  await cartPage.GoToCart();
  const homePage = poManager.getHomePage();
  await homePage.Subscription("test@test.com");
});
test("Test Case 12: Add Products in Cart", async ({ page }) => {
  const cartPage = poManager.getCartPage();
  await cartPage.addProductAndViewCart();
  await cartPage.verifyAllProductDetails();
});
