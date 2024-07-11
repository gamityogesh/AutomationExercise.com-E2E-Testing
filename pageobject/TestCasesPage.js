const { expect } = require("@playwright/test")

class TestCasesPage{
    constructor(page){
        this.page=page
        this.btnTestCases=page.locator("[href*='test_cases']")
        this.testCase=page.locator("b")
    }
    async VerifyTestCasePage(){
        await this.btnTestCases.first().click()
        await expect(this.testCase).toBeVisible()

    }

}
module.exports={TestCasesPage}