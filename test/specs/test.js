import { expect, browser, $ } from '@wdio/globals'

describe('Saucedemo tests', () => {
    it('Perform Login', async () => {
        await browser.url('https://www.saucedemo.com')

        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()

        await $('.title').waitForDisplayed()
        await expect(await $('.title')).toHaveText('Products')
        await expect(await $('.shopping_cart_link')).toBeDisplayed()
        await expect(await $$('.inventory_item')).toBeElementsArrayOfSize({ gte: 1 })
    });

    it('Add product to the cart', async () => {

        await browser.url('https://www.saucedemo.com')

        //locators
        const username = $('#user-name');
        const password = $('#password');
        const loginButton = $('#login-button');
        const productCard = $$('.inventory_item');
        const productTitle = $('.inventory_item:nth-of-type(1) [class*="item_name"]');
        const addToCartButton = $('.inventory_item:nth-of-type(1) [data-test*="add-to-cart"]');
        const cartRoductsNumber = $('.shopping_cart_badge');
        const cartLink = $('.shopping_cart_link');
        const productInCartTitle = $('.cart_item  [class*="item_name"]');
        const removeProductButton = $('.cart_item [data-test*="remove"]');

        //login
        await username.setValue('standard_user')
        await password.setValue('secret_sauce')
        await loginButton.click()
        await expect(await productCard).toBeElementsArrayOfSize({ gte: 1 })

        //add product to cart
        const productName = await productTitle.getText()

        console.log("productName " + productName)
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

