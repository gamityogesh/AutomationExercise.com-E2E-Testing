const { CartPage } = require("./CartPage");
const { Contact_us } = require("./Contact_us");
const { HomePage } = require("./HomePage");
const { LoginPage } = require("./LoginPage");
const { ProductsPage } = require("./ProductsPage");
const { RegisterUserPage } = require("./RegisterUserPage");
const { TestCasesPage } = require("./TestCasesPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.registerUserPage = new RegisterUserPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.contact_us = new Contact_us(this.page);
    this.testCasePage = new TestCasesPage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.cartPage = new CartPage(this.page);
  }
  getHomePage() {
    return this.homePage;
  }
  getUserRegisterPage() {
    return this.registerUserPage;
  }
  getLoginPage() {
    return this.loginPage;
  }
  getContact_usPage() {
    return this.contact_us;
  }
  getTestCasePage() {
    return this.testCasePage;
  }
  getProductsPage() {
    return this.productsPage;
  }
  getCartPage() {
    return this.cartPage;
  }
}
module.exports = { POManager };
