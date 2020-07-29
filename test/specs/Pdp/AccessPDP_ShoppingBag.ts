import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import { logger } from '../../../config/winstonLogger';
import helpers from '../../../utils/helpers';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import assert from 'assert';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate for Access PDP from Shopping Bag Page', () => {
  let displayedName: any = '';
  let userEmail: any = '';
  let email: any = '';
  let shoppingBagProductID: any;
  let PDPProductId: any;
  it('should navigate to men section and click on first product and add to bag', () => {
    logger.info('============= Logged Out User Scenario ================');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    productDescriptionPage.addToBag();
  });
  it('should navigate to shopping bag page', () => {
    productDescriptionPage.clickCheckoutBtn();
    browser.waitUntil((): any => {
      return browser.getTitle() === shoppingBagTestData.shoppingBagTitle;
    }, 5000);
    const url: any = browser.getTitle();
    expect(url).to.equal(shoppingBagTestData.shoppingBagTitle);
    logger.info('On Shopping Bag Page');
  });
  it('should check for Product name is clickable', () => {
    const clickable: any = browser.waitUntil((): any => {
      return shoppingBagPage.checkBrandName();
    });
    logger.info(' Product Name link is clickable === > ' + clickable);
    expect(clickable).to.equal(true);
  });
  it('should get value of Product Details', () => {
    displayedName = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedName();
    }, 5000);
    logger.info('Selected Product Name is === > ' + displayedName);
    const prodDesc: any = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedProductDescription();
    }, 5000);
    logger.info('Selected Product Description is === > ' + prodDesc);
    const prodSize: any = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedProductSize();
    }, 5000);
    logger.info('Selected Product Size is === > ' + prodSize);
    const prodCode: any = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedProductCode();
    }, 5000);
    logger.info('Selected Product Code is === > ' + prodCode);
    const productURLonShoppingBag = shoppingBagPage.extractProductUrlShoppingBag();
    shoppingBagProductID = helpers.getProductID(productURLonShoppingBag);
    logger.info('PRODUCT ID for Shopping Bag is === > ' + shoppingBagProductID);
    shoppingBagPage.clickDisplayedProductCode();
  });
  it('should display value of Product Name on PDP', () => {
    const displayTextName = browser.waitUntil((): any => {
      return productDescriptionPage.getTextName();
    }, 5000);
    logger.info('Check PDP Product Name === > ' + displayTextName);
    assert.equal(displayedName, displayTextName);
    const getCode: any = browser.waitUntil((): any => {
      return productDescriptionPage.getProdSKU();
    }, 5000);
    logger.info('Check Product Code is === > ' + getCode);
    PDPProductId = helpers.getProductID(browser.getUrl());
    logger.info('PRODUCT ID for PDP Page is === >' + PDPProductId);
    assert.equal(shoppingBagProductID, PDPProductId);
    const textCheck: any = browser.waitUntil((): any => {
      return productDescriptionPage.checkProductDesc();
    }, 5000);
    logger.info('check Description Exist === > ' + textCheck);
  });
  // -----------------------------Logged-in User ---------------------------------//
  it('should take user to login/Signup page', () => {
    logger.info('============= LoggedIn User Scenario ==================');
    navigationPage.clickOnLoginLink();
    browser.waitUntil(
      () => {
        return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
      },
      5000,
      loginSignUpTestData.LOGIN_PAGE_LOADING_ERROR,
    );
    const url: string = browser.getUrl();
    expect(url).to.include(loginSignUpTestData.LOGIN_URL);
  });
  it('should perform signup process and land on account details page', () => {
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
  });
  it('should land on account details page and verify email id', () => {
    email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });
  it('Should navigate to product listing page click on first product and add to bag', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    productDescriptionPage.addToBag();
  });
  it('should navigate to shopping bag page', () => {
    productDescriptionPage.clickCheckoutBtn();
    browser.waitUntil((): any => {
      return browser.getTitle() === shoppingBagTestData.shoppingBagTitle;
    }, 5000);
    const url: any = browser.getTitle();
    expect(url).to.equal(shoppingBagTestData.shoppingBagTitle);
    logger.info('On Shopping Bag Page');
  });
  it('should check for Product name is clickable', () => {
    const clickable: any = browser.waitUntil((): any => {
      return shoppingBagPage.checkBrandName();
    });
    logger.info(' Product Name link is clickable === > ' + clickable);
    expect(clickable).to.equal(true);
  });
  it('should get value of Product Details', () => {
    displayedName = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedName();
    }, 5000);
    logger.info('Selected Product Name is === > ' + displayedName);
    const prodDesc: any = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedProductDescription();
    }, 5000);
    logger.info('Selected Product Description is === > ' + prodDesc);
    const prodSize: any = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedProductSize();
    }, 5000);
    logger.info('Selected Product Size is === > ' + prodSize);
    const prodCode: any = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedProductCode();
    }, 5000);
    logger.info('Selected Product Code is === > ' + prodCode);
    const productURLonShoppingBag = shoppingBagPage.extractProductUrlShoppingBag();
    shoppingBagProductID = helpers.getProductID(productURLonShoppingBag);
    logger.info('PRODUCT ID for Shopping Bag is === > ' + shoppingBagProductID);
    shoppingBagPage.clickDisplayedProductCode();
  });
  it('should display value of Product Name on PDP', () => {
    const displayTextName = browser.waitUntil((): any => {
      return productDescriptionPage.getTextName();
    }, 5000);
    logger.info('Check PDP Product Name === > ' + displayTextName);
    assert.equal(displayedName, displayTextName);
    const getCode: any = browser.waitUntil((): any => {
      return productDescriptionPage.getProdSKU();
    }, 5000);
    logger.info('Check Product Code is === > ' + getCode);
    PDPProductId = helpers.getProductID(browser.getUrl());
    logger.info('PRODUCT ID for PDP Page is === >' + PDPProductId);
    assert.equal(shoppingBagProductID, PDPProductId);
    const textCheck: any = browser.waitUntil((): any => {
      return productDescriptionPage.checkProductDesc();
    }, 5000);
    logger.info('check Description Exist === > ' + textCheck);
  });
});
