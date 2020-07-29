import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import notification from '../../../methods/GetNotification';
import { productListingTestData } from '../../../resources/productListingTestData';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate as a logged out user order total on shopping bag page with selected countries', () => {
  let country = [];
  it('should navigate to men section and click on first product ', () => {
    navigationPage.clickOnMenOuterLink();
  });
  it('Should validate that sale feature is enabled', () => {
    logger.info('Sale Link Present : ' + navigationPage.isSaleLinkExist());
    assert.equal(
      navigationPage.isSaleLinkExist(),
      true,
      productListingTestData.Sale_Link_Display_Error,
    );
  });
  // Sale
  it('Should navigate to sale plp and click on first product', () => {
    logger.info('----Sale Product-----');
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    productListingPage.goToPlp(
      productListingTestData.sale_gender_male,
      productListingTestData.go_to_sale,
    );
    browser.waitUntil((): any => {
      return productListingPage.getfirstSaleProductPrice();
    }, 5000);
    productListingPage.selectFirstProduct(
      productListingTestData.sale_gender_female,
      productListingTestData.go_to_sale,
    );
  });
  it('Should select size and add product to shopping bag', () => {
    browser.waitUntil((): any => {
      return browser.getTitle();
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
  });
  // Non-Sale
  it('Should navigate to Non-sale plp and click on first product', () => {
    logger.info('----Non-Sale Product-----');
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    productListingPage.goToPlp(
      productListingTestData.sale_gender_male,
      productListingTestData.go_to_plp,
    );
    browser.waitUntil((): any => {
      return productListingPage.getfirstProductPrice();
    }, 5000);
    productListingPage.getNonSaleProducts();
  });
  it('Should select size and add product to shopping bag', () => {
    browser.waitUntil((): any => {
      return browser.getTitle();
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

    shoppingBagPage.clickShoppingBag();
  });
  it('Should land on shopping bag page and verify prices and add TOTAL', () => {
    country = shoppingBagTestData.countryArray;
    for (let index = 0; index < country.length; index += 1) {
      if (index > 0) {
        shoppingBagPage.selectCountry(country[index]);
      }
      browser.waitUntil((): any => {
        return shoppingBagPage.getShoppingBagHeading();
      }, 5000);
      const checkPriceFirstProduct = shoppingBagPage.getFirstPriceText();
      logger.info('First Product Price === >' + checkPriceFirstProduct);
      const checkPriceSecondProduct = shoppingBagPage.getSecondPriceText();
      logger.info('Second Product Price === >' + checkPriceSecondProduct);
      const sbPrices: any = browser.waitUntil((): any => {
        return shoppingBagPage.getProductPrices();
      }, 5000);
      logger.info('Shopping Bag Prices : ' + sbPrices);
      const checkPrices: any = sbPrices.slice(',');
      logger.info('First Product Price Digit :' + checkPrices[0]);
      logger.info('Second Product Price Digit :' + checkPrices[1]);
      const checkTotalOrder = checkPrices[0] + checkPrices[1];
      logger.info('==== Check Total Price ====');
      logger.info(' Order Total === > ' + checkTotalOrder);
      const orderTotal = shoppingBagPage.getOrderTotalPriceText();
      expect(orderTotal).to.contains(checkTotalOrder);
    }
  });
});
