import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import { logger } from '../../../config/winstonLogger';
import { expect } from 'chai';
import assert from 'assert';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate for Access PDP from Shopping Bag Page', () => {
  let langArr: any = [];
  let extractid: any = '';
  let extractProductName: any = '';
  let extractProductDescription: any = '';
  let extractBrandName: any = '';
  let brandPlpName: any = '';
  it('Should populate the language array', () => {
    langArr = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
    logger.info('Lang Arr ===> ' + langArr);
  });
  it('should navigate to men section and click on first product and add to bag', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    browser.waitUntil((): any => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    for (let index = 0; index < langArr.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
        // This static wait is required for loading language for active country
        browser.pause(3000);
      }
      const currentURL: any = browser.getUrl();
      browser.url(currentURL + '.json');
      const sourceData = browser.getPageSource();
      const matched = sourceData.match(/<pre[^>]*>([\w|\W]*)<\/pre>/im);
      extractid = JSON.parse(matched[1]).product.id;
      logger.info('Extracted Product id is === > ' + extractid);
      extractProductName = JSON.parse(matched[1]).product.name;
      logger.info('Extracted Product Name is === > ' + extractProductName);
      const stringDescription = JSON.parse(matched[1]).product.description;
      extractProductDescription = stringDescription
        .toString()
        .replace(/\n|\r|br/g, '');
      logger.info('\n');
      logger.info(
        'Extracted Product Description is === > ' + extractProductDescription,
      );
      extractBrandName = JSON.parse(matched[1]).product.brand.name;
      logger.info('Extracted Brand Name is === > ' + extractBrandName);
      browser.navigateTo(currentURL);
      logger.info('On PDP Page');
      const displayedandnotclickable: any = browser.waitUntil((): any => {
        return productDescriptionPage.checkProductName();
      }, 5000);
      logger.info(
        'Product Name is Displayed and Not clickable === > ' +
          displayedandnotclickable,
      );
      const displayTextName = browser.waitUntil((): any => {
        return productDescriptionPage.getProductName();
      }, 5000);
      logger.info('Displayed Product Name is === > ' + displayTextName);
      assert.equal(extractProductName, displayTextName);
      const desc: any = browser.waitUntil((): any => {
        return productDescriptionPage.checkProductDesc();
      }, 5000);
      logger.info(
        'Product Description is Displayed and Not clickable === > ' + desc,
      );
      const displayProductDesc = browser.waitUntil((): any => {
        return productDescriptionPage.getProductDesc();
      }, 5000);
      logger.info('Displayed Product Desc is === > ' + displayProductDesc);
      assert.equal(extractProductDescription, displayProductDesc);
      const brandClickable: any = browser.waitUntil((): any => {
        return productDescriptionPage.checkBrandName();
      });
      logger.info('Brand Name link is clickable === > ' + brandClickable);
      expect(brandClickable).to.equal(true);
      const displayedBrandName: any = browser.waitUntil((): any => {
        return productDescriptionPage.getTextName();
      }, 5000);
      logger.info('Displayed Brand Name is === > ' + displayedBrandName);
      assert.equal(extractBrandName, displayedBrandName);
      productDescriptionPage.clickBrandName();
      brandPlpName = productListingPage.getDisplayedBrandName();
      logger.info(
        'check Displayed brand PLP Name on Brand PLP page === > ' +
          brandPlpName,
      );
      assert.equal(brandPlpName, displayedBrandName);
      browser.back();
      logger.info('==============================================');
      // static wait is required to enable browser to go back to PDP page and perform language specific operation
      browser.pause(2000);
    }
  });
});
