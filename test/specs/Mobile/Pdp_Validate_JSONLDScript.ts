import mobileNavigationPage from '../../../pageObjects/mobile/NavigationPage';
import mobileProductDescriptionPage from '../../../pageObjects/mobile/ProductDescriptionPage';
import mobileProductListingPage from '../../../pageObjects/mobile/ProductListingPage';
import loginPage from '../../../pageObjects/LoginPage';
import helpers from '../../../utils/helpers';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productDescriptionTestData } from '../../../resources/mobile/productDescriptionTestData';
import { globalTestData } from '../../../resources/globalTestData';
import { expect } from 'chai';
globalTestData.FILE_PATH = __filename;
describe('Validate that user is able to see JSON LD Script in DOM for PDP page in mobile view ', () => {
  let userEmail: any = '';
  let pdpMobileCookieName: any = '';
  let pdpMobileCookieValue: any = '';
  let email: any = '';
  // =============================Logged out user =================================================
  it('Should validate that user is not logged in', () => {
    logger.info('=================Logged Out User========================');
    mobileNavigationPage.clickMobileAccountLink();
    const actualLoginHeading: any = browser.waitUntil((): any => {
      return loginPage.getLoginHeading();
    }, 5000);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });
  it('Should navigate to PLP and select product', () => {
    mobileNavigationPage.clickMobileMainMenu();
    // static wait added as it takes time to load navigation menu and gives stale element error
    browser.pause(1000);
    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileMenLink.isDisplayed();
    }, 5000);
    browser.setCookies({ name: 'is_new_pdp_mobile', value: 'new' });
    mobileNavigationPage.clickMobileMenLink();
    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileTrending.isDisplayed();
    }, 5000);

    mobileNavigationPage.clickMobileTrending();
    mobileProductListingPage.clickFirstProductMobileView();
    browser.waitUntil((): any => {
      return mobileProductDescriptionPage.mobileAddToBag.isDisplayed();
    }, 5000);
  });
  it('Should get LD+ JSON Script content and validate with product fields', () => {
    // Get is_new_pdp_mobile cookie value
    const pdpMobile = browser.getCookies(['is_new_pdp_mobile']);
    pdpMobileCookieName = pdpMobile[0].name;
    pdpMobileCookieValue = pdpMobile[0].value;
    logger.info('is_new_pdp_mobile Name is : ' + pdpMobileCookieName);
    logger.info('is_new_pdp_mobile Value is : ' + pdpMobileCookieValue);

    // get LD+ JSON script data and display on consol log
    const JsonData = mobileProductDescriptionPage.getLDJsonScriptData();
    // Validate product ID with LD Script Json Data
    const productID = helpers.getProductID(browser.getUrl());
    logger.info('PROD ID of selected product is :' + productID);
    const LDProductID = JsonData.productID;
    logger.info('PROD ID in LD JSON Script is :' + LDProductID);
    assert.equal(
      productID,
      LDProductID,
      productDescriptionTestData.ProductIDMobileError,
    );
    logger.info('===========================================================');

    // Validate product Brand Name  with LD Script Json Data
    const productBrand = mobileProductDescriptionPage.getMobileProductBrandName();
    logger.info('PROD Brand Name  of selected product is :' + productBrand);
    const LDProductBrand = JsonData.brand.name.toString().toUpperCase();
    logger.info('PROD Brand Name in LD JSON Script is :' + LDProductBrand);
    assert.equal(
      productBrand,
      LDProductBrand,
      productDescriptionTestData.ProductBrandMobileError,
    );

    logger.info('===========================================================');
    // Validate product Name with LD Script Json Data
    const productName = mobileProductDescriptionPage.getMobileProductName();
    logger.info('PROD Name of selected product is :' + productName);
    const LDProductName = JsonData.name;
    logger.info('PROD Name in LD JSON Script is :' + LDProductName);
    assert.equal(
      productName,
      LDProductName,
      productDescriptionTestData.ProductNameMobileError,
    );
    logger.info('===========================================================');

    // Validate product SKU with LD Script Json Data
    const productSKU = mobileProductDescriptionPage.getMobileProductSKU();
    logger.info('PROD SKU of selected product is :' + productSKU);
    const LDProductSKU = JsonData.sku;
    logger.info('PROD SKU in LD JSON Script is :' + LDProductSKU);
    assert.equal(
      productSKU,
      LDProductSKU,
      productDescriptionTestData.ProductSKUMobileError,
    );
    logger.info('===========================================================');

    // Validate product Price with LD Script Json Data
    const productPrice = mobileProductDescriptionPage.getMobileProductPrice();
    logger.info('PROD Price of selected product is :' + productPrice);
    const LDProductPrice = JsonData.offers.price;
    logger.info('PROD Price in LD JSON Script is :' + LDProductPrice);
    assert.equal(
      productPrice,
      LDProductPrice,
      productDescriptionTestData.ProductPriceMobileError,
    );
    logger.info('===========================================================');

    // Validate product URL with LD Script Json Data
    const productURL = browser.getUrl().replace('https://qa.ssense.com', '');
    logger.info('PROD URL of selected product is :' + productURL);
    const LDProductURL = JsonData.offers.url;
    logger.info('PROD URL in LD JSON Script is :' + LDProductURL);
    assert.equal(
      productURL,
      LDProductURL,
      productDescriptionTestData.ProductURLMobileError,
    );
    logger.info('===========================================================');

    // Validate product Description with LD Script Json Data
    const productDesc = mobileProductDescriptionPage.getMobileProductDescription();
    logger.info('PROD Description of selected product is :' + productDesc);
    const LDProductDescription = JsonData.description
      .toString()
      .replace(/\n|\r|br/g, '');
    logger.info('\n');
    logger.info(
      'PROD Description in LD JSON Script is :' + LDProductDescription.trim(),
    );
    assert.equal(
      productDesc,
      LDProductDescription,
      productDescriptionTestData.ProductDescMobileError,
    );
    logger.info('===========================================================');
  });
  //  ====================================Logged-In User ==============================================
  it('Should perform new user registration ', () => {
    logger.info('=================Logged In User========================');
    mobileNavigationPage.clickMobileAccountLink();
    browser.waitUntil((): any => {
      return loginPage.getLoginHeading();
    }, 5000);

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
  it('Should navigate to PLP and select product', () => {
    mobileNavigationPage.clickMobileMainMenu();
    // static wait added as it takes time to load navigation menu and gives stale element error
    browser.pause(1000);
    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileTrending.isDisplayed();
    }, 5000);
    browser.setCookies({ name: 'is_new_pdp_mobile', value: 'new' });
    mobileNavigationPage.clickMobileTrending();
    mobileProductListingPage.clickFirstProductMobileView();

    browser.waitUntil((): any => {
      return mobileProductDescriptionPage.mobileAddToBag.isDisplayed();
    }, 5000);
  });
  it('Should get LD+ JSON Script content and validate with product fields', () => {
    // Get is_new_pdp_mobile cookie value
    logger.info('is_new_pdp_mobile Name is : ' + pdpMobileCookieName);
    logger.info('is_new_pdp_mobile Value is : ' + pdpMobileCookieValue);

    // get LD+ JSON script data and display on consol log
    const JsonData = mobileProductDescriptionPage.getLDJsonScriptData();

    // Validate product ID with LD Script Json Data
    const productID = helpers.getProductID(browser.getUrl());
    logger.info('PROD ID of selected product is :' + productID);
    const LDProductID = JsonData.productID;
    logger.info('PROD ID in LD JSON Script is :' + LDProductID);
    assert.equal(
      productID,
      LDProductID,
      productDescriptionTestData.ProductIDMobileError,
    );
    logger.info('============================================================');

    // Validate product Brand Name  with LD Script Json Data
    const productBrand = mobileProductDescriptionPage.getMobileProductBrandName();
    logger.info('PROD Brand Name  of selected product is :' + productBrand);
    const LDProductBrand = JsonData.brand.name.toString().toUpperCase();
    logger.info('PROD Brand Name in LD JSON Script is :' + LDProductBrand);
    assert.equal(
      productBrand,
      LDProductBrand,
      productDescriptionTestData.ProductBrandMobileError,
    );
    logger.info('===========================================================');
    // Validate product Name with LD Script Json Data
    const productName = mobileProductDescriptionPage.getMobileProductName();
    logger.info('PROD Name of selected product is :' + productName);
    const LDProductName = JsonData.name;
    logger.info('PROD Name in LD JSON Script is :' + LDProductName);
    assert.equal(
      productName,
      LDProductName,
      productDescriptionTestData.ProductNameMobileError,
    );
    logger.info('===========================================================');

    // Validate product SKU with LD Script Json Data
    const productSKU = mobileProductDescriptionPage.getMobileProductSKU();
    logger.info('PROD SKU of selected product is :' + productSKU);
    const LDProductSKU = JsonData.sku;
    logger.info('PROD SKU in LD JSON Script is :' + LDProductSKU);
    assert.equal(
      productSKU,
      LDProductSKU,
      productDescriptionTestData.ProductSKUMobileError,
    );
    logger.info('===========================================================');

    // Validate product Price with LD Script Json Data
    const productPrice = mobileProductDescriptionPage.getMobileProductPrice();
    logger.info('PROD Price of selected product is :' + productPrice);
    const LDProductPrice = JsonData.offers.price;
    logger.info('PROD Price in LD JSON Script is :' + LDProductPrice);
    assert.equal(
      productPrice,
      LDProductPrice,
      productDescriptionTestData.ProductPriceMobileError,
    );
    logger.info('===========================================================');

    // Validate product URL with LD Script Json Data
    const productURL = browser.getUrl().replace('https://qa.ssense.com', '');
    logger.info('PROD URL of selected product is :' + productURL);
    const LDProductURL = JsonData.offers.url;
    logger.info('PROD URL in LD JSON Script is :' + LDProductURL);
    assert.equal(
      productURL,
      LDProductURL,
      productDescriptionTestData.ProductURLMobileError,
    );
    logger.info('===========================================================');

    // Validate product Description with LD Script Json Data
    const productDesc = mobileProductDescriptionPage.getMobileProductDescription();
    logger.info('PROD Description of selected product is :' + productDesc);
    const LDProductDescription = JsonData.description
      .toString()
      .replace(/\n|\r|br/g, '');
    logger.info('\n');
    logger.info(
      'PROD Description in LD JSON Script is :' + LDProductDescription.trim(),
    );
    assert.equal(
      productDesc,
      LDProductDescription,
      productDescriptionTestData.ProductDescMobileError,
    );
    logger.info('===========================================================');
  });
});
