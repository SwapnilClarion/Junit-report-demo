import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import notification from '../../../methods/GetNotification';
import wishListPage from '../../../pageObjects/WishListPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { wishlistTestData } from 'resources/wishlistTestData';
import { navigationTestData } from '../../../resources/navigationTestData';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate user should not be able to add more products to Wishlist than the set Wishlist-limit ', () => {
  let NoOfShoppingBagProductBeforeMove: any = 0;
  let NoOfShoppingBagProductAfterMove: any = 0;
  let langArray: any = [];
  it('Should validate that user is logged in', () => {
    assert.equal(
      loginPage.isLoginLinkExist(),
      true,
      loginSignUpTestData.Login_Link_Display_Error,
    );
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
  it('Should navigate to PDP page and add 15 products to Wishlist and validate with wishlist product', () => {
    navigationPage.clickOnMenOuterLink();
    const totalProductAddedFromPDP = productDescriptionPage.addMultipleProductToWishList();
    navigationPage.clickOnWishlistLink();
    browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);

    const TotalProductInWishlist = browser.waitUntil((): any => {
      return wishListPage.getContainerSize();
    }, 5000);
    logger.info(
      'Total number of products on wishList are: ' + TotalProductInWishlist,
    );
    assert.equal(
      totalProductAddedFromPDP,
      TotalProductInWishlist,
      wishlistTestData.numberOfProductErrorWishList,
    );
  });
  it('Should navigate to Product listing select product and add to shopping Bag', () => {
    browser.navigateTo(navigationTestData.WomensCategoryURL);
    productListingPage.clickFirstProduct();
    browser.waitUntil(() => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    productDescriptionPage.addToBag();
    notification.getNotificationText();
    checkoutPage.closeAllNotification();
  });

  it('Should navigate to shopping Bag page', () => {
    productDescriptionPage.clickCheckoutBtn();
    browser.waitUntil((): any => {
      return shoppingBagPage.getShoppingBagHeading();
    }, 5000);
  });

  it('Should click Move to wishlist link and validate banner text for selected language', () => {
    for (let index = 0; index < langArray.length; index += 1) {
      if (index > 0) {
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
      }, 5000);
      logger.info(
        'Actual banner text displayed for move to wishlist: ' +
          actualNotificationMoveToWishlist,
      );
      checkoutPage.closeAllNotification();
      browser.pause(1000);
      assert.equal(
        actualNotificationMoveToWishlist,
        shoppingBagTestData.MsgWishlistFull[index],
        productDescriptionTestData.Banner_Text_Error,
      );
      const shoppingBagHeading = browser.waitUntil((): any => {
        return shoppingBagPage.getShoppingBagHeading();
      }, 5000);
      logger.info('ShoppingBag Heading is :' + shoppingBagHeading);

      NoOfShoppingBagProductAfterMove = browser.waitUntil((): any => {
        return shoppingBagPage.getNumberOfShoppingBagProduct();
      }, 3000);
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
