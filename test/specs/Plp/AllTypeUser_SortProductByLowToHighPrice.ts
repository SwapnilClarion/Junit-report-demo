import loginMethods from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import loginPage from '../../../pageObjects/LoginPage';
import { randomData } from '../../../utils/random_data';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productListingTestData } from '../../../resources/productListingTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate user is able to see product listed in ascending order after clicking on Low to High', () => {
  // ------------------------- Guest User/LoggedOut User ---------------------------------//
  it('Should validate that user is not logged in', () => {
    navigationPage.clickOnLoginLink();
    const actualLoginHeading = loginPage.getLoginHeading();
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });
  it('Should list all the products in ascending order based on current active price', () => {
    logger.info(
      '============= Guest/Logged out User Scenario ================',
    );
    assert.equal(
      true,
      productListingPage.navigateToPLPAndValidateLowToHighPLPListingOrder(),
      productListingTestData.PLPLowToHighSortErrorMsg,
    );
  });
  // ------------------------- login User ---------------------------------//
  it('Should validate that login link is present', () => {
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
  it('Should navigate to product listing page', () => {
    navigationPage.clickOnMenOuterLink();
  });
  it('Should list all the products in ascending order based on current active price after login', () => {
    logger.info('=============Logged In User Scenario================');
    assert.equal(
      true,
      productListingPage.navigateToPLPAndValidateLowToHighPLPListingOrder(),
      productListingTestData.PLPLowToHighSortErrorMsg,
    );
  });
});
