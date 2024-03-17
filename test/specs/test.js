import { expect, browser, $ } from '@wdio/globals'

describe('Saucedemo tests', () => {
    beforeEach(async () => {
        const username = $('#user-name');
        const password = $('#password');
        const loginButton = $('#login-button');
        const titleText = $('.title');

        await browser.url('/')
        await username.setValue('standard_user')
        await password.setValue('secret_sauce')
        await loginButton.click()
        await titleText.waitForDisplayed()
    });

    it('Perform Login test', async () => {
        const titleText = $('.title');
        const cartLink = $('.shopping_cart_link');
        const productCardList = $$('.inventory_item');

        await expect(await titleText).toHaveText('Products')
        await expect(await cartLink).toBeDisplayed('')
        await expect(await productCardList).toBeElementsArrayOfSize({ gte: 1 })
    });

    it('Add product to the cart test', async () => {
        const productTitle = $('.inventory_item:nth-of-type(1) [class*="item_name"]');
        const addToCartButton = $('.inventory_item:nth-of-type(1) [data-test*="add-to-cart"]');
        const cartRoductsNumber = $('.shopping_cart_badge');
        const cartLink = $('.shopping_cart_link');
        const productInCartTitle = $('.cart_item  [class*="item_name"]');
        const removeProductButton = $('.cart_item [data-test*="remove"]');

        //add product to cart
        const productName = await productTitle.getText()
        await (await addToCartButton).click()
        await expect(await cartRoductsNumber).toHaveText('1')

        //open cart
        await cartLink.click()
        await expect(await productInCartTitle).toHaveText(productName)

        //remove product from cart
        await removeProductButton.click()
        await expect(await productInCartTitle).not.toBeDisplayed()
    });
})

