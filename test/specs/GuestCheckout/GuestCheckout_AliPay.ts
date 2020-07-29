import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import aliPayPage from '../../../pageObjects/AliPayPage';
import notification from '../../../methods/GetNotification';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import assert from 'assert';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Order Confirmation Page for Guest user using AliPay', () => {
  it('Should navigate to product listing page click on first product', () => {
    const homePageTitle = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info(' HomePage Title  == > ' + homePageTitle);
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    const PLPPageTitle = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info(' PLP Page Title  == > ' + PLPPageTitle);
  });

  it('Should select size and add product to shopping bag', () => {
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

  it('Should accept guest users email address and proceed to checkout page ', () => {
    const shoppingBagPageTitle = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Shopping Bag Page Title ==> ' + shoppingBagPageTitle);
    const userEmail = randomData.GUEST_EMAIL;
    logger.info('Guest Email Id ===> ' + userEmail);
    shoppingBagPage.enterUserEmail(userEmail);
    shoppingBagPage.clickAcceptEmailCheckoutBtn();
  });
  it('Should add shipping address ', () => {
    browser.waitUntil(
      () => {
        return browser.getTitle() === checkoutTestData.CheckoutPageTitle;
      },
      5000,
      checkoutTestData.CheckoutPageLoadingMessage,
    );
    logger.info(' Checkout Page Title === > ' + browser.getTitle());
    checkoutPage.addNewShippingAddress(
      randomData.GUEST_FIRSTNAME,
      randomData.GUEST_LASTNAME,
      randomData.GUEST_STREETADDR,
      checkoutTestData.ALIPAY_CITY_NAME,
      checkoutTestData.ZIP_CODE,
      checkoutTestData.ALIPAY_COUNTRY,
      checkoutTestData.ALIPAY_STATE,
      checkoutTestData.PHONE_NUMBER,
    );
  });
  it('should select paypment method complete payment process using Alipay and return to SSense ', () => {
    checkoutPage.closeAllNotification();
    checkoutPage.selectPaymentMethod(checkoutTestData.alipay_payment_method);
    checkoutPage.clickCheckoutSubmitBtn();

    if (!checkoutPage.orderTotalAlert.isExisting()) {
      logger.info('Order Total alert is not displayed');
    } else {
      checkoutPage.clickPlaceOrderBtn();
    }
    aliPayPage.alipayPayment();
  });

  it('Should land on Order confirmation page', () => {
    const orderConfirmationTitle = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info(
      'SSense Order Confirmation Page Title ==> ' + orderConfirmationTitle,
    );
    assert.equal(
      orderConfirmationTitle,
      orderConfirmationTestData.orderConfirmationTitle,
      orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
    );
  });

  it('Should validate payment method type on confirmation', () => {
    const payMethod = browser.waitUntil((): any => {
      return orderConfirmationPage.getPaymentMethod();
    }, 5000);
    assert.equal(
      payMethod,
      orderConfirmationTestData.Expected_alipay_payment_method_order_confirmation,
      orderConfirmationTestData.PaymentTypeTextDisplayMessage,
    );
  });

  it('Should validate Password inputbox is present on order confirmation', () => {
    const passwordFieldStatus = browser.waitUntil(() => {
      return orderConfirmationPage.checkPasswordField();
    }, 5000);
    logger.info('PASSWORD Inputbox VALUE IS ' + passwordFieldStatus);
    assert.equal(
      passwordFieldStatus,
      true,
      orderConfirmationTestData.PasswordInputDisplayMessage,
    );
  });

  it('Should validate Create an Account button is present on order confirmation', () => {
    const createBtnStatus = browser.waitUntil(() => {
      return orderConfirmationPage.checkCreateAccBtn();
    }, 5000);
    logger.info('CREATE ACCOUNT VALUE ' + createBtnStatus);
    assert.equal(
      createBtnStatus,
      true,
      orderConfirmationTestData.CreateAccountButtonDisplayMessage,
    );
  });

  it('Should validate order confirmation message on order confirmation page', () => {
    const ActualOrderConfirmationText = browser.waitUntil((): any => {
      return orderConfirmationPage.getOrderConfirmationText();
    }, 5000);

    logger.info(
      'CONFIRMATION TEXT is ' +
        orderConfirmationPage.getOrderConfirmationText(),
    );
    expect(ActualOrderConfirmationText).to.include(
      orderConfirmationTestData.Exp_Order_Confirmation_Text,
    );
  });
});
