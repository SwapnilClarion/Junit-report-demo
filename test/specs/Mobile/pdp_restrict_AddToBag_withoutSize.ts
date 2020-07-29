import mobileNavigationPage from '../../../pageObjects/mobile/NavigationPage';
import mobileProductDescriptionPage from '../../../pageObjects/mobile/ProductDescriptionPage';
import mobileProductListingPage from '../../../pageObjects/mobile/ProductListingPage';
import loginPage from '../../../pageObjects/LoginPage';
import notification from '../../../methods/GetNotification';
import { expect } from 'chai';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate User should not be able to add a product to Shopping bag without selecting a size for multi-size products ', () => {
  let notificationStatus: any;
  let userEmail: any = '';
  let shoppingBagCountBeforeAddtoCart: any;
  let shoppingBagCountAfterAddtoCart: any;
  let email: any = '';
  it('Should validate that user is not logged in', () => {
    logger.info('============= Guest/Logged Out User ================');
    mobileNavigationPage.clickMobileAccountLink();
    const actualLoginHeading: any = browser.waitUntil((): any => {
      return loginPage.getLoginHeading();
    }, 5000);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
    logger.info('User is logged out!!');
  });
  it('Should navigate to PLP and select multi-size product', () => {
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
    logger.info('Redirected to PLP');

    // Shopping bag product count before clicking Add to Bag
    shoppingBagCountBeforeAddtoCart = mobileProductDescriptionPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of Shopping bag count before clicking Add to Bag: ' +
        shoppingBagCountBeforeAddtoCart,
    );
    mobileProductListingPage.clickFirstProductMobileView();
    logger.info('Selected multi-size product');
  });
  it('Should click on Add To Bag button without selecting size', () => {
    browser.waitUntil((): any => {
      return mobileProductDescriptionPage.mobileAddToBag.isDisplayed();
    }, 5000);
    mobileProductDescriptionPage.clickAddToBag();
    logger.info('Clicking on Add To Bag without selecting size');
  });
  it('Should validate presence of banner and content is displayed', () => {
    // validate presence of banner after clicking Add to Bag button without selecting size
    notificationStatus = browser.waitUntil(
      (): boolean => {
        return notification.notification.isDisplayed();
      },
      5000,
      productDescriptionTestData.AddToBagBannerError,
    );
    logger.info('Error banner displayed on PDP :' + notificationStatus);
    assert.equal(
      notificationStatus,
      true,
      productDescriptionTestData.AddToBagBannerError,
    );
    // validate banner text displayed after clicking Add to Bag button without selecting size
    const actualAddToBagBannerText = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    logger.info(
      'Actual Banner text displayed for Add to Bag without selecting size: ' +
        actualAddToBagBannerText,
    );
    assert.equal(
      actualAddToBagBannerText,
      productDescriptionTestData.sizeMessage_array[0],
      productDescriptionTestData.Banner_Text_Error,
    );
  });
  it('Should validate shopping bag link product count', () => {
    // Shopping bag product count before clicking Add to Bag
    shoppingBagCountAfterAddtoCart = mobileProductDescriptionPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of Shopping bag count after clicking Add to Bag: ' +
        shoppingBagCountAfterAddtoCart,
    );
    assert.equal(
      shoppingBagCountBeforeAddtoCart,
      shoppingBagCountAfterAddtoCart,
      shoppingBagTestData.shoppingBagErrroMessage,
    );
    logger.info('============================================================');
  });
  //  ====================================Logged-In User ==============================================
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
    logger.info('User registration successful');
  });
  it('should land on account details page and verify email id', () => {
    email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });
  it('Should navigate to PLP and select multi-size product', () => {
    mobileNavigationPage.clickMobileMainMenu();
    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileTrending.isDisplayed();
    }, 5000);
    mobileNavigationPage.clickMobileTrending();
    logger.info('Redirected to PLP');
    // Shopping bag product count before clicking Add to Bag
    shoppingBagCountAfterAddtoCart = mobileProductDescriptionPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of Shopping bag count after clicking Add to Bag: ' +
        shoppingBagCountAfterAddtoCart,
    );
    mobileProductListingPage.clickFirstProductMobileView();
    logger.info('Selected multi-size product');
  });
  it('Should click on Add To Bag button without selecting size', () => {
    browser.waitUntil((): any => {
      return mobileProductDescriptionPage.mobileAddToBag.isDisplayed();
    }, 5000);
    mobileProductDescriptionPage.clickAddToBag();
    logger.info('Clicking on Add To Bag without selecting size');
  });
  it('Should validate presence of banner and content is displayed', () => {
    // validate presence of banner after clicking Add to Bag button without selecting size
    notificationStatus = browser.waitUntil(
      (): boolean => {
        return notification.notification.isDisplayed();
      },
      5000,
      productDescriptionTestData.AddToBagBannerError,
    );
    logger.info('Error banner displayed on PDP :' + notificationStatus);
    assert.equal(
      notificationStatus,
      true,
      productDescriptionTestData.AddToBagBannerError,
    );
    // validate banner text displayed after clicking Add to Bag button without selecting size
    const actualAddToBagBannerText = browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    logger.info(
      'Actual Banner text displayed for Add to Bag without selecting size: ' +
        actualAddToBagBannerText,
    );
    assert.equal(
      actualAddToBagBannerText,
      productDescriptionTestData.sizeMessage_array[0],
      productDescriptionTestData.Banner_Text_Error,
    );
  });
  it('Should validate shopping bag link product count', () => {
    // Shopping bag product count before clicking Add to Bag
    shoppingBagCountAfterAddtoCart = mobileProductDescriptionPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of Shopping bag count after clicking Add to Bag: ' +
        shoppingBagCountAfterAddtoCart,
    );
    assert.equal(
      shoppingBagCountBeforeAddtoCart,
      shoppingBagCountAfterAddtoCart,
      shoppingBagTestData.shoppingBagErrroMessage,
    );
    logger.info('============================================================');
  });
});
