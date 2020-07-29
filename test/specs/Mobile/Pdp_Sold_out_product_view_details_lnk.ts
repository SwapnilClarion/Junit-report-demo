import mobileNavigationPage from '../../../pageObjects/mobile/NavigationPage';
import mobileProductDescriptionPage from '../../../pageObjects/mobile/ProductDescriptionPage';
import mobileProductListingPage from '../../../pageObjects/mobile/ProductListingPage';
import { logger } from '../../../config/winstonLogger';
import { globalTestData } from '../../../resources/globalTestData';
import { expect } from 'chai';
import { navigationTestData } from 'resources/navigationTestData';
globalTestData.FILE_PATH = __filename;
describe(
  'Validate that user is able to see view details link for sold-out product and ' +
    'Sale product in mobile view ',
  () => {
    let langArr: any = [];
    let currentLang: any;
    it('Should populate the language array', () => {
      mobileNavigationPage.clickMobileMainMenu();
      mobileNavigationPage.clickLanguageLink();
      currentLang = browser.waitUntil((): any => {
        return mobileNavigationPage.getCurrentActiveLangTxt();
      }, 5000);
      logger.info('Current Active Lang  : ' + currentLang);
      mobileNavigationPage.clickNavigationBackBtn();
      mobileNavigationPage.clickMobileMainMenu();
      // Static wait added to load the DOM to fetch all languages
      browser.pause(4000);
      langArr = browser.waitUntil(() => {
        return mobileNavigationPage.getLanguages(currentLang);
      }, 5000);
      logger.info('Lang Arr  : ' + langArr);
    });
    it('Should verify the view details link is displayed and Clickable', () => {
      logger.info('============Sold-out Product================');
      for (let index = 0; index < langArr.length; index += 1) {
        if (index > 0) {
          mobileNavigationPage.selectLanguage(langArr, index);
        }
        mobileNavigationPage.clickMobileMainMenu();
        browser.waitUntil((): any => {
          return mobileNavigationPage.mobileMenLink.isDisplayed();
        }, 5000);
        mobileNavigationPage.clickMobileMenLink();
        browser.waitUntil((): any => {
          return mobileNavigationPage.mobileTrending.isDisplayed();
        }, 5000);
        mobileNavigationPage.clickMobileTrending();
        // Static wait required for pipeline
        browser.pause(2000);
        mobileProductListingPage.clickFourthProduct();
        browser.waitUntil((): any => {
          return mobileProductDescriptionPage.hideViewLnk.isDisplayed();
        }, 5000);
        mobileProductDescriptionPage.clickHideViewLnk();
        const viewDetailLnkDisplay = browser.waitUntil(() => {
          return mobileProductDescriptionPage.hideViewLnk.isDisplayed();
        }, 5000);
        logger.info(
          'View Details Link is Displayed  : ' + viewDetailLnkDisplay,
        );
        const viewDetailLnkClickable = browser.waitUntil(() => {
          return mobileProductDescriptionPage.hideViewLnk.isClickable();
        }, 5000);
        logger.info(
          'View Details Link is Clickable  : ' + viewDetailLnkClickable,
        );
        const viewDetailsTxt = browser.waitUntil((): any => {
          return mobileProductDescriptionPage.getHideViewLnkTxt();
        }, 5000);
        logger.info('View details lnk Text  : ' + viewDetailsTxt);
        mobileProductDescriptionPage.clickHideViewLnk();
        const productInfoDisplay = browser.waitUntil(() => {
          return mobileProductDescriptionPage.productInfoSection.isDisplayed();
        }, 5000);
        logger.info('Product Info is Displayed  : ' + productInfoDisplay);
        mobileNavigationPage.clickMobileMainMenu();
        mobileNavigationPage.clickNavigationBackBtn();
        mobileNavigationPage.clickMobileMainMenu();
        // Static wait required to load DOM
        browser.pause(2000);
        logger.info('===================================');
      }
    });
    it('Should navigate to homepage', () => {
      browser.navigateTo(navigationTestData.homepageURL);
      browser.waitUntil((): any => {
        return browser.getTitle();
      }, 5000);
    });
    it('Should verify the view details link is not displayedfor Sale Product ', () => {
      logger.info('============Sale Product================');
      for (let index = 0; index < langArr.length; index += 1) {
        if (index > 0) {
          mobileNavigationPage.selectLanguage(langArr, index);
        }
        mobileNavigationPage.clickMobileMainMenu();
        browser.waitUntil((): any => {
          return mobileNavigationPage.mobileMenLink.isDisplayed();
        }, 5000);
        mobileNavigationPage.clickMobileMenLink();
        browser.waitUntil((): any => {
          return mobileNavigationPage.mobileTrending.isDisplayed();
        }, 5000);
        mobileNavigationPage.clickSaleNavLink();
        browser.waitUntil((): any => {
          return mobileNavigationPage.allMenSaleLnk.isDisplayed();
        }, 5000);
        mobileNavigationPage.clickAllMenSaleLnk();
        browser.waitUntil((): any => {
          return mobileProductListingPage.mobileFirstProduct.isDisplayed();
        }, 5000);
        mobileProductListingPage.clickFirstProductMobileView();
        const viewDetailLnkDisplay = mobileProductDescriptionPage.hideViewLnk.isDisplayed();
        logger.info(
          'View Details Link is Displayed  : ' + viewDetailLnkDisplay,
        );
        expect(viewDetailLnkDisplay).to.equal(false);
        mobileNavigationPage.clickMobileMainMenu();
        mobileNavigationPage.clickNavigationBackBtn();
        mobileNavigationPage.clickNavigationBackBtn();
        mobileNavigationPage.clickMobileMainMenu();
        // Static wait required to load DOM
        browser.pause(2000);
        logger.info('===================================');
      }
    });
  },
);
