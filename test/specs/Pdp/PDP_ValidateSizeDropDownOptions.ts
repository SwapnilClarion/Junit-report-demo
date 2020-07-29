import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import loginPage from '../../../pageObjects/LoginPage';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { randomData } from '../../../utils/random_data';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { expect } from 'chai';
import assert from 'assert';
import { globalTestData } from '../../../resources/globalTestData';
import loginMethods from '../../../methods/Login_SignUpMethods';
import { navigationTestData } from 'resources/navigationTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate that usser should not be able to select sold-out sizes ', () => {
  it('Should validate that user is not logged in', () => {
    logger.info(
      '============= Guest/Logged Out User Scenario ================',
    );
    navigationPage.clickOnLoginLink();
    const actualLoginHeading = loginPage.getLoginHeading();
    logger.info('Login page heading :' + actualLoginHeading);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });
  it('Should validate the sold out size option is not clickable and greyed out ', () => {
    logger.info('Navigating to the men menu');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickSecondProduct();
    logger.info('Clicked on product');
    const sizeDropDown = browser.waitUntil((): boolean => {
      return productDescriptionPage.productSize.isDisplayed();
    }, 5000);
    logger.info('Select size drop down displayed : ' + sizeDropDown);
    assert.equal(
      true,
      productDescriptionPage.validateSoldOutOptionsIsDisabled(),
      productDescriptionTestData.soldOutOption_ErrorMessage,
    );
  });
  it('Should validate that login link is present', () => {
    logger.info('============= Logged in User Scenario ================');
    logger.info('Validating login link is exist or not');
    browser.navigateTo(navigationTestData.homepageURL);
    assert.equal(
      loginPage.isLoginLinkExist(),
      true,
      loginSignUpTestData.Login_Link_Display_Error,
    );
  });
  it('Should take user to login/Signup page', () => {
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
    logger.info('Login page URL : ' + url);
  });
  it('Should perform signup process and land on account details page', () => {
    // This is to verify that the email-id field is empty.
    browser.execute(loginPage.registerEmailInput.getAttribute('value'));
    if (
      loginPage.viewNotificationMsg() !==
      loginSignUpTestData.Login_SameEmail_Error
    ) {
      loginPage.enterSignUpEmailId('');
      loginMethods.signup(
        randomData.GUEST_GMAIL_Email,
        randomData.USER_PASSWORD,
        loginSignUpTestData.NO_THANKS_PROMO,
      );
    }
    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);
  });
  it('Should validate the sold out size option is not clickable and greyed out ', () => {
    logger.info('Navigating to the men menu');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickSecondProduct();
    logger.info('Clicked on product');
    const sizeDropDown = browser.waitUntil((): boolean => {
      return productDescriptionPage.productSize.isDisplayed();
    }, 5000);
    logger.info('Select size drop down displayed : ' + sizeDropDown);
    assert.equal(
      true,
      productDescriptionPage.validateSoldOutOptionsIsDisabled(),
      productDescriptionTestData.soldOutOption_ErrorMessage,
    );
  });
});
