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
import checkoutPage from '../../../pageObjects/CheckoutPage';
import { navigationTestData } from 'resources/navigationTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Select Size option should highlight once user hover over the avaialable size', () => {
  let langArray: any = [];
  it('Should navigate to men section and select Multi-size product ', () => {
    logger.info('=========== Guest/Logged Out User Scenario ==============');
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
      }
      const buttonclickable: any = browser.waitUntil((): any => {
        return productDescriptionPage.checkSelectSize();
      }, 5000);
      logger.info(
        'Select Size drop down is Displayed and clickable === > ' +
          buttonclickable,
      );
      expect(buttonclickable).to.equal(true);
      const sizeName: any = browser.waitUntil((): any => {
        return productDescriptionPage.getSizeName();
      }, 5000);
      assert.equal(
        productDescriptionTestData.selectSizeMessageArray[index],
        sizeName[0],
      );
      logger.info('check translation for Select a Size === > ' + sizeName[0]);
      logger.info('Available Size list === > ' + sizeName);
      const ProdSize: any = browser.waitUntil((): any => {
        return productDescriptionPage.selectSize().trim();
      }, 5000);
      logger.info('check Selected Size Name === > ' + ProdSize);
      productDescriptionPage.addToBag();
      const result = browser.waitUntil(
        () => {
          return notification.notification.isDisplayed();
        },
        5000,
        productDescriptionTestData.Notification_Banner,
      );
      logger.info('Notification message displayed on PDP :' + result);
      checkoutPage.closeAllNotification();
      // added static wait to switch lang on PDP page
      browser.pause(2000);
    }
  });
  // -----------------------------Logged-in User ---------------------------------//
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
  it('Should navigate to men section and select Multi-size product ', () => {
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
      }
      const buttonclickable: any = browser.waitUntil((): any => {
        return productDescriptionPage.checkSelectSize();
      }, 5000);
      logger.info(
        'Select Size is Displayed and clickable === > ' + buttonclickable,
      );
      expect(buttonclickable).to.equal(true);
      const sizeName: any = browser.waitUntil((): any => {
        return productDescriptionPage.getSizeName();
      }, 5000);
      assert.equal(
        productDescriptionTestData.selectSizeMessageArray[index],
        sizeName[0],
      );
      logger.info('check translation for Select a Size === > ' + sizeName[0]);
      logger.info('Available Size list === > ' + sizeName);
      const ProdSize: any = browser.waitUntil((): any => {
        return productDescriptionPage.selectSize().trim();
      }, 5000);
      logger.info('check Selected Size Name === > ' + ProdSize);
      productDescriptionPage.addToBag();
      const result = browser.waitUntil(
        () => {
          return notification.notification.isDisplayed();
        },
        5000,
        productDescriptionTestData.Notification_Banner,
      );
      logger.info('Notification message displayed on PDP :' + result);
      checkoutPage.closeAllNotification();
      // added static wait to switch lang on PDP page
      browser.pause(2000);
    }
  });
});
