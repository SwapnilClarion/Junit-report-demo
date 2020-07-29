import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
describe('Validate Brand PLP name State for all user type', () => {
  let brandPlpName: any = '';
  let displayTextName: any = '';
  let userEmail: any = '';
  let email: any = '';
  it('should navigate to men section and click on second product ', () => {
    logger.info('============= Logged Out/Guest User Scenario ===============');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickSecondProduct();
  });
  it('should get value of Brand Name on PDP', () => {
    displayTextName = browser.waitUntil((): any => {
      return productDescriptionPage.getTextName();
    }, 5000);
    logger.info('check Displayed brand === > ' + displayTextName);
  });
  it('should check presence of brand name is displayed and clickable', () => {
    const clickable: any = browser.waitUntil((): any => {
      return productDescriptionPage.checkRelatedBrandName();
    }, 5000);
    logger.info(
      'Related Brand Name link is Displayed and clickable === > ' + clickable,
    );
    expect(clickable).to.equal(true);
  });
  it('should check presence of View All button is displayed and clickable', () => {
    const buttonclickable: any = browser.waitUntil((): any => {
      return productDescriptionPage.viewAllButtonName();
    }, 5000);
    logger.info(
      'View All Button is Displayed and clickable === > ' + buttonclickable,
    );
    expect(buttonclickable).to.equal(true);
    productDescriptionPage.clickViewAllBtn();
    logger.info('On Brand PLP Page');
    const textCheck: any = browser.waitUntil((): any => {
      return productListingPage.checkBrandTitleText();
    }, 5000);
    logger.info('check Brand Title header is displayed === > ' + textCheck);
    brandPlpName = productListingPage.getDisplayedBrandName();
    logger.info('check Displayed brand PLP Name === > ' + brandPlpName);
    expect(brandPlpName.includes(displayTextName)).to.equal(true);
  });
  // -----------------------------Logged-in User ---------------------------------//
  it('should take user to login/Signup page', () => {
    logger.info('============= LoggedIn User Scenario ===================');
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
  it('Should navigate to product listing page click on second product', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickSecondProduct();
  });
  it('should get value of Brand Name on PDP', () => {
    displayTextName = browser.waitUntil((): any => {
      return productDescriptionPage.getTextName();
    }, 5000);
    logger.info('check Displayed brand === > ' + displayTextName);
  });
  it('should check presence of related brand name is displayed and clickable', () => {
    const clickable: any = browser.waitUntil((): any => {
      return productDescriptionPage.checkRelatedBrandName();
    }, 5000);
    logger.info(
      'Related Brand Name link is Displayed and clickable === > ' + clickable,
    );
    expect(clickable).to.equal(true);
  });
  it('should check presence of View All button is displayed and clickable', () => {
    const buttonclickable: any = browser.waitUntil((): any => {
      return productDescriptionPage.viewAllButtonName();
    }, 5000);
    logger.info(
      'View All Button is Displayed and clickable === > ' + buttonclickable,
    );
    expect(buttonclickable).to.equal(true);
    productDescriptionPage.clickViewAllBtn();
    logger.info('On Brand PLP Page');
    const textCheck: any = browser.waitUntil((): any => {
      return productListingPage.checkBrandTitleText();
    }, 5000);
    logger.info('check Brand Title header is displayed === > ' + textCheck);
    brandPlpName = productListingPage.getDisplayedBrandName();
    logger.info('check Displayed brand PLP Name === > ' + brandPlpName);
    expect(brandPlpName.includes(displayTextName)).to.equal(true);
  });
});
