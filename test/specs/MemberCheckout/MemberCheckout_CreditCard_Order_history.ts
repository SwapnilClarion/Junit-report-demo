import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import notification from '../../../methods/GetNotification';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import { orderHistoryTestData } from '../../../resources/orderHistoryTestData';
import signupMethod from '../../../methods/Login_SignUpMethods';
import loginPage from '../../../pageObjects/LoginPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import orderHistoryPage from '../../../pageObjects/OrderHistoryPage';
import assert from 'assert';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe(
  'Validate a user is able to checkout using credit card and verify ' +
    ' the orderconfirmation and order history ',
  () => {
    let userEmail: any = '';
    let orderId: any = '';
    let langArray: any = [];
    let shippingAddressFieldsOnOrderConfirmation: any = [];
    it('should take user to login/Signup page', () => {
      logger.info(
        '=============Member Checkout CCpay verify Order History========',
      );
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
      userEmail = randomData.MEMBER_GMAIL_Email;
      if (
        loginPage.viewNotificationMsg() !==
        loginSignUpTestData.Login_SameEmail_Error
      ) {
        signupMethod.signup(
          userEmail,
          randomData.MEMBER_GMAIL_Password,
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

    it('Should get the application languages and navigate to product listing page click on first product', () => {
      langArray = browser.waitUntil(() => {
        return navigationPage.getLanguages();
      }, 5000);
      navigationPage.clickOnMenOuterLink();
      productListingPage.clickFirstProduct();
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
        5000,
        checkoutTestData.CheckoutPageLoadingMessage,
      );

      checkoutPage.addNewShippingAddress(
        randomData.GUEST_FIRSTNAME,
        randomData.GUEST_LASTNAME,
        randomData.GUEST_STREETADDR,
        checkoutTestData.CITY,
        randomData.GUEST_ZIPCODE,
        checkoutTestData.COUNTRY,
        checkoutTestData.STATE,
        checkoutTestData.PHONE_NUMBER,
      );
      checkoutPage.closeAllNotification();
    });
    it('should select payment method complete payment process using Credit card and return to SSense ', () => {
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
        15000,
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
      logger.info('Payment Method   :  ' + actualPaymentMethod);
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
      orderId = browser.waitUntil((): any => {
        return orderConfirmationPage.getOrderConfirmationID();
      }, 5000);
      logger.info('Order-Id from Order Confirmation page : ' + orderId);
      expect(ActualOrderConfirmationText).to.include(
        orderConfirmationTestData.Exp_Order_Confirmation_Text,
      );
      shippingAddressFieldsOnOrderConfirmation = orderConfirmationPage.getShippingAddressFields();
    });
    it('should click on continue shopping btn and then click on order history link', () => {
      orderConfirmationPage.clickContinueShoppingBtn();
      logger.info('Redirected to :' + browser.getUrl());
      browser.waitUntil(() => {
        return navigationPage.accountLink.isDisplayed();
      }, 5000);
      navigationPage.clickOnAccountLink();
      navigationPage.clickOrderHistoryLink();
      browser.waitUntil(() => {
        return orderHistoryPage.viewDetails.isDisplayed();
      }, 5000);
    });
    it('should verify order-id is present in order history page', () => {
      const orderIdPresent = browser.waitUntil(() => {
        return orderHistoryPage.orderId.isDisplayed();
      });
      logger.info(
        'Order-Id present on Order History page  : ' + orderIdPresent,
      );
      if (!orderIdPresent) {
        logger.info(orderConfirmationTestData.orderHistory_order_id_error);
      }
      const orderIdTxt = browser.waitUntil((): any => {
        return orderHistoryPage.getOrderId().trim();
      });
      logger.info('Order-Id from Order History Page  : ' + orderIdTxt);
      expect(orderId).to.equal(orderIdTxt);
    });
    it('should verify view-details link is clickable', () => {
      const viewDetailsLnkStatus = browser.waitUntil(() => {
        return orderHistoryPage.viewDetails.isDisplayed();
      });
      logger.info('View Details link is Present  : ' + viewDetailsLnkStatus);
      const viewDetailsLnk = browser.waitUntil(() => {
        return orderHistoryPage.viewDetails.isClickable();
      });
      logger.info('View Details Link is Clickable  :  ' + viewDetailsLnk);
      orderHistoryPage.clickViewDetailsLnk();
    });
    it('should verify order-id on order details page', () => {
      const orderIdTxt = browser.waitUntil((): any => {
        return orderHistoryPage.getOrderIdFromDetails();
      }, 5000);
      logger.info('Order Details page with Order-Id  :' + orderIdTxt);
      expect(orderId).to.equal(orderIdTxt);
      navigationPage.clickOnAccountLink();
      navigationPage.clickOrderHistoryLink();
      browser.waitUntil(() => {
        return orderHistoryPage.viewDetails.isDisplayed();
      }, 5000);
    });
    it('Should validate order status Received for the selected language', () => {
      for (let index = 0; index < langArray.length; index += 1) {
        if (index > 0) {
          navigationPage.selectLanguage(index);
        }
        const ActualOrderStatus = orderHistoryPage.getOrderStatus();
        logger.info(
          'Actual Order Status text for the selected language is: ' +
            ActualOrderStatus,
        );
        const ExpectedOrderStatus =
          orderHistoryTestData.orderStatusReceivedText[index];
        logger.info(
          'Expected Order status text for the selected language is: ' +
            ExpectedOrderStatus,
        );
        logger.info(
          '=================================================================',
        );
        assert.equal(
          ActualOrderStatus,
          ExpectedOrderStatus,
          orderHistoryTestData.orderStatusTextError,
        );
      }
    });

    it('should select modify reason and cancel the order.', () => {
      // Passed hardcoded index 0 because to perform cancel order has to change the language as English.
      navigationPage.selectLanguage(0);
      // Added static wait because after language change application take time to load the page.
      browser.pause(5000);
      orderHistoryPage.selectModifyOrderReasons(
        orderHistoryTestData.modifyReason,
      );
      const result = browser.waitUntil(() => {
        return orderHistoryPage.editMyOrderHeading.isDisplayed();
      }, 5000);
      logger.info('User land on edit my order page : ' + result);
      assert.equal(
        shippingAddressFieldsOnOrderConfirmation[0] +
          ' ' +
          shippingAddressFieldsOnOrderConfirmation[1],
        orderHistoryPage.getEditMyOrderName(),
        orderHistoryTestData.userNameErrorMessage,
      );
      logger.info(
        'Customer name on order cancel form :' +
          orderHistoryPage.getEditMyOrderName(),
      );
      assert.equal(
        orderId,
        orderHistoryPage.getEditMyOrderCancelOrderID(),
        orderHistoryTestData.orderIDErrorMessage,
      );
      logger.info(
        'Invoice number on order cancel form :' +
          orderHistoryPage.getEditMyOrderCancelOrderID(),
      );
      assert.equal(
        userEmail,
        orderHistoryPage.getEditMyOrderEmailAddress(),
        orderHistoryTestData.userEmailErrorMessage,
      );
      logger.info(
        'Email address  on order cancel form :' +
          orderHistoryPage.getEditMyOrderEmailAddress(),
      );
      orderHistoryPage.selectReasonFromDropDown(
        orderHistoryTestData.orderCancelReason,
      );
      orderHistoryPage.clickOnEditMyOrderSubmitButton();
      const popUp = browser.waitUntil(() => {
        return orderHistoryPage.orderConfirmCancellationPopup.isDisplayed();
      }, 5000);
      logger.info('Confirm Cancellation pop up is displayed : ' + popUp);
      orderHistoryPage.clickonrConfirmCancellationOption('Cancel Order');
      // Added static wait becuase after order confirmation system displays the success popup and it takes time
      browser.pause(5000);
      orderHistoryPage.closeOrderCancelPopup();
    });
    it('should validate the order status for all the languages. ', () => {
      browser.waitUntil(() => {
        return orderHistoryPage.orderStatus.isDisplayed();
      }, 5000);
      logger.info(
        'Order status on order history page :' +
          orderHistoryPage.getOrderStatus(),
      );
      logger.info('Application Languages : ' + langArray);
      for (let index = 0; index < langArray.length; index += 1) {
        if (index > 0) {
          navigationPage.selectLanguage(index);
        }
        // Added static wait because after language change application take time to load the page.
        browser.pause(5000);
        assert.equal(
          orderHistoryTestData.orderStatus[index],
          orderHistoryPage.getOrderStatus(),
          orderHistoryTestData.cancelOrderErrorMessage,
        );
        logger.info(
          'Order status on order history page :' +
            orderHistoryPage.getOrderStatus(),
        );
      }
    });
  },
);
