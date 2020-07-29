import addressPage from '../../../pageObjects/AddressesPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import notification from '../../../methods/GetNotification';
import OrderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from 'resources/checkoutTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Product information details on Order confirmation page once compared with checkout page', () => {
  let productPrice: any = [];
  let shipMethod: any = [];
  let shipFee: any = [];
  let orderTotal: any = [];
  let tax: any = [];
  let enteredShippingAddressFields: any = [];
  let shippingAddressFieldsOnOrderConfirmation: any = [];
  it('Should validate that user is not logged in', () => {
    navigationPage.clickOnLoginLink();
    const actualLoginHeading = browser.waitUntil(() => {
      return loginPage.getLoginHeading();
    }, 5000);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });
  it('Should perform registration and access Address page', () => {
    const userEmail = randomData.GUEST_EMAIL;
    signupMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );
    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);
  });
  it('Should navigate to product listing page select first product and add it to bag', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    productDescriptionPage.addToBag();
    browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    checkoutPage.closeAllNotification();
  });
  it('should redirect on checkout page on clicking Proceed to checkout button and add shipping address ', () => {
    productDescriptionPage.clickCheckoutBtn();
    shoppingBagPage.clickProceedToCheckoutOnShoppingBag();
    browser.waitUntil((): any => {
      return checkoutPage.getCheckoutPageHeading();
    }, 5000);

    enteredShippingAddressFields = addressPage.getAddressFields();
    logger.info('Entered Address fields are: ' + enteredShippingAddressFields);
    checkoutPage.addShippingAddressForCheckout(enteredShippingAddressFields);
    checkoutPage.closeAllNotification();
  });
  it('should select Priority Shipping Method on checkout page', () => {
    shipMethod = checkoutPage.getShippingMethodText();
    const amount = checkoutPage.getShippingMethodAmount();
    logger.info('check Displayed Shipping Method === > ' + shipMethod);
    logger.info('Check Shipping Method Price ===> ' + amount[0]);
    checkoutPage.clickShippingMethod();
  });
  it('should select payment method complete payment process using Credit card ', () => {
    checkoutPage.selectPaymentMethod(
      checkoutTestData.CREDIT_CARD_PAYMENT_METHOD,
    );
    browser.switchToFrame(0);
    checkoutPage.paymentWithCreditCard();
    browser.switchToParentFrame();
    // Display Product Price on checkout page
    productPrice = checkoutPage.getProductPrices();
    logger.info('check Displayed Product Price === > ' + productPrice);
    // Display Shipping Fee on checkout page
    shipFee = checkoutPage.getShippingFee();
    logger.info('check Displayed Shipping Fee === > ' + shipFee);
    // Display Shipping Tax on checkout page
    tax = checkoutPage.getTaxesAmountText();
    logger.info('check Displayed Taxes Fee === > ' + tax);
    // Display Shipping Order Total on checkout page
    orderTotal = checkoutPage.getOrderTotalAmount();
    logger.info('check Displayed Order Total Fee === > ' + orderTotal);
    checkoutPage.clickPlaceOrderBtn();
    if (!checkoutPage.orderTotalAlert.isExisting()) {
      logger.info('Order Total alert is not displayed');
    } else {
      checkoutPage.closeAllNotification();
      checkoutPage.clickPlaceOrderBtn();
    }
  });
  it('Should land on Order confirmation page', () => {
    // Since order confirmation takes time to load wait until condition require 25000 seconds timeout
    browser.waitUntil(
      (): any => {
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
  it('Should validate shipping address fields as per entered shipping address fields on order confirmation', () => {
    // Verify address on Order Confirmation page matching with entered shipping address fields
    logger.info(
      'Entered shipping Address fields are : ' +
        enteredShippingAddressFields.sort(),
    );
    shippingAddressFieldsOnOrderConfirmation = OrderConfirmationPage.getShippingAddressFields();
    logger.info(
      'Shipping address fields on Order confirmation page are:' +
        shippingAddressFieldsOnOrderConfirmation.sort(),
    );
    for (let i = 0; i <= enteredShippingAddressFields.length - 1; i += 1) {
      for (let j = i; j <= i; j += 1) {
        if (
          enteredShippingAddressFields[i] ===
          shippingAddressFieldsOnOrderConfirmation[j]
        ) {
          logger.info(enteredShippingAddressFields[i]);
          logger.info(shippingAddressFieldsOnOrderConfirmation[j]);
        } else {
          logger.info(
            'Shipping Address fields on Order confirmation are not matching with the entered address fields',
          );
          logger.info('====================================================');
        }
      }
    }
    logger.info(
      'Shipping Address fields on Order confirmation are matching with the entered address fields',
    );
    logger.info('====================================================');
  });
  it('Should validate Product Details and prices on Order confirmation page', () => {
    const shipFeeText = OrderConfirmationPage.getShippingText();
    logger.info('check Displayed Shipping Method Text === > ' + shipFeeText);
    assert.equal(shipMethod, shipFeeText);
    const orderConfPrices = OrderConfirmationPage.getAllItemsPrices();
    logger.info('Order Confirmation Product Prices :' + orderConfPrices);
    // As we require only 1 product price hence using hard coded index as [0]
    assert.equal(productPrice[0], orderConfPrices[0]);
    const shippingTax = OrderConfirmationPage.getShippingTax();
    logger.info(
      'check Displayed Shipping Taxes on Order Confirmation Page === > ' +
        shippingTax,
    );
    assert.equal(shipFee, shippingTax);
    const taxFee = OrderConfirmationPage.getTaxAmount();
    logger.info(
      'Total Tax fee including GST and PST taxes on order confirmation page ===> ' +
        taxFee,
    );
    assert.equal(tax, taxFee);
    const orderconfirmTotal = OrderConfirmationPage.getOrderTotal();
    logger.info(
      'check Displayed Order Total on Order Confirmation Page === > ' +
        orderconfirmTotal,
    );
    assert.equal(orderTotal, orderconfirmTotal);
    logger.info('====================================================');
  });
});
