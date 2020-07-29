import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import wishListPage from '../../../pageObjects/WishListPage';
import { randomData } from '../../../utils/random_data';
import helpers from '../../../utils/helpers';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { wishlistTestData } from 'resources/wishlistTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate if logged in user is able to add product to wishlist ', () => {
  let productIdOnPDP: any = '';
  let productIdOnWishlist: any = '';
  it('Should validate that user is not logged in', () => {
    assert.equal(
      loginPage.isLoginLinkExist(),
      true,
      loginSignUpTestData.Login_Link_Display_Error,
    );
  });

  let userEmail = '';
  it('should take user to login/Signup page', () => {
    navigationPage.clickOnLoginLink();
    browser.waitUntil(
      () => {
        return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
      },
      5000,
      loginSignUpTestData.LOGIN_PAGE_LOADING_ERROR,
    );
    const url = browser.getUrl();
    expect(url).to.include(loginSignUpTestData.LOGIN_URL);
  });
  it('should perform signup process and land on account details page', () => {
    userEmail = randomData.GUEST_EMAIL;
    if (
      loginPage.viewNotificationMsg() !==
      loginSignUpTestData.Login_SameEmail_Error
    ) {
      signupMethod.signup(
        userEmail,
        randomData.USER_PASSWORD,
        loginSignUpTestData.NO_THANKS_PROMO,
      );
    }
  });
  it('should land on account details page and verify emailid ', () => {
    const email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
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

    productIdOnPDP = helpers.getProductID(browser.getUrl());
    logger.info('PROD ID ON PDP:' + productIdOnPDP);

    const OneSizeButtonValue = productDescriptionPage.isOneSizeButtonExist();
    logger.info('ONE SIZE button displayed: ' + OneSizeButtonValue);

    if (OneSizeButtonValue === false) {
      const sizeCheck: any = browser.waitUntil(() => {
        return productDescriptionPage.selectSize();
      }, 5000);
      productDescriptionPage.addSize(sizeCheck);
    }
    productDescriptionPage.clickWishlistBtn();
  });

  it('Should validate that user remain on PDP page ', () => {
    assert.equal(
      productDescriptionPage.isAddToBagButtonExist(),
      true,
      productDescriptionTestData.RemainOnPDP_onWishListClick_Error,
    );
  });

  it('Should validate presence of banner  ', () => {
    const actualBannerText = loginPage.getNotificationForWishList();
    logger.info(
      'Actual Banner text displayed on PDP page is: ' + actualBannerText,
    );

    assert.equal(
      actualBannerText,
      productDescriptionTestData.ExpAddToWishListBanner,
      productDescriptionTestData.Banner_Text_Error,
    );
  });

  it('Should validate Wish list button text ', () => {
    const ActualWishListButtonText = browser.waitUntil((): any => {
      return productDescriptionPage.getWishlistButtonText();
    }, 5000);
    assert.equal(
      ActualWishListButtonText,
      productDescriptionTestData.Expected_WishListButton_Text,
      productDescriptionTestData.WishListButtonTextError,
    );
  });

  it('Should redirect user on WishList page on clicking WishList top nav menu', () => {
    productDescriptionPage.clickWishListNavMenu();
    const ActualWishListHeading = browser.waitUntil((): any => {
      return wishListPage.getWishlistHeading();
    }, 5000);

    assert.equal(
      ActualWishListHeading,
      wishlistTestData.Exp_WishList_Heading,
      wishlistTestData.WishListHeading_Error,
    );
  });

  it('Should validate product on wishlist is same as added from PDP ', () => {
    const productURLonWishList = wishListPage.extractProdUrlOnWishList();
    productIdOnWishlist = helpers.getProductID(productURLonWishList);
    logger.info('PRODUCT ID ON WISH LisT:' + productIdOnWishlist);

    assert.equal(
      productIdOnPDP,
      productIdOnWishlist,
      wishlistTestData.WishListProductError,
    );
  });
});
