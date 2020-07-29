import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import { randomData } from '../../../utils/random_data';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import notification from '../../../methods/GetNotification';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import { logger } from '../../../config/winstonLogger';
import { expect } from 'chai';
import assert from 'assert';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate user should be logged-out after clicking on Not Your Account link', () => {
  let langArray: any = [];
  let userEmail: any = '';
  let email: any = '';
  it('should perform signup process and logout', () => {
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
    email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    logger.info('user email id === >' + email);
    langArray = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
    // static wait is required due to conflict during Get Language and Click on account link
    browser.pause(2000);
    navigationPage.clickOnAccountLink();
    navigationPage.clickOnLogoutLink();
    const successLogout = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    checkoutPage.closeAllNotification();
    expect(successLogout).to.equals(
      loginSignUpTestData.LOGOUT_SUCCESSFULLY_MSG,
    );
  });
  it('Should click on not your account link and validate banner text for selected language', () => {
    for (let index = 0; index < langArray.length; index += 1) {
      navigationPage.clickOnLoginLinkLang();
      loginPage.enterUserNameInput(userEmail);
      loginPage.enterUserPasswordInput(randomData.USER_PASSWORD);
      loginPage.clickLoginBtn();
      email = browser.waitUntil((): any => {
        return accountDetailsPage.checkEmailId('value');
      }, 5000);
      navigationPage.clickOnMenOuterLink();
      productListingPage.clickFirstProduct();
      browser.waitUntil(() => {
        return productDescriptionPage.addToBagBtn.isDisplayed() === true;
      }, 5000);
      productDescriptionPage.addToBag();
      const actualAddToBagNotification = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      checkoutPage.closeAllNotification();
      logger.info(
        'Actual banner text displayed for Add to Bag is: ' +
          actualAddToBagNotification,
      );
      productDescriptionPage.clickCheckoutBtn();
      browser.waitUntil(() => {
        return shoppingBagPage.notYourAccount.isDisplayed() === true;
      }, 5000);
      // static wait is required for language selection
      browser.pause(2000);
      if (index >= 0) {
        navigationPage.selectLanguage(index);
      }
      browser.waitUntil(() => {
        return shoppingBagPage.notYourAccount.isDisplayed() === true;
      }, 5000);
      shoppingBagPage.clickNotYourAccLink();
      const checkSuccessBanner = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      logger.info(
        'check success banner notification === > ' + checkSuccessBanner,
      );
      checkoutPage.closeAllNotification();
      assert.equal(
        checkSuccessBanner,
        productDescriptionTestData.MsgNotYourAccountLink[index],
        productDescriptionTestData.Banner_Text_Error,
      );
      const EmptyShoppingBagText = browser.waitUntil((): any => {
        return shoppingBagPage.getEmptyShoppingBagText();
      }, 5000);
      logger.info('check empty shopping bag === > ' + EmptyShoppingBagText);
      expect(shoppingBagTestData.MsgEmptyShoppingBagText[index]).to.equal(
        EmptyShoppingBagText,
      );
      logger.info('====================================================');
    }
  });
});
