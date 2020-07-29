import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import assert from 'assert';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Brand PLP name State for all user type', () => {
  let brandPlpName: any = '';
  let userEmail: any = '';
  let email: any = '';
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
  it('should check for brand name is clickable', () => {
    const clickable: any = browser.waitUntil((): any => {
      return shoppingBagPage.checkBrandName();
    });
    logger.info(' Brand Name link is clickable === > ' + clickable);
    expect(clickable).to.equal(true);
  });
  it('should get value of Brand Name and Click on Brand Name and land on Brand PLP page', () => {
    const displayedName: any = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedName();
    }, 5000);
    logger.info('check Displayed brand === > ' + displayedName);
    shoppingBagPage.clickBrandName();
    const textCheck: any = browser.waitUntil((): any => {
      return productListingPage.checkBrandTitleText();
    }, 5000);
    logger.info('check Brand Title header is displayed === > ' + textCheck);
    brandPlpName = productListingPage.getDisplayedBrandName();
    logger.info('check Displayed brand PLP Name === > ' + brandPlpName);
    assert.equal(brandPlpName, displayedName);
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
  it('should check for brand name is clickable', () => {
    const clickable: any = browser.waitUntil((): any => {
      return shoppingBagPage.checkBrandName();
    });
    logger.info(' Brand Name link is clickable === > ' + clickable);
    expect(clickable).to.equal(true);
  });
  it('should get value of Brand Name and Click on Brand Name and land on Brand PLP page', () => {
    const displayedName: any = browser.waitUntil((): any => {
      return shoppingBagPage.getDisplayedName();
    }, 5000);
    logger.info('check Displayed brand === > ' + displayedName);
    shoppingBagPage.clickBrandName();
    const textCheck: any = browser.waitUntil((): any => {
      return productListingPage.checkBrandTitleText();
    }, 5000);
    logger.info('check Brand Title header is displayed === > ' + textCheck);
    brandPlpName = productListingPage.getDisplayedBrandName();
    logger.info('check Displayed brand PLP Name === > ' + brandPlpName);
    assert.equal(brandPlpName, displayedName);
  });
});
