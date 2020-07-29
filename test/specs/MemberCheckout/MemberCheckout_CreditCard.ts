import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import loginPage from '../../../pageObjects/LoginPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import assert from 'assert';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Order Confirmation Page for Member user using Credit Card', () => {
  let userEmail = '';
  it('should take user to login/Signup page', () => {
    navigationPage.clickOnLoginLink();
    browser.waitUntil(
      () => {
        return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
      },
      20000,
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
  it('should land on account details page and verify emailid ', () => {
    const email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });

  it('Should navigate to product listing page click on first product', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });

  it('Should select size and add product to shopping bag', () => {
    productDescriptionPage.addToBag();
    checkoutPage.closeAllNotification();
  });

  it('should click on checkout button and then Proceed to checkout button ', () => {
    productDescriptionPage.clickCheckoutBtn();
    shoppingBagPage.clickProceedToCheckoutOnShoppingBag();
  });

  it('Should add shipping address ', () => {
    browser.waitUntil(
      () => {
        return browser.getTitle() === checkoutTestData.CheckoutPageTitle;
      },
      20000,
      checkoutTestData.CheckoutPageLoadingMessage,
    );

    checkoutPage.addNewShippingAddress(
      randomData.GUEST_FIRSTNAME,
      randomData.GUEST_LASTNAME,
      randomData.GUEST_STREETADDR,
      checkoutTestData.CITY_NAME,
      checkoutTestData.ZIP_CODE,
      checkoutTestData.COUNTRY,
      checkoutTestData.STATE,
      checkoutTestData.PHONE_NUMBER,
    );
    checkoutPage.closeAllNotification();
  });
  it('should select paypment method complete payment process using Credit card and return to SSense ', () => {
    checkoutPage.selectPaymentMethod(
      checkoutTestData.CREDIT_CARD_PAYMENT_METHOD,
    );
    browser.switchToFrame(0);
    checkoutPage.paymentWithCreditCard();
    browser.switchToParentFrame();
    checkoutPage.clickPlaceOrderBtn();
    if (!checkoutPage.orderTotalAlert.isExisting()) {
      logger.info('Order Total alert is not displayed');
    } else {
      checkoutPage.clickPlaceOrderBtn();
    }
  });

  it('Should land on Order confirmation page', () => {
    browser.waitUntil(
      () => {
        return (
          browser.getTitle() ===
          orderConfirmationTestData.orderConfirmationTitle
        );
      },
      10000,
      orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
    );
    assert.equal(
      browser.getTitle(),
      orderConfirmationTestData.orderConfirmationTitle,
      orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
    );
  });

  it('Should validate payment method type on confirmation', () => {
    const actualPaymentMethod = orderConfirmationPage.getPaymentMethod();
    expect(actualPaymentMethod).to.include(
      orderConfirmationTestData.Exp_cc_payment_method_order_confirmation,
    );
  });

  it('Should validate Password inputbox is absent on order confirmation', () => {
    logger.info(
      'PASSWORD Inputbox VALUE IS ' +
        orderConfirmationPage.checkPasswordField(),
    );
    assert.equal(
      orderConfirmationPage.checkPasswordField(),
      false,
      orderConfirmationTestData.PasswordInputDisplayMessage,
    );
  });

  it('Should validate Create an Account button is absent on order confirmation', () => {
    logger.info(
      'CREATE ACCOUNT VALUE ' + orderConfirmationPage.checkCreateAccBtn(),
    );
    assert.equal(
      orderConfirmationPage.checkCreateAccBtn(),
      false,
      orderConfirmationTestData.CreateAccountButtonDisplayMessage,
    );
  });

  it('Should validate order confirmation message on order confirmation page', () => {
    const ActualOrderConfirmationText = orderConfirmationPage.getOrderConfirmationText();
    logger.info(
      'CONFIRMATION TEXT is ' +
        orderConfirmationPage.getOrderConfirmationText(),
    );
    expect(ActualOrderConfirmationText).to.include(
      orderConfirmationTestData.Exp_Order_Confirmation_Text,
    );
  });
});
