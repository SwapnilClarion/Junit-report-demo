import loginPage from '../../../pageObjects/LoginPage';
import signupMethods from '../../../methods/Login_SignUpMethods';
import navigationPage from '../../../pageObjects/NavigationPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import { logger } from '../../../config/winstonLogger';
import { expect } from 'chai';
import assert from 'assert';
import { randomData } from '../../../utils/random_data';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import { productListingTestData } from '../../../resources/productListingTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { navigationTestData } from '../../../resources/navigationTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe(
  'Validate sorting options in regular PLP and Search PLP' +
    ' for Guest/Logged-Out,Logged-In User',
  () => {
    let langArr: any = [];
    let sortLnkTxt: any = [];
    let lnkDataStatus: boolean;
    it('Should populate the language array', () => {
      logger.info('==============Regular PLP==========');
      logger.info('==============Guest/Logged-out User==========');
      langArr = browser.waitUntil(() => {
        return navigationPage.getLanguages();
      }, 5000);
      logger.info('Lang Arr ===> ' + langArr);
    });
    it('Should go to  PLP and verify the sorting options', () => {
      productListingPage.goToPlp(
        productListingTestData.sale_gender_male,
        productListingTestData.go_to_plp,
      );
      browser.waitUntil(() => {
        return productListingPage.firstProduct.isDisplayed();
      }, 5000);

      for (let index = 0; index < langArr.length; index += 1) {
        if (index > 0) {
          navigationPage.selectLanguage(index);
        }
        sortLnkTxt = browser.waitUntil((): any => {
          return productListingPage.getSortingLinks();
        }, 5000);
        logger.info('Visible Links  : ' + sortLnkTxt);
        browser.waitUntil(() => {
          return productListingPage.firstProduct.isDisplayed();
        }, 5000);
        lnkDataStatus = productListingPage.checkSortingOptions(
          langArr[index],
          sortLnkTxt,
        );
        logger.info('Links Compare Status : ' + lnkDataStatus);
        expect(lnkDataStatus).to.equal(true);
        logger.info('========================================');
      }
    });
    it('Should go to home page', () => {
      logger.info('===============Logged-In User==============');
      browser.navigateTo(navigationTestData.homepageURL);
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
      signupMethods.signup(
        userEmail,
        randomData.USER_PASSWORD,
        loginSignUpTestData.NO_THANKS_PROMO,
      );
      browser.waitUntil(() => {
        return accountDetailsPage.AccountDetailsHeading.isDisplayed();
      }, 5000);
    });
    it('Should go to PLP and verify the sorting options', () => {
      browser.waitUntil((): any => {
        return accountDetailsPage.firstNameInput.isDisplayed();
      }, 5000);
      productListingPage.goToPlp(
        productListingTestData.sale_gender_male,
        productListingTestData.go_to_plp,
      );
      browser.waitUntil(() => {
        return productListingPage.firstProduct.isDisplayed();
      }, 5000);

      for (let index = 0; index < langArr.length; index += 1) {
        if (index > 0) {
          navigationPage.selectLanguage(index);
        }
        sortLnkTxt = browser.waitUntil((): any => {
          return productListingPage.getSortingLinks();
        }, 5000);
        logger.info('Visible Links  : ' + sortLnkTxt);
        browser.waitUntil(() => {
          return productListingPage.firstProduct.isDisplayed();
        }, 5000);
        lnkDataStatus = productListingPage.checkSortingOptions(
          langArr[index],
          sortLnkTxt,
        );
        logger.info('Links Compare Status : ' + lnkDataStatus);
        expect(lnkDataStatus).to.equal(true);
        logger.info('========================================');
      }
    });
    it('Should go to home page', () => {
      browser.navigateTo(navigationTestData.homepageURL);
      navigationPage.clickOnAccountLink();
      navigationPage.clickOnLogoutLink();
      checkoutPage.closeAllNotification();
      logger.info('==============Search PLP==========');
      logger.info('==============Guest/Logged-out User==========');
    });
    it('Should enter search content and go to search PLP and verify the sorting options', () => {
      browser.waitUntil((): any => {
        return navigationPage.loginLink.isDisplayed();
      }, 5000);
      navigationPage.clickOnSearchLink();
      navigationPage.enterSearchInput(
        productListingTestData.search_plp_product,
      );
      browser.keys('Enter');
      browser.waitUntil(() => {
        return productListingPage.firstProduct.isDisplayed();
      }, 5000);
      for (let index = 0; index < langArr.length; index += 1) {
        if (index > 0) {
          navigationPage.selectLanguage(index);
        }
        sortLnkTxt = browser.waitUntil((): any => {
          return productListingPage.getSortingLinks();
        }, 5000);
        logger.info('Visible Links  : ' + sortLnkTxt);
        browser.waitUntil(() => {
          return productListingPage.firstProduct.isDisplayed();
        }, 5000);
        lnkDataStatus = productListingPage.checkSortingOptions(
          langArr[index],
          sortLnkTxt,
        );
        logger.info('Links Compare Status : ' + lnkDataStatus);
        expect(lnkDataStatus).to.equal(true);
        logger.info('========================================');
      }
    });
    it('Should go to home page', () => {
      logger.info('===============Logged-In User==============');
      browser.navigateTo(navigationTestData.homepageURL);
    });
    it('Should validate that login in link is present and perform signup', () => {
      assert.equal(
        loginPage.isLoginLinkExist(),
        true,
        loginSignUpTestData.Login_Link_Display_Error,
      );
      const userEmail = randomData.GUEST_GMAIL_Email;
      logger.info(' User Email  :  ' + userEmail);
      navigationPage.clickOnLoginLink();
      signupMethods.signup(
        userEmail,
        randomData.USER_PASSWORD,
        loginSignUpTestData.NO_THANKS_PROMO,
      );
      browser.waitUntil(() => {
        return accountDetailsPage.AccountDetailsHeading.isDisplayed();
      }, 5000);
    });
    it('Should enter search content and go to search PLP and verify the sorting options', () => {
      browser.waitUntil((): any => {
        return accountDetailsPage.firstNameInput.isDisplayed();
      }, 5000);
      navigationPage.clickOnSearchLink();
      navigationPage.enterSearchInput(
        productListingTestData.search_plp_product,
      );
      browser.keys('Enter');
      browser.waitUntil(() => {
        return productListingPage.firstProduct.isDisplayed();
      }, 5000);
      for (let index = 0; index < langArr.length; index += 1) {
        if (index > 0) {
          navigationPage.selectLanguage(index);
        }
        sortLnkTxt = browser.waitUntil((): any => {
          return productListingPage.getSortingLinks();
        }, 5000);
        logger.info('Visible Links  : ' + sortLnkTxt);
        browser.waitUntil(() => {
          return productListingPage.firstProduct.isDisplayed();
        }, 5000);
        lnkDataStatus = productListingPage.checkSortingOptions(
          langArr[index],
          sortLnkTxt,
        );
        logger.info('Links Compare Status : ' + lnkDataStatus);
        expect(lnkDataStatus).to.equal(true);
        logger.info('========================================');
      }
    });
  },
);
