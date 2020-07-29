import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import wishListPage from '../../../pageObjects/WishListPage';
import helpers from '../../../utils/helpers';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import notification from '../../../methods/GetNotification';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { wishlistTestData } from 'resources/wishlistTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate if registered user land on PDP and remove Wishlist product via PDP Page ', () => {
  let PDPProductBeforeRegister: any;
  let PDPProductAfterRegister: any;
  let ProductSizeBeforeRegister: any;
  let ProductSizeAfterRegister: any;
  let productIdOnWishlist: any;
  it('Should validate that user is not logged in', () => {
    assert.equal(
      loginPage.isLoginLinkExist(),
      true,
      loginSignUpTestData.Login_Link_Display_Error,
    );
  });
  it('Should navigate to product listing page and click on first product', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });
  it('Should select size if product has more than one size and click Add to Wishlist', () => {
    // IF product is displayed with One size it will directly click on Add Wishlist button
    browser.waitUntil(() => {
      return productDescriptionPage.wishlistBtn.isEnabled();
    }, 5000);

    PDPProductBeforeRegister = helpers.getProductID(browser.getUrl());
    logger.info('PROD ID PDP before registration:' + PDPProductBeforeRegister);

    ProductSizeBeforeRegister = productDescriptionPage.selectSize();
    logger.info(
      'Product SIZE on PDP before register ' + ProductSizeBeforeRegister,
    );
    productDescriptionPage.addToWishList();
  });
  it('Should redirect user on login/SignUp page and validate banner text ', () => {
    const actualSignUpHeading = browser.waitUntil((): any => {
      return loginPage.getSignUpHeading();
    }, 5000);

    assert.equal(
      actualSignUpHeading,
      loginSignUpTestData.ExpectedSignUpHeading,
      loginSignUpTestData.SignUpHeadingError,
    );
    const actualBannerText = loginPage.getNotificationForWishList();
    logger.info(
      'Actual Banner text displayed on signup page is :' + actualBannerText,
    );
    assert.equal(
      actualBannerText,
      loginSignUpTestData.Exp_Banner_Text_WishList,
      productDescriptionTestData.Banner_Text_Error,
    );
    checkoutPage.closeAllNotification();
  });
  it('should perform signup process', () => {
    if (
      loginPage.viewNotificationMsg() !==
      loginSignUpTestData.Login_SameEmail_Error
    ) {
      signupMethod.signup(
        randomData.GUEST_EMAIL,
        randomData.USER_PASSWORD,
        loginSignUpTestData.NO_THANKS_PROMO,
      );
    }
  });
  it('Should validate banner text "Added to Wishlist" is displayed  ', () => {
    browser.pause(5000);
    const actualBannerTextPDP = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);

    logger.info(
      'Actual Banner text displayed on PDP page is: ' + actualBannerTextPDP,
    );

    assert.equal(
      actualBannerTextPDP,
      productDescriptionTestData.ExpAddToWishListBanner,
      productDescriptionTestData.Banner_Text_Error,
    );
    if (checkoutPage.notification.isDisplayed()) {
      checkoutPage.closeAllNotification();
    } else {
      checkoutPage.notification.waitForDisplayed(5000);
      checkoutPage.closeAllNotification();
    }
  });
  it('should validate product on PDP is same as selected for wish list ', () => {
    PDPProductAfterRegister = browser.waitUntil(() => {
      return helpers.getProductID(browser.getUrl());
    }, 5000);
    logger.info(
      'PROD ID PDP after user registration :' + PDPProductAfterRegister,
    );

    assert.equal(
      PDPProductBeforeRegister,
      PDPProductAfterRegister,
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
    ProductSizeAfterRegister = productDescriptionPage.selectSize();
    logger.info(
      'Product size on PDP after user Registration' + ProductSizeAfterRegister,
    );
    assert.equal(
      ProductSizeBeforeRegister,
      ProductSizeAfterRegister,
      productDescriptionTestData.WishListButtonTextError,
    );
  });
  it('Should go to Wishlist page and validate product ', () => {
    navigationPage.clickOnWishlistLink();
    const ActualWishListHeading = browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);
    assert.equal(
      ActualWishListHeading,
      wishlistTestData.Exp_WishList_Heading,
      wishlistTestData.WishListHeading_Error,
    );
    const productURLonWishList = wishListPage.extractProdUrlOnWishList();
    productIdOnWishlist = helpers.getProductID(productURLonWishList);
    logger.info('PRODUCT ID ON WISH LisT:' + productIdOnWishlist);

    assert.equal(
      PDPProductBeforeRegister,
      productIdOnWishlist,
      wishlistTestData.WishListProductError,
    );
  });
  it('Should click browser back button and land on PDP ', () => {
    browser.back();
    assert.equal(
      productDescriptionPage.isAddToBagButtonExist(),
      true,
      productDescriptionTestData.LandingOnPDPError,
    );
  });
  it('Should select the same size for product and click In Wishlist button ', () => {
    productDescriptionPage.addSize(ProductSizeBeforeRegister);
    // }
    const ActualWishListButtonText = browser.waitUntil((): any => {
      return productDescriptionPage.getWishlistButtonText();
    }, 5000);
    assert.equal(
      ActualWishListButtonText,
      productDescriptionTestData.Expected_WishListButton_Text,
      productDescriptionTestData.WishListButtonTextError,
    );
    productDescriptionPage.clickInWishlistButton();
  });
  it('Should validate success banner text for product removal ', () => {
    const actualBannerTextProductRemoval = loginPage.getNotificationForWishList();
    logger.info(
      'Actual Banner text after removing product via PDP :' +
        actualBannerTextProductRemoval,
    );
    assert.equal(
      actualBannerTextProductRemoval,
      productDescriptionTestData.ExpBannerTextProductRemovalPDP,
      productDescriptionTestData.Banner_Text_Error,
    );
    checkoutPage.closeAllNotification();
  });
  it('Should validate user remain on PDP ', () => {
    assert.equal(
      productDescriptionPage.isAddToBagButtonExist(),
      true,
      productDescriptionTestData.RemainOnPDP_onWishListClick_Error,
    );
  });
  it('Should validate In Wishlist button text changed to Add to Wishlist ', () => {
    const ActualWishListButtonText = productDescriptionPage.getAddtoWishListButtonText();
    logger.info(
      'Wishlist button text after removing product via PDP: ' +
        ActualWishListButtonText,
    );
    assert.equal(
      ActualWishListButtonText,
      productDescriptionTestData.ExpAddToWishlistButtonText,
      productDescriptionTestData.WishListButtonTextError,
    );
  });
  it('Should go to Wishlist and validate product is removed ', () => {
    navigationPage.clickOnWishlistLink();
    browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);
    const containerSize = wishListPage.getContainerSize();
    expect(containerSize).to.be.equal(0);
  });
});
