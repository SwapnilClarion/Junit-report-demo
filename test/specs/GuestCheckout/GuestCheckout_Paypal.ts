import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import payPalPage from '../../../pageObjects/PaypalPage';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Order Confirmation Page for Guest user using Paypal payment method', () => {
  let handles: any = '';
  it('should navigate to men section and click on first product ', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });

  it('should select size and add it to bag ', () => {
    productDescriptionPage.addToBag();
    checkoutPage.closeAllNotification();
    productDescriptionPage.clickCheckoutBtn();
  });
  it('should accept guest users emailid and proceed to checkout page', () => {
    shoppingBagPage.enterUserEmail(randomData.GUEST_EMAIL);
    shoppingBagPage.clickAcceptEmailCheckoutBtn();
  });
  it('should enter shipping address and select payment method', () => {
    checkoutPage.addNewShippingAddress(
      randomData.GUEST_FIRSTNAME,
      randomData.GUEST_LASTNAME,
      randomData.GUEST_STREETADDR,
      randomData.GUEST_CITY,
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
    browser.pause(5000);
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
  it('should confirm the order is placed', () => {
    const payMethod = browser.waitUntil((): any => {
      return orderConfirmationPage.getPaymentMethod();
    }, 10000);

    const orderMsg = browser.waitUntil((): any => {
      return orderConfirmationPage.getOrderIdAndStatusMsg();
    }, 5000);

    const checkBtn = browser.waitUntil(() => {
      return orderConfirmationPage.checkCreateAccBtn();
    }, 5000);

    const passwordField = browser.waitUntil(() => {
      return orderConfirmationPage.checkPasswordField();
    }, 5000);
    expect(checkBtn).to.equal(true);
    expect(payMethod).to.equal(orderConfirmationTestData.OrderConfirmationPay);
    expect(orderMsg).to.contains(
      orderConfirmationTestData.OrderConfirmationMsg,
    );
    expect(passwordField).to.equal(true);
  });
});
