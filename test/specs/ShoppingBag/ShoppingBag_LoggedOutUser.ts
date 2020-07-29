import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import { logger } from '../../../config/winstonLogger';
import { expect } from 'chai';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Shopping Bag State for logged out user', () => {
  it('should navigate to men section and click on first product ', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });

  it('should select size and add it to bag ', () => {
    const sizeCheck: any = browser.waitUntil(() => {
      return productDescriptionPage.selectSize();
    }, 5000);
    productDescriptionPage.addSize(sizeCheck);
    productDescriptionPage.clickAddToBag();
    productDescriptionPage.clickCheckoutBtn();
  });
  it('should detect if an email address filed is empty', () => {
    const ChkfieldEmpty = shoppingBagPage.checkEmailFieldEmpty();
    logger.info('check email field is empty --' + ChkfieldEmpty);
  });
  it('should detect proceed to checkout is clickable', () => {
    const clickable = browser.waitUntil(() => {
      return shoppingBagPage.checkProceedBtn();
    });
    logger.info('check proceed clickable --' + clickable);
    expect(clickable).to.equal(true);
  });
  it('should email adress is editable', () => {
    const fieldEditable = browser.waitUntil(() => {
      return shoppingBagPage.checkEmailEditable();
    });
    logger.info('check email editable -' + fieldEditable);
    expect(fieldEditable).to.equal(true);
  });
});
