import mobileNavigationPage from '../../../pageObjects/mobile/NavigationPage';
import mobileProductDescriptionPage from '../../../pageObjects/mobile/ProductDescriptionPage';
import mobileProductListingPage from '../../../pageObjects/mobile/ProductListingPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productDescriptionTestData } from '../../../resources/mobile/productDescriptionTestData';
import { globalTestData } from '../../../resources/globalTestData';
import { expect } from 'chai';
globalTestData.FILE_PATH = __filename;
describe('Validate that user is able to see newsletter sign-up section on a sold out product ', () => {
  let userEmail: any = '';
  let email: any = '';
  let brandName: any = '';
  it('Should validate that user is not logged in', () => {
    logger.info(
      '=================Guest/Logged Out User========================',
    );
    mobileNavigationPage.clickMobileAccountLink();
    const actualLoginHeading: any = browser.waitUntil((): any => {
      return loginPage.getLoginHeading();
    }, 5000);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });
  it('Should navigate to PLP and select product', () => {
    mobileNavigationPage.clickMobileMainMenu();

    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileMenLink.isDisplayed();
    }, 5000);
    browser.setCookies({ name: 'is_new_pdp_mobile', value: 'new' });
    mobileNavigationPage.clickMobileMenLink();
    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileTrending.isDisplayed();
    }, 5000);
    mobileNavigationPage.clickMobileTrending();
    mobileProductListingPage.clickFourthProduct();
    logger.info('Clicked on sold out product');
  });
  it('Should validate presence of news letter section and continue button', () => {
    mobileProductDescriptionPage.clickOnHideDetailsLink();
    brandName = mobileProductDescriptionPage.getMobileProductBrandName();
    logger.info('Brand Displayed on PDP =' + brandName);
    browser.waitUntil((): any => {
      return mobileProductDescriptionPage.newsLetterSectionSoldProduct.isDisplayed();
    }, 5000);
    assert.equal(
      true,
      mobileProductDescriptionPage.newsLetterSectionSoldProduct.isDisplayed(),
      productDescriptionTestData.newsLetterSectionSoldProductError,
    );
    logger.info(
      'Presence of new letter section on PDP : ' +
        mobileProductDescriptionPage.newsLetterSectionSoldProduct.isDisplayed(),
    );
    assert.equal(
      true,
      mobileProductDescriptionPage.continueShoppingButton.isDisplayed(),
      productDescriptionTestData.continueButtonError_Msg,
    );
    logger.info(
      'Presence of Continue Shopping Button on PDP : ' +
        mobileProductDescriptionPage.continueShoppingButton.isDisplayed(),
    );
    assert.equal(
      true,
      mobileProductDescriptionPage.continueShoppingButton.isClickable(),
      productDescriptionTestData.continueButtonError_Msg,
    );
    logger.info(
      ' Continue Shopping Button is clickable on PDP : ' +
        mobileProductDescriptionPage.continueShoppingButton.isClickable(),
    );
    mobileProductDescriptionPage.clickOnContinueShoppingButton();
    browser.waitUntil((): any => {
      return productListingPage.brandTitle.isDisplayed();
    }, 5000);
    assert.equal(
      brandName,
      productListingPage.getDisplayedBrandName().toUpperCase(),
      productDescriptionTestData.brandNameError_Msg,
    );
    logger.info(
      'Brand name on PLP : ' + productListingPage.getDisplayedBrandName(),
    );
  });
  it('Should perform new user registration ', () => {
    logger.info('=================Logged In User========================');
    mobileNavigationPage.clickMobileAccountLink();
    browser.waitUntil((): any => {
      return loginPage.getLoginHeading();
    }, 5000);

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
  it('Should navigate to PLP and select product', () => {
    mobileNavigationPage.clickMobileMainMenu();

    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileTrending.isDisplayed();
    }, 5000);
    browser.setCookies({ name: 'is_new_pdp_mobile', value: 'new' });
    mobileNavigationPage.clickMobileTrending();
    mobileProductListingPage.clickFourthProduct();
    logger.info('Clicked on sold out product');
  });
  it('Should validate presence of news letter section and continue button', () => {
    brandName = mobileProductDescriptionPage.getMobileProductBrandName();
    logger.info('Brand Displayed on PDP =' + brandName);
    mobileProductDescriptionPage.clickOnHideDetailsLink();
    browser.waitUntil((): any => {
      return mobileProductDescriptionPage.newsLetterSectionSoldProduct.isDisplayed();
    }, 5000);
    assert.equal(
      true,
      mobileProductDescriptionPage.newsLetterSectionSoldProduct.isDisplayed(),
      productDescriptionTestData.newsLetterSectionSoldProductError,
    );
    logger.info(
      'Presence of new letter section on PDP : ' +
        mobileProductDescriptionPage.newsLetterSectionSoldProduct.isDisplayed(),
    );
    assert.equal(
      true,
      mobileProductDescriptionPage.continueShoppingButton.isDisplayed(),
      productDescriptionTestData.continueButtonError_Msg,
    );
    logger.info(
      'Presence of Continue Shopping Button on PDP : ' +
        mobileProductDescriptionPage.continueShoppingButton.isDisplayed(),
    );
    assert.equal(
      true,
      mobileProductDescriptionPage.continueShoppingButton.isClickable(),
      productDescriptionTestData.continueButtonError_Msg,
    );
    logger.info(
      ' Continue Shopping Button is clickable on PDP : ' +
        mobileProductDescriptionPage.continueShoppingButton.isClickable(),
    );
    mobileProductDescriptionPage.clickOnContinueShoppingButton();
    browser.waitUntil((): any => {
      return productListingPage.brandTitle.isDisplayed();
    }, 5000);
    assert.equal(
      brandName,
      productListingPage.getDisplayedBrandName().toUpperCase(),
      productDescriptionTestData.brandNameError_Msg,
    );
    logger.info(
      'Brand name on PLP : ' + productListingPage.getDisplayedBrandName(),
    );
  });
});
