import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import notification from '../../../methods/GetNotification';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import shoppingCartMethods from '../../../methods/ShoppingCartMethods';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe(
  'Validate as a guest user, should not be able to add more products' +
    ' to shopping bag beyond cart limit ',
  () => {
    let langArr: any = [];
    it('Should validate that user is not logged in', () => {
      navigationPage.clickOnLoginLink();
      const actualLoginHeading = loginPage.getLoginHeading();
      assert.equal(
        actualLoginHeading,
        loginSignUpTestData.Login_page_heading,
        loginSignUpTestData.Login_Page_Heading_Error,
      );
    });
    it('Should verify the email input field for signup is empty', () => {
      let signupEmailInp = loginPage.registerEmailInput.getAttribute('value');
      logger.info('Email Input Contents ' + signupEmailInp);
      if (
        signupEmailInp === '' ||
        signupEmailInp === null ||
        signupEmailInp === undefined
      ) {
        signupEmailInp = null;
      }
      expect(signupEmailInp).to.equal(null);
    });
    it('Should navigate to product listing page and click on first product', () => {
      langArr = browser.waitUntil(() => {
        return navigationPage.getLanguages();
      }, 5000);
      logger.info('Lang Arr ===> ' + langArr);
      navigationPage.clickOnMenOuterLink();
      productListingPage.clickFirstProduct();
    });
    it('Should add products to shopping bag till it reaches cart limit', () => {
      shoppingCartMethods.addShoppingCartLimitProducts(
        productDescriptionTestData.shoppinBag_cart_limit,
      );
    });
    it('Selecting language from language menu and adding a product to bag ', () => {
      browser.waitUntil(() => {
        return productDescriptionPage.wishlistBtn.isDisplayed();
      }, 5000);
      for (let index = 0; index < langArr.length; index += 1) {
        if (index > 0) {
          navigationPage.selectLanguage(index);
        }
        browser.waitUntil((): any => {
          return productDescriptionPage.getProductNameOnPDP();
        }, 5000);
        productDescriptionPage.addToBag();
        const actualAddToBagNotification = browser.waitUntil((): any => {
          return notification.getNotificationText();
        }, 5000);
        // Pipeline fix test by adding static wait
        browser.pause(500);
        checkoutPage.closeAllNotification();
        // Pipeline fix test by adding static wait
        browser.pause(500);
        logger.info(
          'Actual banner text displayed for Add to Bag is: ' +
            actualAddToBagNotification,
        );
        assert.equal(
          actualAddToBagNotification,
          productDescriptionTestData.cartLimitAssertions[index],
          productDescriptionTestData.Banner_Text_Error,
        );
      }
    });
  },
);
