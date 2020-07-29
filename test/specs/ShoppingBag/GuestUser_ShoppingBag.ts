import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Shopping Bag State for logged out user', () => {
  let userEmail: any = '';
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
  });
  it('should navigate to shopping bag page', () => {
    productDescriptionPage.clickCheckoutBtn();
    browser.waitUntil(() => {
      return browser.getTitle() === shoppingBagTestData.shoppingBagTitle;
    }, 5000);
    const url = browser.getTitle();
    expect(url).to.equal(shoppingBagTestData.shoppingBagTitle);
  });
  it('should detect if an email address field is empty', () => {
    const ChkfieldEmpty = shoppingBagPage.checkEmailFieldEmpty();
    logger.info('check email field is empty === > ' + ChkfieldEmpty);
    expect(ChkfieldEmpty).to.equal(true);
  });
  it('should detect proceed to checkout button is clickable', () => {
    const clickable = browser.waitUntil(() => {
      return shoppingBagPage.checkProceedBtn();
    });
    logger.info(
      ' check proceed to checkout button is clickable === > ' + clickable,
    );
    expect(clickable).to.equal(true);
  });
  it('should check email address field is editable', () => {
    const fieldEditable = browser.waitUntil(() => {
      return shoppingBagPage.checkEmailEditable();
    });
    logger.info('check email address field is editable === > ' + fieldEditable);
    expect(fieldEditable).to.equal(true);
  });
  it('should enter guest email id', () => {
    userEmail = randomData.GUEST_EMAIL;
    shoppingBagPage.enterUserEmail(userEmail);
    shoppingBagPage.clickAcceptEmailCheckoutBtn();
  });
  it('should land on checkout page and navigate back to shoppingbag page', () => {
    browser.waitUntil(
      () => {
        return browser.getTitle() === checkoutTestData.CheckoutPageTitle;
      },
      5000,
      checkoutTestData.CheckoutPageLoadingMessage,
    );
    logger.info('Checkout Page Title === > ' + browser.getTitle());
    browser.back();
  });
  it('should check with shopping bag page title ', () => {
    browser.waitUntil(() => {
      return browser.getTitle() === shoppingBagTestData.shoppingBagTitle;
    }, 5000);
    const checkTitle = browser.getTitle();
    expect(checkTitle).to.equal(shoppingBagTestData.shoppingBagTitle);
    logger.info('check shopping bag page title === > ' + checkTitle);
  });
  it('should check guest email address pre-populated in the email address field', () => {
    let populatedEmail: any = '';
    populatedEmail = browser.waitUntil((): any => {
      return shoppingBagPage.checkPopulatedEmailId();
    }, 5000);
    expect(userEmail).to.equal(populatedEmail);
    logger.info('check registered email === > ' + userEmail);
    logger.info('check prepopulated email === > ' + populatedEmail);
  });
  it('should check proceed to checkout button is clickable and displayed', () => {
    const clickable = browser.waitUntil(() => {
      return shoppingBagPage.checkProceedBtn();
    });
    logger.info(
      'check proceed to checkout button is clickable === > ' + clickable,
    );
    expect(clickable).to.equal(true);
  });
  it('should check for email address field is editable', () => {
    const fieldEditable = browser.waitUntil(() => {
      return shoppingBagPage.checkEmailEditable();
    });
    logger.info(
      'check listed email address field editable === > ' + fieldEditable,
    );
    expect(fieldEditable).to.equal(true);
  });
});
