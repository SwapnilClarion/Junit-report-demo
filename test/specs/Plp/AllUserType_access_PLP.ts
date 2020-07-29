import loginPage from '../../../pageObjects/LoginPage';
import signupMethods from '../../../methods/Login_SignUpMethods';
import navigationPage from '../../../pageObjects/NavigationPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import { navigationTestData } from 'resources/navigationTestData';
import { productListingTestData } from '../../../resources/productListingTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { logger } from '../../../config/winstonLogger';
import { expect } from 'chai';
import assert from 'assert';
import { randomData } from '../../../utils/random_data';
describe('Validate a user should land on gender specific PLP', () => {
  let langArr: any = [];
  let menPlpProdId: any = 0;
  let womenPlpProdId: any = 0;

  it('Should populate the language array', () => {
    logger.info('==============Guest/Logged-out User==========');
    langArr = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
    logger.info('Lang Arr ===> ' + langArr);
  });
  it('Should select the language and go to Mens PLP', () => {
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
      const maleLnk = browser.waitUntil((): any => {
        return navigationPage.getCurrentLnkTxt();
      }, 5000);
      logger.info('Selected Gender : ' + maleLnk);
      const currentUrl: any = browser.waitUntil((): any => {
        return browser.getUrl();
      }, 5000);
      const genderLnk = currentUrl.trim().split('/');
      logger.info('Gender in URL  :  ' + genderLnk[genderLnk.length - 1]);
      expect(productListingTestData.plp_men_translations).to.include(
        genderLnk[genderLnk.length - 1].toUpperCase(),
      );
      const menTranslation = browser.waitUntil((): any => {
        return productListingTestData.plp_men_translations[index];
      }, 5000);
      logger.info('TranslationLnk : ' + menTranslation);
      menPlpProdId = browser.waitUntil((): any => {
        return productListingPage.getFirstProductId();
      }, 5000);
      logger.info('Product Id  : ' + menPlpProdId);
      logger.info(menTranslation + '===' + maleLnk[0]);
      expect(maleLnk[0]).equal(menTranslation);
      logger.info('========================================');
    }
    browser.navigateTo(navigationTestData.homepageURL);
  });
  it('Should select the language and go to Womens PLP', () => {
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    productListingPage.goToPlp(
      productListingTestData.sale_gender_female,
      productListingTestData.go_to_plp,
    );
    browser.waitUntil(() => {
      return productListingPage.firstProduct.isDisplayed();
    }, 5000);
    for (let index = 0; index < langArr.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
      }
      browser.waitUntil((): any => {
        return browser.getTitle();
      }, 5000);
      const femaleLnk = browser.waitUntil((): any => {
        return navigationPage.getCurrentLnkTxt();
      }, 5000);
      logger.info('Selected Gender : ' + femaleLnk[0]);
      const currentUrl: any = browser.waitUntil((): any => {
        return browser.getUrl();
      }, 5000);
      const genderLnk: any = currentUrl.trim().split('/');
      logger.info('Gender in URL  :  ' + genderLnk[genderLnk.length - 1]);
      expect(productListingTestData.plp_women_translations).to.include(
        genderLnk[genderLnk.length - 1].toUpperCase(),
      );
      const womenTranslation = browser.waitUntil((): any => {
        return productListingTestData.plp_women_translations[index];
      }, 5000);
      logger.info('TranslationLnk : ' + womenTranslation);
      womenPlpProdId = browser.waitUntil((): any => {
        return productListingPage.getFirstProductId();
      }, 5000);
      logger.info('Product Id  : ' + womenPlpProdId);
      logger.info(womenTranslation + '===' + femaleLnk);
      expect(femaleLnk[0]).equal(womenTranslation);
      logger.info('========================================');
    }
  });
  it('Should verify the products from mens plp and womens plp are different', () => {
    logger.info(menPlpProdId + '!==' + womenPlpProdId);
    expect(menPlpProdId).to.not.equal(womenPlpProdId);
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
  it('Should select the language and go to Mens PLP', () => {
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
      const maleLnk = browser.waitUntil((): any => {
        return navigationPage.getCurrentLnkTxt();
      }, 5000);
      logger.info('Selected Gender : ' + maleLnk);
      const currentUrl: any = browser.waitUntil((): any => {
        return browser.getUrl();
      }, 5000);
      const genderLnk = currentUrl.trim().split('/');
      logger.info('Gender in URL  :  ' + genderLnk[genderLnk.length - 1]);
      expect(productListingTestData.plp_men_translations).to.include(
        genderLnk[genderLnk.length - 1].toUpperCase(),
      );
      const menTranslation = browser.waitUntil((): any => {
        return productListingTestData.plp_men_translations[index];
      }, 5000);
      logger.info('TranslationLnk : ' + menTranslation);
      menPlpProdId = browser.waitUntil((): any => {
        return productListingPage.getFirstProductId();
      }, 5000);
      logger.info('Product Id  : ' + menPlpProdId);
      logger.info(menTranslation + '===' + maleLnk[0]);
      expect(maleLnk[0]).equal(menTranslation);
      logger.info('========================================');
    }
    browser.navigateTo(navigationTestData.homepageURL);
  });
  it('Should select the language and go to Womens PLP', () => {
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    productListingPage.goToPlp(
      productListingTestData.sale_gender_female,
      productListingTestData.go_to_plp,
    );
    browser.waitUntil(() => {
      return productListingPage.firstProduct.isDisplayed();
    }, 5000);
    for (let index = 0; index < langArr.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
      }
      browser.waitUntil((): any => {
        return browser.getTitle();
      }, 5000);
      const femaleLnk = browser.waitUntil((): any => {
        return navigationPage.getCurrentLnkTxt();
      }, 5000);
      logger.info('Selected Gender : ' + femaleLnk);
      const currentUrl: any = browser.waitUntil((): any => {
        return browser.getUrl();
      }, 5000);
      const genderLnk: any = currentUrl.trim().split('/');
      logger.info('Gender in URL  :  ' + genderLnk[genderLnk.length - 1]);
      expect(productListingTestData.plp_women_translations).to.include(
        genderLnk[genderLnk.length - 1].toUpperCase(),
      );
      const womenTranslation = browser.waitUntil((): any => {
        return productListingTestData.plp_women_translations[index];
      }, 5000);
      logger.info('TranslationLnk : ' + womenTranslation);
      womenPlpProdId = browser.waitUntil((): any => {
        return productListingPage.getFirstProductId();
      }, 5000);
      logger.info('Product Id  : ' + womenPlpProdId);
      logger.info(womenTranslation + '===' + femaleLnk[0]);
      expect(femaleLnk[0]).equal(womenTranslation);
      logger.info('========================================');
    }
  });
  it('Should verify the products from mens plp and womens plp are different', () => {
    logger.info(menPlpProdId + '!==' + womenPlpProdId);
    expect(menPlpProdId).to.not.equal(womenPlpProdId);
  });
});
