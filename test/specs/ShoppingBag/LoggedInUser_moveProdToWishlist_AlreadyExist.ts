import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import notification from '../../../methods/GetNotification';
import wishListPage from '../../../pageObjects/WishListPage';
import helpers from '../../../utils/helpers';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { wishlistTestData } from '../../../resources/wishlistTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate logged-in user get notified on moving an item to Wishlist which is already exists ', () => {
  let wishListProductID: any;
  let shoppingBagProductID: any;

  let langArray: any = [];
  it('Should validate that user is logged in', () => {
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
  });
  it('Should navigate to product listing page and click on first product', () => {
    langArray = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });

  it('Should select size if product has more than one size and click Add to Wishlist', () => {
    // IF product is displayed with One size it will directly click on Add Wishlist button
    browser.waitUntil(() => {
      return productDescriptionPage.wishlistBtn.isEnabled();
    }, 5000);
    productDescriptionPage.addToWishList();
  });

  it('Should validate Added to Wishlist banner text is displayed  ', () => {
    const actualAddToWishlistNotification = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    checkoutPage.closeAllNotification();
    browser.pause(1000);
    logger.info(
      'Actual banner text displayed for Add to Wishlist is: ' +
        actualAddToWishlistNotification,
    );
    assert.equal(
      actualAddToWishlistNotification,
      productDescriptionTestData.ExpAddToWishListBanner,
      productDescriptionTestData.Banner_Text_Error,
    );
  });
  it('Should add product to shopping bag and validate success banner', () => {
    browser.waitUntil(() => {
      return productDescriptionPage.inWishListButton.isDisplayed();
    }, 5000);
    browser.waitUntil(() => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 3000);
    productDescriptionPage.clickAddToBag();
    const actualAddToBagNotification = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 3000);
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

  it('Should navigate to Shopping bag page and check product', () => {
    productDescriptionPage.clickCheckoutBtn();
    browser.waitUntil((): any => {
      return shoppingBagPage.getShoppingBagHeading();
    }, 2000);
    const productURLonShoppingBag = shoppingBagPage.extractProductUrlShoppingBag();
    shoppingBagProductID = helpers.getProductID(productURLonShoppingBag);
    logger.info('PRODUCT ID Shopping Bag :' + shoppingBagProductID);
  });

  it('Should navigate to Wishlist and ensure product is same as shopping bag', () => {
    navigationPage.clickOnWishlistLink();
    browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);
    const productURLonWishList = wishListPage.extractProdUrlOnWishList();
    wishListProductID = helpers.getProductID(productURLonWishList);
    logger.info('PRODUCT ID WISH LisT:' + wishListProductID);
    assert.equal(
      shoppingBagProductID,
      wishListProductID,
      wishlistTestData.WishListProductError,
    );
    navigationPage.clickOnshoppingbaglink();
    browser.waitUntil((): any => {
      return shoppingBagPage.getShoppingBagHeading();
    }, 2000);
  });

  it('Should click Move to wishlist link and validate banner text for selected language', () => {
    for (let index = 0; index < langArray.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
      }

      const NoOfShoppingBagProductBeforeMove = shoppingBagPage.getNumberOfShoppingBagProduct();
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
        shoppingBagTestData.MsgMoveProductToWishListAlreadyExist[index],
        productDescriptionTestData.Banner_Text_Error,
      );
      const shoppingBagHeading = browser.waitUntil((): any => {
        return shoppingBagPage.getShoppingBagHeading();
      }, 5000);
      logger.info('ShoppingBag Heading is :' + shoppingBagHeading);

      const NoOfShoppingBagProductAfterMove = browser.waitUntil((): any => {
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
