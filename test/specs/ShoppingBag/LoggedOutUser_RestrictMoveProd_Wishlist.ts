import productListingPage from '../../../pageObjects/ProductListingPage';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import notification from '../../../methods/GetNotification';
import navigationPage from '../../../pageObjects/NavigationPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import loginPage from '../../../pageObjects/LoginPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate that logged out user should not be able to move shopping bag product to wishlist', () => {
  let NoOfShoppingBagProductBeforeMove: any = 0;
  let NoOfShoppingBagProductAfterMove: any = 0;
  let langArray: any = [];

  it('Should validate that user is not logged in', () => {
    navigationPage.clickOnLoginLink();
    const actualLoginHeading = browser.waitUntil(() => {
      return loginPage.getLoginHeading();
    }, 5000);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });
  it('Should navigate to PDP and add product to shopping bag', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    browser.waitUntil(() => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    productDescriptionPage.addToBag();
  });
  it('Should validate banner text for Add to Bag', () => {
    const actualAddToBagNotification = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    checkoutPage.closeAllNotification();
    logger.info(
      'Actual banner text displayed for Add to Bag is: ' +
        actualAddToBagNotification,
    );

    assert.equal(
      actualAddToBagNotification,
      productDescriptionTestData.message_array[0],
      productDescriptionTestData.Banner_Text_Error,
    );
  });
  it('Should navigate to Shopping bag page', () => {
    productDescriptionPage.clickCheckoutBtn();
    browser.waitUntil((): any => {
      return shoppingBagPage.getShoppingBagHeading();
    }, 5000);
  });

  it('Should click Move to wishlist link and validate banner text for selected language', () => {
    langArray = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);

    for (let index = 0; index < langArray.length; index += 1) {
      if (index >= 0) {
        navigationPage.selectLanguage(index);
      }

      NoOfShoppingBagProductBeforeMove = shoppingBagPage.getNumberOfShoppingBagProduct();
      logger.info(
        'Number of shopping bag product before clicking Move to Wishlist: ' +
          NoOfShoppingBagProductBeforeMove,
      );

      shoppingBagPage.clickMoveToWishListLink();

      const actualNotificationMoveToWishlist = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 2000);
      logger.info(
        'Actual banner text displayed for move to wishlist: ' +
          actualNotificationMoveToWishlist,
      );
      checkoutPage.closeAllNotification();
      assert.equal(
        actualNotificationMoveToWishlist,
        loginSignUpTestData.MsgMoveProductToWishListLoggedOutUser[index],
        productDescriptionTestData.Banner_Text_Error,
      );
      const shoppingBagHeading = browser.waitUntil((): any => {
        return shoppingBagPage.getShoppingBagHeading();
      }, 3000);
      logger.info('ShoppingBag Heading is :' + shoppingBagHeading);

      NoOfShoppingBagProductAfterMove = browser.waitUntil((): any => {
        return shoppingBagPage.getNumberOfShoppingBagProduct();
      }, 2000);
      logger.info(
        'Number of shopping bag product after clicking Move to wishlist: ' +
          NoOfShoppingBagProductAfterMove,
      );
      assert.equal(
        NoOfShoppingBagProductAfterMove,
        NoOfShoppingBagProductBeforeMove,
        shoppingBagTestData.ShoppingBagProductError,
      );
      logger.info('====================================================');
    }
  });
});
