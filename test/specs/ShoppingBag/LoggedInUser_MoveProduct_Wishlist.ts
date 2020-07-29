import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import notification from '../../../methods/GetNotification';
import wishListPage from '../../../pageObjects/WishListPage';
import helpers from '../../../utils/helpers';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate as a logged in user, should be able to move product from shopping bag to Wishlist ', () => {
  let NoOfShoppingBagProductBeforeMove: any = 0;
  let NoOfShoppingBagProductAfterMove: any = 0;
  let ShoppingBagProductID: any;
  let WishListProductID: any;
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
  });
  it('Should navigate to product listing page and click on first product', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });
  it('Should select size if product has more than one size and click Add to Bag and validate banner', () => {
    // IF product is displayed with One size it will directly click on Add to Bag button
    productDescriptionPage.addToBag();
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

  it('Should navigate to Shopping bag page ', () => {
    productDescriptionPage.clickCheckoutBtn();
    browser.waitUntil((): any => {
      return shoppingBagPage.getShoppingBagHeading();
    }, 5000);

    NoOfShoppingBagProductBeforeMove = shoppingBagPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of shopping bag product before moving to wishlist: ' +
        NoOfShoppingBagProductBeforeMove,
    );
    const productURLonShoppingBag = shoppingBagPage.extractProductUrlShoppingBag();
    ShoppingBagProductID = helpers.getProductID(productURLonShoppingBag);
    logger.info('PROD ID Shopping Bag :' + ShoppingBagProductID);
  });

  it('Should go to wishlist to ensure it is empty and return back to Shopping bag', () => {
    navigationPage.clickOnWishlistLink();
    browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);
    expect(wishListPage.getContainerSize()).to.be.equal(0);
    navigationPage.clickOnshoppingbaglink();
    browser.waitUntil((): any => {
      return shoppingBagPage.getShoppingBagHeading();
    }, 5000);
  });

  it('Should click on Move to wishlist link and validate success banner text', () => {
    shoppingBagPage.clickMoveToWishListLink();
    const actualNotificationMoveToWishlist = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);

    logger.info(
      'Actual banner text displayed for move to wishlist: ' +
        actualNotificationMoveToWishlist,
    );
    checkoutPage.closeAllNotification();
    assert.equal(
      actualNotificationMoveToWishlist,
      productDescriptionTestData.ExpAddToWishListBanner,
      productDescriptionTestData.Banner_Text_Error,
    );

    NoOfShoppingBagProductAfterMove = shoppingBagPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of shopping bag product after moving to wishlist: ' +
        NoOfShoppingBagProductAfterMove,
    );
    assert.equal(
      NoOfShoppingBagProductAfterMove,
      NoOfShoppingBagProductBeforeMove - 1,
      shoppingBagTestData.ShoppingBagProductError,
    );
    // only solution found to make the script working on jenkins pipeline
    browser.pause(1000);

    const actualEmptyShoppingBagText = browser.waitUntil((): any => {
      return shoppingBagPage.getEmptyShoppingBagText();
    }, 5000);
    logger.info(
      'Actual banner text displayed for empty to wishlist: ' +
        actualEmptyShoppingBagText,
    );
    assert.equal(
      actualEmptyShoppingBagText,
      shoppingBagTestData.ExpectedEmptyShoppingBagText,
      shoppingBagTestData.EmptyShoppingBagTextError,
    );
  });

  it('Should go to wishlist and validate the product', () => {
    navigationPage.clickOnWishlistLink();
    browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);

    expect(wishListPage.getContainerSize()).to.be.greaterThan(0);
    const productURLonWishList = wishListPage.extractProdUrlOnWishList();
    WishListProductID = helpers.getProductID(productURLonWishList);
    logger.info('PROD ID Wishlist :' + WishListProductID);
    assert.equal(
      ShoppingBagProductID,
      WishListProductID,
      shoppingBagTestData.ShoppingBagProductError,
    );
  });
});
