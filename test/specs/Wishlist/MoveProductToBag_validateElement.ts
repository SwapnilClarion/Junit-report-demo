import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import notification from '../../../methods/GetNotification';
import wishListPage from '../../../pageObjects/WishListPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import assert from 'assert';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { wishlistTestData } from 'resources/wishlistTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate move product from Wishlist to shopping bag and validate web elements ', () => {
  let NoOfShoppingBagProductBeforeMove: any = 0;
  let NoOfShoppingBagProductAfterMove: any = 0;
  let langArray: any = [];
  it('Should validate that user is not logged in', () => {
    assert.equal(
      loginPage.isLoginLinkExist(),
      true,
      loginSignUpTestData.Login_Link_Display_Error,
    );
  });
  it('Should complete registration', () => {
    const userEmail = randomData.GUEST_EMAIL;
    navigationPage.clickOnLoginLink();
    signupMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );
    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);
    langArray = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
  });
  it('Should navigate to wishlist and ensure wishlist is empty', () => {
    navigationPage.clickOnWishlistLink();
    browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);
    const containerSize = wishListPage.getContainerSize();
    logger.info('Wishlist product size: ' + containerSize);
    expect(containerSize).to.be.equal(0);
  });
  it('Should navigate to product listing page and add product to wishlist and return to wishlist', () => {
    navigationPage.clickOnWomenOuterLink();
    const numberOfProductsAdded = productDescriptionPage.addNumberProductToWishList(
      langArray.length,
    );
    logger.info(
      'Total number of products added to wishList are: ' +
        numberOfProductsAdded,
    );
    navigationPage.clickOnWishlistLink();
    browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);
  });
  it('Should validate presence of webelement, move product to bag, banner Text Displayed', () => {
    for (let index = 0; index < langArray.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
      }

      // Validate presence of Add to Bag Button and validate text as per language
      const addToBagButtonStatus = wishListPage.isAddToBagOnWishlistDisplayed();
      expect(addToBagButtonStatus).to.equal(true);
      const addToBagText = wishListPage.getAddToBagButtonText();
      logger.info(
        'Add to Bag button Text for selected language is: ' + addToBagText,
      );
      assert.equal(
        addToBagText,
        wishlistTestData.addToBagButtonText[index],
        wishlistTestData.addToBagTextError,
      );

      // Validate presence of Remove link and validate text as per language
      const removeLinkStatus = wishListPage.isRemoveLinkDisplayed();
      expect(removeLinkStatus).to.equal(true);
      const removeLinkText = wishListPage.getRemoveLinkText();
      logger.info(
        'Remove link Text for selected language is: ' + removeLinkText,
      );
      assert.equal(
        removeLinkText,
        wishlistTestData.removeLinkText[index],
        wishlistTestData.removeLinkTextError,
      );

      // Number of shopping bag product before move
      NoOfShoppingBagProductBeforeMove = shoppingBagPage.getNumberOfShoppingBagProduct();
      logger.info(
        'Number of shopping bag product before clicking Add to Bag: ' +
          NoOfShoppingBagProductBeforeMove,
      );

      // Validate banner text for add to Bag as per language
      wishListPage.clickAddToBagButton();
      const actualNotificationMoveToWishlist = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      logger.info(
        'Actual banner text displayed for Add to Bag: ' +
          actualNotificationMoveToWishlist,
      );
      checkoutPage.closeAllNotification();
      // Static wait added as banner is masked over shopping bag and need to wait till it get closed
      browser.pause(1000);
      assert.equal(
        actualNotificationMoveToWishlist,
        productDescriptionTestData.message_array[index],
        productDescriptionTestData.Banner_Text_Error,
      );

      // Get Number of shopping bag product after move
      NoOfShoppingBagProductAfterMove = browser.waitUntil((): any => {
        return shoppingBagPage.getNumberOfShoppingBagProduct();
      }, 5000);
      logger.info(
        'Number of shopping bag product after clicking Add to Bag: ' +
          NoOfShoppingBagProductAfterMove,
      );

      // Validate shpping bag product is increased after move
      expect(NoOfShoppingBagProductAfterMove).to.be.greaterThan(
        NoOfShoppingBagProductBeforeMove,
      );
      // Validate presence of Checkout button and validate text as per language
      const checkoutButtonStatus = wishListPage.isCheckoutButtonDisplayed();
      expect(checkoutButtonStatus).to.equal(true);
      const checkoutButtonText = wishListPage.getCheckoutButtonText();
      logger.info(
        'Checkout button Text for selected language is: ' + checkoutButtonText,
      );
      assert.equal(
        checkoutButtonText,
        wishlistTestData.checkoutbuttonText[index],
        wishlistTestData.checkoutButtonTextErrorOnWishlist,
      );

      // Validate Moved to Bag Text is displayed as per language
      const movedToBagText = wishListPage.getMovedToBagText();
      logger.info(
        'Moved to Bag Text for selected language is: ' + movedToBagText,
      );
      assert.equal(
        movedToBagText,
        wishlistTestData.movedToBagText[index],
        wishlistTestData.movedToBagTextErrorOnWishlist,
      );
      logger.info('===================================================');
    }
  });
});
