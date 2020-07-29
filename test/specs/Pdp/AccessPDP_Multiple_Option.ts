import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import { productListingTestData } from '../../../resources/productListingTestData';
import { navigationTestData } from '../../../resources/navigationTestData';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import { logger } from '../../../config/winstonLogger';
import wishListPage from '../../../pageObjects/WishListPage';
import { wishlistTestData } from 'resources/wishlistTestData';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import assert from 'assert';
import { globalTestData } from '../../../resources/globalTestData';
import { productDescriptionTestData } from 'resources/productDescriptionTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate for PDP Access through Multiple options', () => {
  let userEmail: any = '';
  let email: any = '';
  let brandNameOnPDP = '';
  it('should navigate to PLP men section and click on first product to land on PDP', () => {
    logger.info('============= Men PLP  ================');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    brandNameOnPDP = productDescriptionPage.getTextName();
    const result = browser.waitUntil((): any => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    assert.equal(
      true,
      result,
      productDescriptionTestData.PDP_PAGE_LOADING_ERROR,
    );
    logger.info('User on Men PDP section');
  });
  it('should navigate to SALE PLP men section and click on first product to land on PDP', () => {
    logger.info('============= Men SALE PLP ================');
    navigationPage.clickOnMenOuterLink();
    logger.info('Sale Link Present : ' + navigationPage.isSaleLinkExist());
    assert.equal(
      navigationPage.isSaleLinkExist(),
      true,
      productListingTestData.Sale_Link_Display_Error,
    );
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    productListingPage.goToPlp(
      productListingTestData.sale_gender_male,
      productListingTestData.go_to_sale,
    );
    productListingPage.selectFirstProduct(
      productListingTestData.sale_gender_male,
      productListingTestData.go_to_sale,
    );
    const result = browser.waitUntil((): any => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    assert.equal(
      true,
      result,
      productDescriptionTestData.PDP_PAGE_LOADING_ERROR,
    );
    logger.info('User on Men SALE PDP section');
  });
  it('Should navigate to Women PLP section and select first product to land on PDP', () => {
    logger.info('============= Women PLP ================');
    browser.navigateTo(navigationTestData.WomensCategoryURL);
    productListingPage.clickFirstProduct();
    const result = browser.waitUntil((): any => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    assert.equal(
      true,
      result,
      productDescriptionTestData.PDP_PAGE_LOADING_ERROR,
    );
    logger.info('User on Women PDP section');
  });
  it('Should navigate to Women PLP section and select first product to land on PDP', () => {
    logger.info('============= Women SALE PLP ================');
    navigationPage.clickOnWomenOuterLink();
    logger.info('Sale Link Present : ' + navigationPage.isSaleLinkExist());
    assert.equal(
      navigationPage.isSaleLinkExist(),
      true,
      productListingTestData.Sale_Link_Display_Error,
    );
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    productListingPage.goToPlp(
      productListingTestData.sale_gender_female,
      productListingTestData.go_to_sale,
    );
    productListingPage.selectFirstProduct(
      productListingTestData.sale_gender_female,
      productListingTestData.go_to_sale,
    );
    const result = browser.waitUntil((): any => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    assert.equal(
      true,
      result,
      productDescriptionTestData.PDP_PAGE_LOADING_ERROR,
    );
    logger.info('User on Women SALE PDP section');
  });
  it('Should select Brand PLP to land on PDP', () => {
    logger.info('============= Brand PLP Section ================');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickOnBrandName(brandNameOnPDP);
    logger.info('User on Brand PLP section');
    const textCheck: any = browser.waitUntil((): any => {
      return productListingPage.checkBrandTitleText();
    }, 5000);
    logger.info('check Brand Title header is displayed === > ' + textCheck);
    const brandPlpName = productListingPage.getDisplayedBrandName();
    logger.info('check Displayed brand PLP Name === > ' + brandPlpName);
    productListingPage.clickFirstProduct();
    const result = browser.waitUntil((): any => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    assert.equal(
      true,
      result,
      productDescriptionTestData.PDP_PAGE_LOADING_ERROR,
    );
    logger.info('User on PDP section from Brand PLP Page');
  });
  it('Should land on PLP section and select category PLP to land on PDP', () => {
    logger.info('============ Category PLP Section ===============');
    navigationPage.clickOnMenOuterLink();
    navigationPage.clickShoeCategoryLink();
    logger.info('User on Men Category PLP section');
    const textCheck: any = browser.waitUntil((): any => {
      return productListingPage.checkBrandTitleText();
    }, 5000);
    logger.info('check Title header is displayed === > ' + textCheck);
    assert.equal(
      true,
      textCheck,
      productListingTestData.PLP_PAGE_LOADING_ERROR,
    );
    const brandPlpName = productListingPage.getDisplayedBrandName();
    logger.info('check Displayed Category PLP Name === > ' + brandPlpName);
    productListingPage.clickFirstProduct();
    const result = browser.waitUntil((): any => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    assert.equal(
      true,
      result,
      productDescriptionTestData.PDP_PAGE_LOADING_ERROR,
    );
    logger.info('User on Men PDP section from Category PLP section');
  });
  it('Should land on PLP section and select category and Brand PLP to land on PDP', () => {
    logger.info('=========== Brand and Category PLP Section ===========');
    navigationPage.clickOnMenOuterLink();
    navigationPage.clickShoeCategoryLink();
    logger.info('User on Men Category PLP section');
    productListingPage.clickOnBrandName(brandNameOnPDP);
    const textCheck: any = browser.waitUntil((): any => {
      return productListingPage.checkBrandTitleText();
    }, 5000);
    logger.info('check Title header is displayed === > ' + textCheck);
    assert.equal(
      true,
      textCheck,
      productListingTestData.PLP_PAGE_LOADING_ERROR,
    );
    const brandPlpName = productListingPage.getDisplayedBrandName();
    logger.info('check Displayed Category PLP Name === > ' + brandPlpName);
    productListingPage.clickFirstProduct();
    const result = browser.waitUntil((): any => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    assert.equal(
      true,
      result,
      productDescriptionTestData.PDP_PAGE_LOADING_ERROR,
    );
    logger.info('User on Men PDP section from Brand and Category PLP');
  });
  it('should take user to login/Signup page', () => {
    logger.info('============= Wishlist Scenario ==================');
    navigationPage.clickOnLoginLink();
    browser.waitUntil(
      () => {
        return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
      },
      5000,
      loginSignUpTestData.LOGIN_PAGE_LOADING_ERROR,
    );
    const url: string = browser.getUrl();
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
  it('should land on account details page and verify email id', () => {
    email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });
  it('Should navigate to product listing page click on first product and add to bag', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    productDescriptionPage.addToBag();
    productDescriptionPage.clickWishlistBtn();
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
    checkoutPage.closeAllNotification();
    wishListPage.clickWishListImageBtn();
    const result = browser.waitUntil((): any => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    assert.equal(
      true,
      result,
      productDescriptionTestData.PDP_PAGE_LOADING_ERROR,
    );
    logger.info('User Navigated to Men PDP section from Wishlist Page');
  });
  it('Should navigate to Home Page and perform Search PLP', () => {
    logger.info('============= Search PLP ==================');
    browser.navigateTo(navigationTestData.homepageURL);
    navigationPage.clickOnSearchLink();
    navigationPage.enterSearchInput(productListingTestData.search_plp_product);
    browser.keys('Enter');
    browser.waitUntil(() => {
      return productListingPage.firstProduct.isDisplayed();
    }, 5000);
    productListingPage.clickFirstProduct();
    logger.info('User Navigated to Men PDP section from Search PLP');
  });
});
