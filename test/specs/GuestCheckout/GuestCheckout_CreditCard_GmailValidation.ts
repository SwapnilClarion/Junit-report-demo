import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import assert from 'assert';
import gmailPage from '../../../pageObjects/GmailPage';
import gmailCheck from '../../../methods/Gmail_CheckMethod';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe(
  'Validate Order Confirmation Page for Guest user using Credit Card' +
    'and verify orderconfirmation using Gmail Validation',
  () => {
    let orderId: any = '';
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
      const PDPPageTitle = browser.waitUntil((): any => {
        return browser.getTitle();
      }, 5000);
      logger.info(' PDP Page Title  == > ' + PDPPageTitle);
      productDescriptionPage.addToBag();
      checkoutPage.closeAllNotification();
    });

    it('should click on checkout button and then Proceed to checkout button ', () => {
      productDescriptionPage.clickCheckoutBtn();
      shoppingBagPage.clickProceedToCheckoutOnShoppingBag();
    });

    it('Should accept guest users email address and proceed to checkout page ', () => {
      const shoppingBagPageTitle = browser.waitUntil((): any => {
        return browser.getTitle();
      }, 5000);
      logger.info('Shopping Bag Page Title ==> ' + shoppingBagPageTitle);
      const userEmail = randomData.GUEST_GMAIL_Email;
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
        checkoutTestData.CITY_NAME,
        checkoutTestData.ZIP_CODE,
        checkoutTestData.COUNTRY,
        checkoutTestData.STATE,
        randomData.GUEST_PHONENO,
      );
    });
    it('should select paypment method complete payment process using Credit card and return to SSense ', () => {
      checkoutPage.closeAllNotification();
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
        5000,
        orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
      );
      logger.info('Order Confirmation Title ===> ' + browser.getTitle());
      assert.equal(
        browser.getTitle(),
        orderConfirmationTestData.orderConfirmationTitle,
        orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
      );
    });

    it('Should validate payment method type on confirmation', () => {
      const payMethod = browser.waitUntil((): any => {
        return orderConfirmationPage.getPaymentMethod();
      }, 5000);
      logger.info('Payment Method  == > ' + payMethod);
      expect(payMethod).to.include(
        orderConfirmationTestData.Exp_cc_payment_method_order_confirmation,
      );
    });
    it('Should validate Password inputbox is present on order confirmation', () => {
      const passwordFieldStatus = browser.waitUntil((): any => {
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
      const createBtnStatus = browser.waitUntil((): any => {
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
      orderId = browser.waitUntil((): any => {
        return orderConfirmationPage.getOrderConfirmationID();
      }, 5000);
      logger.info('Order Id from order confirmation ===> ' + orderId);
      expect(ActualOrderConfirmationText).to.include(
        orderConfirmationTestData.Exp_Order_Confirmation_Text,
      );
    });
    it('should navigate to Gmail', () => {
      browser.navigateTo(checkoutTestData.GMAIL_URL);
      browser.waitUntil(
        () => {
          return (
            gmailPage.SignInText.getText() === checkoutTestData.GMAIL_SIGNIN_TXT
          );
        },
        5000,
        'Gmail page not opened',
      );
    });
    it('should login to gmail account and search the mails with orderId', () => {
      gmailCheck.loginAndSearch(orderId.trim());
    });
    it('should open matched email and verify orderId', () => {
      const emailOrderId = gmailCheck.openMatchedEmail(orderId.trim());
      logger.info('Email OrderId ======> ' + emailOrderId);
      logger.info('OrderConfirmation OrderId =====> ' + orderId);
      expect(emailOrderId).to.be.equal(orderId);
    });
  },
);
