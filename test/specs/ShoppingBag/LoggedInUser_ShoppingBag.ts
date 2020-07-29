import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate shopping bag state page for logged in user', () => {
  let userEmail: any = '';
  it('should take user to login/Signup page', () => {
    navigationPage.clickOnLoginLink();
    browser.waitUntil(
      () => {
        return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
      },
      5000,
      loginSignUpTestData.LOGIN_PAGE_LOADING_ERROR,
    );
    const url = browser.getUrl();
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
    let email: any = '';
    email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });
  it('Should navigate to product listing page click on first product', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });
  it('Should select size and add product to shopping bag', () => {
    const sizeCheck: any = browser.waitUntil(() => {
      return productDescriptionPage.selectSize();
    }, 5000);

    productDescriptionPage.addSize(sizeCheck);
    productDescriptionPage.clickAddToBag();
    productDescriptionPage.clickCheckoutBtn();
  });
  it('should verify email id same as registration', () => {
    let populatedEmail: any = '';
    populatedEmail = browser.waitUntil((): any => {
      return shoppingBagPage.clickDisplayedEmail();
    }, 5000);
    expect(userEmail).to.equal(populatedEmail);
    logger.info('check prepopulated email -- >' + populatedEmail);
  });
  it('should check Not your account link is clickable and displayed', () => {
    const linkClickable = browser.waitUntil(() => {
      return shoppingBagPage.notYourAccountLink();
    }, 5000);
    logger.info('check link is clickable and displayed -- > ' + linkClickable);
    expect(linkClickable).to.equal(true);
  });
  it('should check proceed to checkout button is clickable', () => {
    const buttonClickable = browser.waitUntil(() => {
      return shoppingBagPage.isProceedToCheckoutOnShoppingBag();
    });
    logger.info(
      'check proceed to checkout button is clickable and present --- > ' +
        buttonClickable,
    );
    expect(buttonClickable).to.equal(true);
  });
});
