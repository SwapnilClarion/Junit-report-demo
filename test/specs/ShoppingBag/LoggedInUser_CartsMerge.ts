import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import loginMethod from '../../../methods/Login_SignUpMethods';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import notification from '../../../methods/GetNotification';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import { expect } from 'chai';
import assert from 'assert';
import { randomData } from '../../../utils/random_data';
import helpers from '../../../utils/helpers';
import { logger } from '../../../config/winstonLogger';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate if cached shopping bag and user shopping bag merged ', () => {
  let memberBagProductId: any = '';
  let cachedBagProductId: any = '';
  let userEmail: any = '';
  it('Should validate that login in link is present and perform signup', () => {
    assert.equal(
      loginPage.isLoginLinkExist(),
      true,
      loginSignUpTestData.Login_Link_Display_Error,
    );
    userEmail = randomData.GUEST_EMAIL;
    navigationPage.clickOnLoginLink();
    loginMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );
    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);
  });
  it('Should navigate to men section and click on first product ', () => {
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });

  it('Should select size and add it to bag ', () => {
    productDescriptionPage.addToBag();
    memberBagProductId = browser.waitUntil(() => {
      return helpers.getProductID(browser.getUrl());
    }, 5000);
    logger.info('Member Bag ProductId ==== >' + memberBagProductId);
    const actualAddToBagNotification = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    checkoutPage.closeAllNotification();
    logger.info(
      'Actual banner text displayed for Add to Bag is: ' +
        actualAddToBagNotification,
    );
    productDescriptionPage.clickCheckoutBtn();
  });
  it('Should click on logout button', () => {
    navigationPage.clickOnAccountLink();
    navigationPage.clickOnLogoutLink();
    checkoutPage.closeAllNotification();
    logger.info('---------Logged out-------');
  });
  it('Should navigate to men section and click on second product', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickSecondProduct();
  });
  it('Should select size and add it to bag ', () => {
    productDescriptionPage.addToBag();
    cachedBagProductId = browser.waitUntil(() => {
      return helpers.getProductID(browser.getUrl());
    }, 5000);
    logger.info('Cached Bag ProductId ==== >' + cachedBagProductId);
    productDescriptionPage.clickCheckoutBtn();
  });

  it('Should accept emailid,password and proceed to shopping bag  page', () => {
    shoppingBagPage.enterUserEmail(userEmail);
    shoppingBagPage.clickAcceptEmailCheckoutBtn();
    shoppingBagPage.enterUserPassword(randomData.USER_PASSWORD);
    shoppingBagPage.clickLoginBtn();
    shoppingBagPage.proceedToCheckoutOnShoppingBag.waitForDisplayed(5000);
  });
  it('Should verify the sequence of the items after carts merge', () => {
    // This Static wait is for the dynamic change of the shopping items sequence
    // at the time of cart merge.
    browser.pause(5000);
    const bagCount = browser.waitUntil((): any => {
      return shoppingBagPage.productsList.length;
    }, 5000);
    logger.info('Shopping Bag Items count ===> ' + bagCount);
    const productId = browser.waitUntil(() => {
      return shoppingBagPage.getProductID();
    }, 5000);
    logger.info("Product Id's sequence ====== >" + productId);
    expect(productId).to.include.ordered.members([
      memberBagProductId,
      cachedBagProductId,
    ]);
  });
  it('Should verify the page is shopping bag page', () => {
    const pageTitle: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Shopping Page Title ==> ' + pageTitle);
    expect(shoppingBagTestData.shoppingBagTitle).to.include(pageTitle.trim());
  });
});
