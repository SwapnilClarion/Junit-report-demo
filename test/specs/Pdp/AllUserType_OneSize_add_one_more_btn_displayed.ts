import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import notification from '../../../methods/GetNotification';
import signupMethod from '../../../methods/Login_SignUpMethods';
import loginPage from '../../../pageObjects/LoginPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productListingTestData } from '../../../resources/productListingTestData';
import { globalTestData } from '../../../resources/globalTestData';
import { navigationTestData } from 'resources/navigationTestData';
import assert from 'assert';
globalTestData.FILE_PATH = __filename;
describe('Validate a user [Guest/Logged_In] add one more button is Displayed in pdp for One-Size product', () => {
  let langArr: any = [];
  it('Should populate the language array', () => {
    logger.info('==============Guest/Logged-out User==========');
    langArr = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
    logger.info('Lang Arr ===> ' + langArr);
  });
  it('should take user to plp page', () => {
    productListingPage.goToPlp(
      productListingTestData.sale_gender_male,
      productListingTestData.go_to_plp,
    );
    browser.waitUntil(() => {
      return productListingPage.firstProduct.isDisplayed();
    }, 5000);
  });
  it('should select third/One-size product and go to its pdp', () => {
    productListingPage.clickOnThirdProduct();
    browser.waitUntil(() => {
      return productDescriptionPage.addToBagBtn.isDisplayed();
    }, 5000);
    for (let index = 0; index < langArr.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
      }
      const currentLang = langArr[index];
      // Add to Bag Button
      const addToBagBtnDisplay = browser.waitUntil(() => {
        return productDescriptionPage.addToBagBtn.isDisplayed();
      }, 5000);
      logger.info('Add to Bag Btn is displayed  : ' + addToBagBtnDisplay);
      expect(addToBagBtnDisplay).to.equal(true);
      const addToBagBtnClick = browser.waitUntil(() => {
        return productDescriptionPage.addToBagBtn.isClickable();
      }, 5000);
      logger.info('Add to Bag Btn is Clickable  : ' + addToBagBtnClick);
      expect(addToBagBtnClick).to.equal(true);
      const addToBagBtnTxt: any = browser.waitUntil((): any => {
        return productDescriptionPage.getAddToBagBtnTxt();
      }, 5000);
      logger.info('Add To Bag Btn Txt : ' + addToBagBtnTxt.trim());
      const addToBagBtnTxtStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          addToBagBtnTxt,
        );
      }, 5000);
      logger.info('Add to Bag Translation Status  : ' + addToBagBtnTxtStatus);
      expect(addToBagBtnTxtStatus).to.equal(true);
      productDescriptionPage.clickAddToBag();
      const notificationTxt: any = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      logger.info('Add to Bag Notification  : ' + notificationTxt);
      const notificationStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          notificationTxt,
        );
      }, 5000);
      logger.info('Add to Bag Notification Status  : ' + notificationStatus);
      expect(notificationStatus).to.equal(true);
      checkoutPage.closeAllNotification();
      // Shopping Bag Count after Add to Bag
      const shoppingBagLnkBeforeCount: any = browser.waitUntil((): any => {
        return shoppingBagPage.getNumberOfShoppingBagProduct();
      }, 5000);
      logger.info(
        'Shopping Bag Link Before Count  : ' + shoppingBagLnkBeforeCount,
      );
      // Add one More Button
      // Static wait needed in some cases as the add to bag button takes time to display add  one more btn
      browser.pause(2000);
      const addOneMoreBtnDisplay = browser.waitUntil(() => {
        return productDescriptionPage.addOneMoreBtn.isDisplayed();
      }, 5000);
      logger.info('Add One More Btn is displayed  : ' + addOneMoreBtnDisplay);
      expect(addOneMoreBtnDisplay).to.equal(true);
      const addOneMorebtnTxt: any = browser.waitUntil((): any => {
        return productDescriptionPage.getOnerMoreBtnTxt();
      }, 5000);
      logger.info('Addone more Btn Txt  :  ' + addOneMorebtnTxt);
      const addOneMoreBtnStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          addOneMorebtnTxt,
        );
      }, 5000);
      logger.info(
        'Add one more Btn Translation Status  : ' + addOneMoreBtnStatus,
      );
      productDescriptionPage.clickAddOneMoreBtn();
      const addOneMorenotification: any = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      logger.info('Add One More Notification  : ' + addOneMorenotification);
      const addOneMorenotificationStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          addOneMorenotification,
        );
      }, 5000);
      logger.info(
        'Add One More Translation Status  : ' + addOneMorenotificationStatus,
      );
      checkoutPage.closeAllNotification();
      // Shopping Bag Count after Add to Bag
      const shoppingBagLnkAfterCount: any = shoppingBagPage.getNumberOfShoppingBagProduct();
      logger.info(
        'Shopping Bag Link After Count  : ' + shoppingBagLnkAfterCount,
      );
      expect(shoppingBagLnkAfterCount).gt(shoppingBagLnkBeforeCount);
      // Click Checkout Btn
      const checkoutBtnClick = browser.waitUntil(() => {
        return productDescriptionPage.checkoutBtn.isClickable();
      }, 5000);
      logger.info('Checkout Btn is Clickable  : ' + checkoutBtnClick);
      expect(checkoutBtnClick).to.equal(true);
      const checkoutbtnTxt: any = browser.waitUntil((): any => {
        return productDescriptionPage.getCheckoutBtnTxt();
      }, 5000);
      logger.info('Checkout Btn Txt  :  ' + checkoutbtnTxt);
      const checkoutbtnBtnStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          checkoutbtnTxt,
        );
      }, 5000);
      logger.info('Checkout Btn Translation Status  : ' + checkoutbtnBtnStatus);
      expect(checkoutbtnBtnStatus).to.equal(true);
      productDescriptionPage.clickCheckoutBtn();
      // Go to Shopping Bag Page
      const pageHeading: any = browser.waitUntil((): any => {
        return shoppingBagPage.getShoppingBagHeading();
      }, 5000);
      logger.info('Page Heading  :  ' + pageHeading);
      shoppingBagPage.clickRemoveItemBtn();
      logger.info('========================================');
      // Return to PDP
      browser.back();
      browser.waitUntil(() => {
        return productDescriptionPage.addToBagBtn.isDisplayed();
      }, 5000);
      // Static wait required to redirect back to PDP.
      browser.pause(2000);
    }
  });
  // ------------Logged_in User---------------
  it('Should go to Home Page', () => {
    browser.navigateTo(navigationTestData.homepageURL);
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('==========Logged-In User=========');
  });
  it('Should validate that login in link is present and perform signup', () => {
    assert.equal(
      loginPage.isLoginLinkExist(),
      true,
      loginSignUpTestData.Login_Link_Display_Error,
    );
    const userEmail = randomData.GUEST_EMAIL;
    logger.info(' User Email  :  ' + userEmail);
    navigationPage.clickOnLoginLink();
    signupMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );
    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);
  });
  it('should take user to plp page', () => {
    productListingPage.goToPlp(
      productListingTestData.sale_gender_male,
      productListingTestData.go_to_plp,
    );
    browser.waitUntil(() => {
      return productListingPage.firstProduct.isDisplayed();
    }, 5000);
  });
  it('should select third/One-size product and go to its pdp', () => {
    productListingPage.clickOnThirdProduct();
    browser.waitUntil(() => {
      return productDescriptionPage.addToBagBtn.isDisplayed();
    }, 5000);
    for (let index = 0; index < langArr.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
      }
      const currentLang = langArr[index];
      // Add to Bag Button
      const addToBagBtnDisplay = browser.waitUntil(() => {
        return productDescriptionPage.addToBagBtn.isDisplayed();
      }, 5000);
      logger.info('Add to Bag Btn is displayed  : ' + addToBagBtnDisplay);
      expect(addToBagBtnDisplay).to.equal(true);
      const addToBagBtnClick = browser.waitUntil(() => {
        return productDescriptionPage.addToBagBtn.isClickable();
      }, 5000);
      logger.info('Add to Bag Btn is Clickable  : ' + addToBagBtnClick);
      expect(addToBagBtnClick).to.equal(true);
      const addToBagBtnTxt: any = browser.waitUntil((): any => {
        return productDescriptionPage.getAddToBagBtnTxt();
      }, 5000);
      logger.info('Add To Bag Btn Txt : ' + addToBagBtnTxt.trim());
      const addToBagBtnTxtStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          addToBagBtnTxt,
        );
      }, 5000);
      logger.info('Add to Bag Translation Status  : ' + addToBagBtnTxtStatus);
      expect(addToBagBtnTxtStatus).to.equal(true);
      productDescriptionPage.clickAddToBag();
      const notificationTxt: any = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      logger.info('Add to Bag Notification  : ' + notificationTxt);
      const notificationStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          notificationTxt,
        );
      }, 5000);
      logger.info('Add to Bag Notification Status  : ' + notificationStatus);
      expect(notificationStatus).to.equal(true);
      checkoutPage.closeAllNotification();
      // Shopping Bag Count after Add to Bag
      const shoppingBagLnkBeforeCount: any = browser.waitUntil((): any => {
        return shoppingBagPage.getNumberOfShoppingBagProduct();
      }, 5000);
      logger.info(
        'Shopping Bag Link Before Count  : ' + shoppingBagLnkBeforeCount,
      );
      // Add one More Button
      // Static wait needed in some cases as the add to bag button takes time to display add  one more btn
      browser.pause(2000);
      const addOneMoreBtnDisplay = browser.waitUntil(() => {
        return productDescriptionPage.addOneMoreBtn.isDisplayed();
      }, 5000);
      logger.info('Add One More Btn is displayed  : ' + addOneMoreBtnDisplay);
      expect(addOneMoreBtnDisplay).to.equal(true);
      const addOneMorebtnTxt: any = browser.waitUntil((): any => {
        return productDescriptionPage.getOnerMoreBtnTxt();
      }, 5000);
      logger.info('Addone more Btn Txt  :  ' + addOneMorebtnTxt);
      const addOneMoreBtnStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          addOneMorebtnTxt,
        );
      }, 5000);
      logger.info(
        'Add one more Btn Translation Status  : ' + addOneMoreBtnStatus,
      );
      productDescriptionPage.clickAddOneMoreBtn();
      const addOneMorenotification: any = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      logger.info('Add One More Notification  : ' + addOneMorenotification);
      const addOneMorenotificationStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          addOneMorenotification,
        );
      }, 5000);
      logger.info(
        'Add One More Translation Status  : ' + addOneMorenotificationStatus,
      );
      checkoutPage.closeAllNotification();
      // Shopping Bag Count after Add to Bag
      const shoppingBagLnkAfterCount: any = shoppingBagPage.getNumberOfShoppingBagProduct();
      logger.info(
        'Shopping Bag Link After Count  : ' + shoppingBagLnkAfterCount,
      );
      expect(shoppingBagLnkAfterCount).gt(shoppingBagLnkBeforeCount);
      // Click Checkout Btn
      const checkoutBtnClick = browser.waitUntil(() => {
        return productDescriptionPage.checkoutBtn.isClickable();
      }, 5000);
      logger.info('Checkout Btn is Clickable  : ' + checkoutBtnClick);
      expect(checkoutBtnClick).to.equal(true);
      const checkoutbtnTxt: any = browser.waitUntil((): any => {
        return productDescriptionPage.getCheckoutBtnTxt();
      }, 5000);
      logger.info('Checkout Btn Txt  :  ' + checkoutbtnTxt);
      const checkoutbtnBtnStatus = browser.waitUntil(() => {
        return productDescriptionPage.validatePdpContent(
          currentLang,
          checkoutbtnTxt,
        );
      }, 5000);
      logger.info('Checkout Btn Translation Status  : ' + checkoutbtnBtnStatus);
      expect(checkoutbtnBtnStatus).to.equal(true);
      productDescriptionPage.clickCheckoutBtn();
      // Go to Shopping Bag Page
      const pageHeading: any = browser.waitUntil((): any => {
        return shoppingBagPage.getShoppingBagHeading();
      }, 5000);
      logger.info('Page Heading  :  ' + pageHeading);
      shoppingBagPage.clickRemoveItemBtn();
      logger.info('========================================');
      // Return to PDP
      browser.back();
      browser.waitUntil(() => {
        return productDescriptionPage.addToBagBtn.isDisplayed();
      }, 5000);
      // Static wait required to redirect back to PDP.
      browser.pause(2000);
    }
  });
});
