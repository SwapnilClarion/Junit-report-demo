import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import payPalPage from '../../../pageObjects/PaypalPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import notification from '../../../methods/GetNotification';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { productListingTestData } from '../../../resources/productListingTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe(
  'Validate Order Confirmation Page for Member user using Paypal payment method' +
    'for Sale Items',
  () => {
    let parentWindow: any = '';
    const userEmail = randomData.GUEST_EMAIL;
    it('Should validate that user is not logged in', () => {
      logger.info(
        '============= Member Checkout for Sale items using Paypal ================',
      );
      logger.info('Login Link Present : ' + loginPage.isLoginLinkExist());
      assert.equal(
        loginPage.isLoginLinkExist(),
        true,
        loginSignUpTestData.Login_Link_Display_Error,
      );
    });
    it('Should take user to login/Signup page', () => {
      navigationPage.clickOnLoginLink();
      browser.waitUntil(
        () => {
          return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
        },
        5000,
        loginSignUpTestData.LOGIN_PAGE_LOADING_ERROR,
      );
      const url = browser.waitUntil((): any => {
        return browser.getUrl();
      }, 5000);
      expect(url).to.include(loginSignUpTestData.LOGIN_URL);
    });
    it('Should perform signup process and land on account details page', () => {
      if (
        loginPage.viewNotificationMsg() !==
        loginSignUpTestData.Login_SameEmail_Error
      ) {
        loginPage.enterSignUpEmailId('');
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
      logger.info('User Email : ' + userEmail);
      expect(userEmail).to.equal(email);
    });
    it('Should perform successfull logout', () => {
      navigationPage.clickOnAccountLink();
      navigationPage.clickOnLogoutLink();
      checkoutPage.closeAllNotification();
      logger.info('---------Logged out-------');
    });
    it('Should validate that sale feature is enabled', () => {
      logger.info('Sale Link Present : ' + navigationPage.isSaleLinkExist());
      assert.equal(
        navigationPage.isSaleLinkExist(),
        true,
        productListingTestData.Sale_Link_Display_Error,
      );
    });
    //   Sale--------------
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
    //   -----------
    it('Should accept emailid,password and proceed to shopping bag  page', () => {
      shoppingBagPage.enterUserEmail(userEmail);
      shoppingBagPage.clickAcceptEmailCheckoutBtn();
      shoppingBagPage.enterUserPassword(randomData.USER_PASSWORD);
      shoppingBagPage.clickLoginBtn();
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
        checkoutTestData.CITY_NAME,
        checkoutTestData.ZIP_CODE,
        checkoutTestData.COUNTRY,
        checkoutTestData.STATE,
        checkoutTestData.PHONE_NUMBER,
      );
      checkoutPage.closeAllNotification();
    });

    it('Should select Paypal payment method Paypal', () => {
      browser.pause(5000);
      const paymentMethod = checkoutTestData.Paypal_Method_Type;
      checkoutPage.selectPaymentMethod(paymentMethod);
    });

    it('Should click on Pay with paypal button and switch to paypal window', () => {
      // Due to slow response from Paypal we have to rely on static waits.
      parentWindow = browser.getWindowHandle();
      browser.pause(5000);
      checkoutPage.paypalExpressBtn.scrollIntoView();
      checkoutPage.clickPaypalExpressBtn();

      const handles = browser.getWindowHandles();
      browser.pause(4000);
      logger.info(`============================= Handles=====> ${handles}`);
      browser.switchToWindow(handles[1]);
      browser.pause(10000);
    });

    it('Should enter payment login details and land on paypal checkout page ', () => {
      // Paypal Popup

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
      browser.switchToWindow(parentWindow);
    });

    it('Should land on Order confirmation page', () => {
      // Due to time lag between paypal pop-up and getting back to ssense
      // we have to add this much wait.
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
      const actualPaypalPaymentMethod = orderConfirmationPage.getPaymentMethod();
      assert.equal(
        actualPaypalPaymentMethod,
        orderConfirmationTestData.Expected_Paypal_payment_method_order_confirmation,
        orderConfirmationTestData.PaymentTypeTextDisplayMessage,
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
  },
);
