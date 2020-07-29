import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import payPalPage from '../../../pageObjects/PaypalPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import notification from '../../../methods/GetNotification';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { productListingTestData } from '../../../resources/productListingTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe(
  'Validate Order Confirmation Page for Guest user using Paypal payment method' +
    'for Sale Items',
  () => {
    let handles: any = '';
    let orderId: any = '';
    it('should navigate to men section and click on first product ', () => {
      logger.info(
        '============= Guest Checkout for Sale using Paypal ================',
      );
      navigationPage.clickOnMenOuterLink();
    });
    it('Should validate that sale feature is enabled', () => {
      logger.info('Sale Link Present : ' + navigationPage.isSaleLinkExist());
      assert.equal(
        navigationPage.isSaleLinkExist(),
        true,
        productListingTestData.Sale_Link_Display_Error,
      );
    });
    it('Should navigate to sale plp and click on first product', () => {
      browser.waitUntil((): any => {
        return browser.getTitle();
      }, 5000);
      productListingPage.goToPlp(
        productListingTestData.sale_gender_male,
        productListingTestData.go_to_sale,
      );
      browser.waitUntil((): any => {
        return productListingPage.getfirstSaleProductPrice();
      }, 5000);
      browser.pause(3000);
      productListingPage.selectFirstProduct(
        productListingTestData.sale_gender_female,
        productListingTestData.go_to_sale,
      );
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

    it('should enter shipping address and select payment method', () => {
      checkoutPage.addNewShippingAddress(
        randomData.GUEST_FIRSTNAME,
        randomData.GUEST_LASTNAME,
        randomData.GUEST_STREETADDR,
        checkoutTestData.CITY,
        randomData.GUEST_ZIPCODE,
        checkoutTestData.COUNTRY,
        checkoutTestData.STATE,
        randomData.GUEST_PHONENO,
      );
      checkoutPage.closeAllNotification();
      checkoutPage.selectPaymentMethod(checkoutTestData.PAYPAL);
      browser.pause(5000);
    });
    it('should click on Pay with PayPal button and switch to Paypal window', () => {
      checkoutPage.paypalExpressBtn.scrollIntoView();
      checkoutPage.clickPaypalExpressBtn();
      handles = browser.getWindowHandles();
      browser.pause(4000);
      browser.switchToWindow(handles[1]);
      browser.pause(15000);
    });
    it('should enter paypal login credentials and land on paypal checkout page ', () => {
      payPalPage.clickLoginBtn();
      browser.pause(3000);
      payPalPage.enterLoginEmail();
      browser.pause(3000);
      payPalPage.clickNextBtn();
      browser.pause(3000);
      payPalPage.enterLoginPassword();
      browser.pause(3000);
      payPalPage.clickPayPalLoginBtn();
      browser.pause(5000);
    });
    it('should select the payment method and go back to SSense ', () => {
      payPalPage.clickPayWithVisaRadioBtn();
      browser.pause(3000);
      payPalPage.clickContinueBtn();
      browser.pause(5000);
      browser.switchToWindow(handles[0]);
    });
    it('Should land on Order confirmation page', () => {
      browser.waitUntil(
        () => {
          return (
            browser.getTitle() ===
            orderConfirmationTestData.orderConfirmationTitle
          );
        },
        15000,
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
        orderConfirmationTestData.Expected_Paypal_payment_method_order_confirmation,
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
      orderId = browser.waitUntil((): any => {
        return orderConfirmationPage.getOrderConfirmationID();
      }, 5000);
      logger.info('Order Id from order confirmation ===> ' + orderId);
      expect(ActualOrderConfirmationText).to.include(
        orderConfirmationTestData.Exp_Order_Confirmation_Text,
      );
    });
  },
);
