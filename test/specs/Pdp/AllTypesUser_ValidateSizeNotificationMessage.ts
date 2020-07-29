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
import notification from '../../../methods/GetNotification';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { navigationTestData } from 'resources/navigationTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate User should not be able to add a product to Shopping bag without selecting a size for multi-size products ', () => {
  let langArray: any = [];
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
  it('Should validate the notification message and shopping bag count ', () => {
    logger.info('Navigating to the men menu');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    logger.info('clicked on first product of men menu');
    langArray = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
    logger.info('Application Languages : ' + langArray);
    for (let index = 0; index < langArray.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
        // Added static wait because after language change application take time to load the page.
        browser.pause(2000);
      }
      productDescriptionPage.clickAddToBag();
      const result = browser.waitUntil(
        () => {
          return notification.notification.isDisplayed();
        },
        5000,
        'Notification message is not displayed on PDP',
      );
      logger.info('Notification message displayed on PDP :' + result);
      const notificationMessage = notification.getNotificationText();
      assert.equal(
        productDescriptionTestData.sizeMessage_array[index],
        notificationMessage,
      );
      logger.info('Message :' + notificationMessage);
      // Added static wait because sometimes notification message overlaps.
      browser.pause(5000);
      assert.equal(
        shoppingBagTestData.shoppingBag_count,
        shoppingBagPage.getNumberOfShoppingBagProduct(),
        shoppingBagTestData.shoppingBagErrroMessage,
      );
      logger.info(
        'Shopping bag count :' +
          shoppingBagPage.getNumberOfShoppingBagProduct(),
      );
    }
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
      'login/Signup page is not loaded yet',
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
  it('Should validate the notification message and shopping bag count ', () => {
    logger.info('Navigating to the men menu');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    logger.info('clicked on first product of men menu');
    langArray = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
    logger.info('Application Languages : ' + langArray);
    for (let index = 0; index < langArray.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
        // Added static wait because after language change application take time to load the page.
        browser.pause(2000);
      }
      productDescriptionPage.clickAddToBag();
      const result = browser.waitUntil(
        () => {
          return notification.notification.isDisplayed();
        },
        5000,
        'Notification message is not displayed on PDP',
      );
      logger.info('Notification message displayed on PDP :' + result);
      const notificationMessage = notification.getNotificationText();
      assert.equal(
        productDescriptionTestData.sizeMessage_array[index],
        notificationMessage,
      );
      logger.info('Message :' + notificationMessage);
      // Added static wait because sometimes notification message overlaps.
      browser.pause(5000);
      assert.equal(
        shoppingBagTestData.shoppingBag_count,
        shoppingBagPage.getNumberOfShoppingBagProduct(),
        shoppingBagTestData.shoppingBagErrroMessage,
      );
      logger.info(
        'Shopping bag count :' +
          shoppingBagPage.getNumberOfShoppingBagProduct(),
      );
    }
  });
});
