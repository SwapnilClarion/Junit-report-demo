import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import loginPage from '../../../pageObjects/LoginPage';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { expect } from 'chai';
import assert from 'assert';
import { globalTestData } from '../../../resources/globalTestData';
import loginMethods from '../../../methods/Login_SignUpMethods';
import { navigationTestData } from 'resources/navigationTestData';
import { randomData } from '../../../utils/random_data';
globalTestData.FILE_PATH = __filename;
describe('Validate user should not see Add to Bag button for a sold out product ', () => {
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
  it('Should validate the absence of size drop down and add to bag button ', () => {
    logger.info('Navigating to the men menu');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickOnSoldOutProduct();
    logger.info('clicked on sold out product of men menu');
    const result = browser.waitUntil(
      () => {
        return productDescriptionPage.subscribeButton.isDisplayed();
      },
      5000,
      'Subscribe button is not displayed on PDP',
    );
    logger.info('Subscribe button is displayed on PDP : ' + result);
    assert.equal(
      false,
      productDescriptionPage.productSize.isDisplayed(),
      productDescriptionTestData.sizeDropDownErrorMessage,
    );
    logger.info(
      'Size drop drown is displayed on PDP : ' +
        productDescriptionPage.productSize.isDisplayed(),
    );
    assert.equal(
      false,
      productDescriptionPage.addToBagBtn.isDisplayed(),
      productDescriptionTestData.addToBagErrorMessage,
    );
    logger.info(
      'Add to bag button is displayed on PDP : ' +
        productDescriptionPage.addToBagBtn.isDisplayed(),
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
  it('Should validate the absence of size drop down and add to bag button ', () => {
    logger.info('Navigating to the men menu');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickOnSoldOutProduct();
    logger.info('clicked on sold out product of men menu');
    const result = browser.waitUntil(
      () => {
        return productDescriptionPage.subscribeButton.isDisplayed();
      },
      5000,
      'Subscribe button is not displayed on PDP',
    );
    logger.info('Subscribe button is displayed on PDP : ' + result);
    assert.equal(
      false,
      productDescriptionPage.productSize.isDisplayed(),
      productDescriptionTestData.sizeDropDownErrorMessage,
    );
    logger.info(
      'Size drop drown is displayed on PDP : ' +
        productDescriptionPage.productSize.isDisplayed(),
    );
    assert.equal(
      false,
      productDescriptionPage.addToBagBtn.isDisplayed(),
      productDescriptionTestData.addToBagErrorMessage,
    );
    logger.info(
      'Add to bag button is displayed on PDP : ' +
        productDescriptionPage.addToBagBtn.isDisplayed(),
    );
  });
});
