class CartPage{
    constructor(page){
        this.page=page
        this.btnViewCart=page.locator("[href*='view_cart']")

    }
    async GoToCart(){
        await this.btnViewCart.first().click()
    }

}
module.exports={CartPage}