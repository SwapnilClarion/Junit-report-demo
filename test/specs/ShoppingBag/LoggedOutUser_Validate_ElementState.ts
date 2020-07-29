import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import assert from 'assert';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { orderConfirmationTestData } from 'resources/orderConfirmationTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Shopping Bag for logged out member user and check for new password UI, Not your email and Forgot Password', () => {
  let preEmail: any;
  it('should navigate to men section and click on first product ', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });

  it('should select size and add it to bag ', () => {
    productDescriptionPage.addToBag();
    productDescriptionPage.clickCheckoutBtn();
  });
  it('should enter email address and proceed to checkout', () => {
    preEmail = loginSignUpTestData.EMAIL_ID;
    shoppingBagPage.enterUserEmail(preEmail);
    shoppingBagPage.clickAcceptEmailCheckoutBtn();
  });
  it('should detect proceed to checkout is clickable', () => {
    const clickable = browser.waitUntil(() => {
      return shoppingBagPage.checkProceedBtn();
    });
    logger.info('check proceed to checkout clickable : ' + clickable);
    expect(clickable).to.equal(true);
  });
  it('should check for email address is non editable and displayed', () => {
    const fieldEditable = browser.waitUntil(() => {
      return shoppingBagPage.checkEmailNonEditable();
    }, 5000);
    logger.info('check email non editable : ' + fieldEditable);
    const getEmail = shoppingBagPage.getDisplayedEmail();
    logger.info('Display email value  : ' + getEmail);
    expect(getEmail).to.equal(preEmail);
  });
  it('should check for password field is editable', () => {
    const fieldPassEditable = browser.waitUntil(() => {
      return shoppingBagPage.checkPasswordEditable();
    });
    logger.info('check password editable : ' + fieldPassEditable);
    expect(fieldPassEditable).to.equal(true);
  });
  it('should check Forgot your password is clickable and displayed', () => {
    const btnClickable = browser.waitUntil(() => {
      return shoppingBagPage.forgotYourPasswordLink();
    }, 5000);
    logger.info(
      'check Forgot your password is clickable and present : ' + btnClickable,
    );
    expect(btnClickable).to.equal(true);
    logger.info('==========================================================');
  });
  it('should check Not your email link is clickable and displayed', () => {
    const linkClickable = browser.waitUntil(() => {
      return shoppingBagPage.notYourEmailLink();
    }, 5000);
    logger.info(
      'check Not your email link is clickable and present : ' + linkClickable,
    );
    expect(linkClickable).to.equal(true);
    shoppingBagPage.clickNotYourEmailLink();
  });
  it('should check for email address is editable and pre-populated', () => {
    const emailEditable = browser.waitUntil(() => {
      return shoppingBagPage.checkEmailEditable();
    }, 5000);
    logger.info('check email is editable :' + emailEditable);
    const checkEmail = shoppingBagPage.checkDisplayedEmail();
    logger.info('Display email value  :' + checkEmail);
  });
  it('Should validate Password inputbox is absent on checkout', () => {
    const passwordVal = shoppingBagPage.checkPasswordText();
    logger.info('PASSWORD Inputbox VALUE IS :' + passwordVal);
    assert.equal(
      shoppingBagPage.checkPasswordText(),
      false,
      orderConfirmationTestData.PasswordInputDisplayMessage,
    );
  });
  it('Should validate Not your email is absent on checkout', () => {
    const notYourEmail = shoppingBagPage.notYourEmailLink();
    logger.info('Not Your Email Link is :' + notYourEmail);
    assert.equal(
      shoppingBagPage.notYourEmailLink(),
      false,
      shoppingBagTestData.NotYourEmailDisplayMessage,
    );
  });
  it('Should validate Forgot your password link is absent on checkout', () => {
    const forgotPassword = shoppingBagPage.forgotYourPasswordLink();
    logger.info('Forgot Your Password Link is :' + forgotPassword);
    assert.equal(
      shoppingBagPage.forgotYourPasswordLink(),
      false,
      shoppingBagTestData.ForgotYourPasswordDisplayMessage,
    );
  });
  it('should check proceed to checkout is clickable', () => {
    const buttonClickable = shoppingBagPage.checkProceedBtn();
    logger.info(
      'check proceed to checkout button clickable :' + buttonClickable,
    );
    expect(buttonClickable).to.equal(true);
    shoppingBagPage.clickProceedToCheckoutBtn();
    logger.info('==========================================================');
  });
  it('should check Forgot your password is clickable and displayed', () => {
    const btnClickable = browser.waitUntil(() => {
      return shoppingBagPage.forgotYourPasswordLink();
    }, 5000);
    logger.info(
      'check Forgot your password is clickable and present : ' + btnClickable,
    );
    expect(btnClickable).to.equal(true);
    shoppingBagPage.clickForgotYourPasswordButton();
  });
  it('should check Forgot your password text is displayed', () => {
    const textCheck = browser.waitUntil(() => {
      return shoppingBagPage.checkForgotYourPasswordTextField();
    }, 5000);
    logger.info('check Forgot your password header is displayed :' + textCheck);
  });
  it('should check for Email address field is editable and Empty', () => {
    const emailEditable = browser.waitUntil(() => {
      return shoppingBagPage.checkForgotPasswordEmail();
    }, 5000);
    logger.info('check Email address editable :' + emailEditable);
    expect(emailEditable).to.equal(true);
    const ChkfieldEmpty = shoppingBagPage.checkForgotPasswordEmail();
    logger.info('check email address field is empty : ' + ChkfieldEmpty);
    expect(ChkfieldEmpty).to.equal(true);
  });
  it('should check Already a member link is displayed and clickable', () => {
    const linkClickable = browser.waitUntil(() => {
      return shoppingBagPage.alreadymemberLink();
    }, 5000);
    logger.info(
      'check Already a member link is clickable and present : ' + linkClickable,
    );
    expect(linkClickable).to.equal(true);
  });
  it('should check Reset Password button is displayed and clickable', () => {
    const buttonClickable = browser.waitUntil(() => {
      return shoppingBagPage.resetPasswordLink();
    }, 5000);
    logger.info(
      'check Reset Password button is clickable and present : ' +
        buttonClickable,
    );
    expect(buttonClickable).to.equal(true);
  });
});
