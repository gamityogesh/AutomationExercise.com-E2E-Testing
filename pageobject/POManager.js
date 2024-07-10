const { HomePage } = require("./HomePage");
const { LoginPage } = require("./LoginPage");
const { RegisterUserPage } = require("./RegisterUserPage");

class POManager{
    constructor(page){
        this.page=page
        this.homePage =new HomePage(this.page)
        this.registerUserPage = new RegisterUserPage(this.page)
        this.loginPage =new LoginPage(this.page)
    }
    getHomePage(){
        return this.homePage;
    }
    getUserRegisterPage(){
        return this.registerUserPage;
    }
    getLoginPage(){
        return this.loginPage;
    }
}
module.exports={POManager}