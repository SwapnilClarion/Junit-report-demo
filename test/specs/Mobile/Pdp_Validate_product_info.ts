import mobileNavigationPage from '../../../pageObjects/mobile/NavigationPage';
import mobileProductDescriptionPage from '../../../pageObjects/mobile/ProductDescriptionPage';
import mobileProductListingPage from '../../../pageObjects/mobile/ProductListingPage';
import { logger } from '../../../config/winstonLogger';
import { productDescriptionTestData } from '../../../resources/mobile/productDescriptionTestData';
import { globalTestData } from '../../../resources/globalTestData';
import { expect } from 'chai';
globalTestData.FILE_PATH = __filename;
describe('Validate that product info in PDP page, mobile view ', () => {
  let plpBrandName: any = '';
  let langArr: any = [];
  let currentLang: any;
  let extractid: any = '';
  let extractProductName: any = '';
  it('Should populate the language array', () => {
    mobileNavigationPage.clickMobileMainMenu();
    mobileNavigationPage.clickLanguageLink();
    currentLang = browser.waitUntil((): any => {
      return mobileNavigationPage.getCurrentActiveLangTxt();
    }, 5000);
    logger.info('Current Active Lang  : ' + currentLang);
    mobileNavigationPage.clickNavigationBackBtn();
    mobileNavigationPage.clickMobileMainMenu();
    // Static wait required for the nav menu and resirect to the main page
    browser.pause(2000);
    langArr = browser.waitUntil(() => {
      return mobileNavigationPage.getLanguages(currentLang);
    }, 5000);
    logger.info('Lang Arr  : ' + langArr);
  });
  it('Should validate product info', () => {
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
      plpBrandName = mobileProductListingPage.getFirstProductHeading();
      logger.info('First Product Name  :  ' + plpBrandName);
      mobileProductListingPage.clickFirstProductMobileView();
      const brandName: boolean = browser.waitUntil(() => {
        return mobileProductDescriptionPage.mobileProductBrandName.isDisplayed();
      }, 5000);
      logger.info('Brand Name Display Status : ' + brandName);
      // Get details from products JSON page
      const currentURL: any = browser.getUrl();
      browser.url(currentURL + '.json');
      const sourceData = browser.getPageSource();
      const matched = sourceData.match(/<pre[^>]*>([\w|\W]*)<\/pre>/im);
      extractid = JSON.parse(matched[1]).product.id;
      logger.info('Extracted Product id is === > ' + extractid);
      extractProductName = JSON.parse(matched[1]).product.name;
      logger.info('Extracted Product Name is === > ' + extractProductName);
      browser.back();
      // Static wait required for transition from json page back to pdp page.
      browser.pause(2000);
      // -----------Fetch JSON END-------------
      // Brand Name
      const brandNameAlign = browser.waitUntil(() => {
        return mobileProductDescriptionPage.getProductBrandNameAlign();
      }, 5000);
      logger.info('Brand name Align  : ' + brandNameAlign);
      expect(brandNameAlign).to.include(
        productDescriptionTestData.brand_name_align,
      );
      // Upper case
      const brandNameCase = mobileProductDescriptionPage.getproductBrandNameCase();

      logger.info('Brand name Case  : ' + brandNameCase);
      expect(brandNameCase).to.include(
        productDescriptionTestData.brand_name_case,
      );
      // Brand Name
      const productBrandName = browser.waitUntil((): any => {
        return mobileProductDescriptionPage.getMobileProductBrandName();
      }, 5000);
      logger.info('Brand Name  : ' + productBrandName);
      expect(productBrandName).to.includes(plpBrandName.toUpperCase());
      mobileProductDescriptionPage.clickProductBrandName();
      // Brand PLP
      const brandPlpHeading = browser.waitUntil((): any => {
        return mobileProductListingPage.getBrandPlpPageHeading();
      }, 5000);
      logger.info('Brand PLP Heading  : ' + brandPlpHeading);
      browser.back();
      browser.waitUntil(() => {
        return mobileProductDescriptionPage.mobileProductBrandName.isDisplayed();
      }, 5000);
      // Product Name
      const productNameDisplay = browser.waitUntil(() => {
        return mobileProductDescriptionPage.mobileProductName.isDisplayed();
      }, 5000);
      logger.info('Product Name Display Status : ' + productNameDisplay);
      const productName = browser.waitUntil((): any => {
        return mobileProductDescriptionPage.getMobileProductName();
      }, 5000);
      logger.info('Product Name : ' + productName);
      logger.info('Product Name === Extracted Product Name');
      logger.info(productName + ' === ' + extractProductName);
      expect(productName).to.include(extractProductName);
      // Description
      const productDescriptionClickable = browser.waitUntil(() => {
        return mobileProductDescriptionPage.mobileProductDescription.isClickable();
      }, 5000);
      logger.info('Description is Clickable : ' + productDescriptionClickable);
      const productDescription: any = browser.waitUntil((): any => {
        return mobileProductDescriptionPage.getMobileProductDescription();
      }, 5000);
      logger.info('Description  : ' + productDescription);
      // Navigate Nav Menu
      mobileNavigationPage.clickMobileMainMenu();
      mobileNavigationPage.clickNavigationBackBtn();
      mobileNavigationPage.clickMobileMainMenu();
      // Static wait required for the DOM to load
      browser.pause(2000);
      logger.info('===================================');
    }
  });
});
