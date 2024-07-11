const { test,expect } = require("@playwright/test")

class Contact_us{
    constructor(page){
        this.page=page
        this.btnContact_us=page.locator("[href*='contact_us']")
        this.getInTouch=page.locator(".contact-form .text-center")
        this.name=page.locator("[placeholder='Name']")
        this.email=page.locator("[name='email']")
        this.subject=page.locator("[name='subject']")
        this.message=page.locator("[name='message']")
        this.chooseFile=page.locator("[name='upload_file']")
        this.btnSubmit=page.locator("text='Submit'")
        this.status=page.locator(".status")
        this.btnHome=page.locator(".btn-success")
    }
    async EnterContact_usDetails(name,email,subject,message,path){
        await this.btnContact_us.click()
        await expect(this.getInTouch).toBeVisible()
        await this.name.fill(name)
        await this.email.fill(email)
        await this.subject.fill(subject)
        await this.message.fill(message)
        await this.chooseFile.setInputFiles(path)
        this.page.on('dialog',dialog=>dialog.accept())
        await this.btnSubmit.click()
        await expect(this.status).toBeVisible()
        await this.btnHome.click()
    
    }
   
}
module.exports={Contact_us}