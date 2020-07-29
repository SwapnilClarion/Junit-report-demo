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
globalTestData.FILE_PATH = __filename;
describe('Validate the presence of Product description and add to bag container on PDP ', () => {
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
  it('should navigate to men section and click on first product', () => {
    logger.info('Navigating to the men menu');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    logger.info('clicked on first product of men menu');
  });
  it('Should validate the presence of Product description and add to bag container ', () => {
    // added static wait because sometimes system takes time to load all images on PDP page.
    browser.pause(1000);
    assert.equal(
      productDescriptionPage.validateProductDescAndAddToBagIsDisplayedAfterScrollDownUP(),
      true,
      productDescriptionTestData.scrollDownUpErrorMessage,
    );
  });
  it('Should validate that login link is present', () => {
    logger.info('============= Logged in User Scenario ================');
    logger.info('Validating login link is exist or not');
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
      'login/Signup page page is not loaded yet',
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
      'A member with same email already exists'
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
  it('should navigate to men section and click on first product ', () => {
    logger.info('Navigating to the men menu');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    logger.info('clicked on first product of men menu');
  });
  it('Should validate the presence of Product description and add to bag container ', () => {
    // added static wait because sometimes system takes time to load all images on PDP page.
    browser.pause(3000);
    assert.equal(
      productDescriptionPage.validateProductDescAndAddToBagIsDisplayedAfterScrollDownUP(),
      true,
      productDescriptionTestData.scrollDownUpErrorMessage,
    );
  });
});
