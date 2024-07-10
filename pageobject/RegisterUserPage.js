const { test,expect } = require('@playwright/test')
class RegisterUserPage{
    constructor(page){
        this.page=page
        this.btnLogin=page.locator("[href*='login']")
        this.userName=page.locator("[placeholder='Name']")
        this.emailAddress= page.locator("[placeholder='Email Address']").last()
        this.btnSignup=page.locator("[data-qa='signup-button']")
        this.label=page.locator(".signup-form h2")
        this.accountInfo=page.locator("text='Enter Account Information'") 
        this.title=page.locator("#id_gender1").last()
        this.name=page.locator("#name")  
        this.email=page.locator("#email")
        this.password=page.locator("#password")
        this.days=page.locator("#days")
        this.months=page.locator("#months")
        this.year=page.locator("#years")
        this.newsLetter =page.locator("#newsletter")
        this.specialOffer=page.locator("#optin")
        this.enterAccInfo=page.locator(".login-form h2").first()
        this.enterAddInfo=page.locator(".login-form h2").last()
        this.firstName=page.locator("#first_name")
        this.lastName=page.locator("#last_name")
        this.company=page.locator("#company")
        this.address1=page.locator("#address1")
        this.address2=page.locator("#address2")
        this.country=page.locator("#country")
        this.state=page.locator("#state")
        this.city=page.locator("#city")
        this.zipCode=page.locator("#zipcode")
        this.mobileNumber=page.locator("#mobile_number")
        this.createAccount=page.locator("[data-qa='create-account']")
        this.accountCreateLabel=page.locator("h2 b")
        this.btnContinue=page.locator(".btn-primary")
        this.loggedInAs=page.locator('text= Logged in as ')
        this.btnDelete=page.locator("[href*='delete_account']")
        this.textDelete=page.locator("h2 b")

    }
    async NewUserSignup(userName,email){
        await this.btnLogin.click()
        await expect(this.label).toBeVisible()
        await this.userName.fill(userName)
        await this.emailAddress.fill(email)
        await this.btnSignup.click()
    }
    async EnterAccountInformation(userName,email,password,day,month,year){
        await expect(this.enterAccInfo).toBeVisible()
        await this.title.check()
        await expect(this.name).toHaveValue(userName)
        await expect(this.email).toHaveValue(email)
        await this.password.fill(password)
        await this.days.selectOption(day)
        await this.months.selectOption(month)
        await this.year.selectOption(year)
        await this.newsLetter.check()
        await this.specialOffer.check()
    }
    async AddressInformation(fname,lname,compony,add1,add2,country,state,city,zipCode,mobileNo){
        await expect(this.enterAddInfo).toBeVisible()
        await this.firstName.fill(fname)
        await this.lastName.fill(lname)
        await this.company.fill(compony)
        await this.address1.fill(add1)
        await this.address2.fill(add2)
        await this.country.selectOption(country)
        await this.state.fill(state)
        await this.city.fill(city)
        await this.zipCode.fill(zipCode)
        await this.mobileNumber.fill(mobileNo)

    }
    async CreateAccount(){
        await this.createAccount.click()
        await expect(this.accountCreateLabel).toBeVisible()
        await this.btnContinue.click()
        await expect(this.loggedInAs).toBeVisible()
    }
    async DeleteAccount(){
        await this.btnDelete.click()
        await expect(this.textDelete).toBeVisible()
        await this.btnContinue.click()
    }
}
module.exports ={RegisterUserPage}