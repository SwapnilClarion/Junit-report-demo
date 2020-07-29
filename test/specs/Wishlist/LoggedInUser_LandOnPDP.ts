import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import wishListPage from '../../../pageObjects/WishListPage';
import helpers from '../../../utils/helpers';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import notification from '../../../methods/GetNotification';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { wishlistTestData } from 'resources/wishlistTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate if redirected user to login page from PDP should land on PDP after login ', () => {
  let PDPProductBeforeLogin: any;
  let PDPProductAfterLogin: any;
  let ProductSizeBeforeLogin: any;
  let ProductSizeAfterLogin: any;
  it('Should validate that user is not logged in', () => {
    assert.equal(
      loginPage.isLoginLinkExist(),
      true,
      loginSignUpTestData.Login_Link_Display_Error,
    );
  });
  it('Should navigate to product listing page click on first product', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });
  it('Should select size if product has more than one size and click Add to Wishlist', () => {
    // IF product is displayed with One size it will directly click on Add Wishlist button
    browser.waitUntil(() => {
      return productDescriptionPage.wishlistBtn.isEnabled();
    }, 5000);

    PDPProductBeforeLogin = helpers.getProductID(browser.getUrl());
    logger.info('PROD ID ON PDP before login:' + PDPProductBeforeLogin);

    const OneSizeButtonValue = productDescriptionPage.isOneSizeButtonExist();
    logger.info('ONE SIZE button displayed: ' + OneSizeButtonValue);

    if (OneSizeButtonValue === false) {
      const sizeCheck: any = browser.waitUntil(() => {
        return productDescriptionPage.selectSize();
      }, 5000);
      productDescriptionPage.addSize(sizeCheck);

      ProductSizeBeforeLogin = sizeCheck;
      logger.info('Product SIZE on PDP before login ' + ProductSizeBeforeLogin);
      productDescriptionPage.clickWishlistBtn();
    } else {
      productDescriptionPage.clickWishlistBtn();
    }
  });

  it('Should redirect user on login page ', () => {
    browser.waitUntil(() => {
      return loginPage.getLoginHeading();
    }, 5000);

    assert.equal(
      loginPage.getLoginHeading(),
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });

  it('Should validate banner message ', () => {
    const actualBannerText = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    checkoutPage.closeAllNotification();
    logger.info(
      'Actual Banner text displayed on login page is :' + actualBannerText,
    );
    assert.equal(
      actualBannerText,
      loginSignUpTestData.Exp_Banner_Text_WishList,
      productDescriptionTestData.Banner_Text_Error,
    );
    checkoutPage.closeAllNotification();
  });

  it('Should login and validate user is landed on PDP of same product which is added to wishlist ', () => {
    signupMethod.login(
      loginSignUpTestData.EMAIL_ID,
      loginSignUpTestData.PASSWORD,
    );

    browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    checkoutPage.closeAllNotification();
    const addToBagButtonStatus = browser.waitUntil(() => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    assert.equal(
      addToBagButtonStatus,
      true,
      productDescriptionTestData.RemainOnPDP_onWishListClick_Error,
    );

    PDPProductAfterLogin = helpers.getProductID(browser.getUrl());
    logger.info(
      'PROD ID ON PDP after successful login :' + PDPProductAfterLogin,
    );

    assert.equal(
      PDPProductBeforeLogin,
      PDPProductAfterLogin,
      productDescriptionTestData.PDPProductError,
    );
  });

  it('Should validate Wish list button text is IN WISHLIST', () => {
    const ActualWishListButtonText = browser.waitUntil((): any => {
      return productDescriptionPage.getWishlistButtonText();
    }, 5000);
    assert.equal(
      ActualWishListButtonText,
      productDescriptionTestData.Expected_WishListButton_Text,
      productDescriptionTestData.WishListButtonTextError,
    );
  });

  it('Should validate Product size is same as selected for wish list', () => {
    ProductSizeAfterLogin = productDescriptionPage.selectSize();
    logger.info(
      'Product size on PDP after successful login' + ProductSizeAfterLogin,
    );
    assert.equal(
      ProductSizeBeforeLogin,
      ProductSizeAfterLogin,
      productDescriptionTestData.WishListButtonTextError,
    );
  });

  it('Should go to Wishlist page and remove product ', () => {
    navigationPage.clickOnWishlistLink();
    const ActualWishListHeading = browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);
    assert.equal(
      ActualWishListHeading,
      wishlistTestData.Exp_WishList_Heading,
      wishlistTestData.WishListHeading_Error,
    );
    wishListPage.removeWishListProduct();
    const bannerTextRemoveProduct = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    logger.info('Banner text for product remove : ' + bannerTextRemoveProduct);
    checkoutPage.closeAllNotification();
    assert.equal(
      wishListPage.getEmptyWishlistText(),
      wishlistTestData.emptyWishListText,
      wishlistTestData.emptyWishListTextError,
    );
  });
});
