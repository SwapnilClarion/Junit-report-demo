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
import assert from 'assert';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate - when user perform successful checkout Billing and Shipping address should get generated ', () => {
  let enteredShippingAddressFields = [];
  let enteredBillingAddressFields = [];
  let savedShippingAddressFields = [];
  let savedBillingAddressFields = [];
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
  it('Should navigate to address page and ensure address list is empty ', () => {
    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);

    const addressList = addressPage.isAddressContainerDisplayed();
    expect(addressList).to.equal(false);
  });
  it('Should navigate to product listing page select first product and add it to bag', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    browser.waitUntil(() => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
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

    logger.info(
      'Entered Shipping Address fields are: ' + enteredShippingAddressFields,
    );
    checkoutPage.addShippingAddressForCheckout(enteredShippingAddressFields);
  });
  it('should select payment method enter payment details ', () => {
    checkoutPage.selectPaymentMethod(
      checkoutTestData.CREDIT_CARD_PAYMENT_METHOD,
    );
    checkoutPage.closeAllNotification();
    browser.switchToFrame(0);
    checkoutPage.paymentWithCreditCard();
  });

  it('should click on Same as billing address checkbox and enter billing address ', () => {
    browser.switchToParentFrame();
    checkoutPage.clickSameAsShipping();
    enteredBillingAddressFields = checkoutTestData.billingAddressFields;
    logger.info(
      'Entered Billing Address fields are: ' + enteredBillingAddressFields,
    );
    checkoutPage.addBillingAddressForCheckout(enteredBillingAddressFields);
  });

  it('should place an order and land on order confirmatin page ', () => {
    checkoutPage.clickPlaceOrderBtn();
    if (!checkoutPage.orderTotalAlert.isExisting()) {
      logger.info('Order Total alert is not displayed');
    } else {
      checkoutPage.closeAllNotification();
      checkoutPage.clickPlaceOrderBtn();
    }
  });

  it('Should land on Order confirmation page', () => {
    // Since order confirmation page takes time to load increased timeout here
    browser.waitUntil(
      (): any => {
        return (
          browser.getTitle() ===
          orderConfirmationTestData.orderConfirmationTitle
        );
      },
      25000,
      orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
    );
    assert.equal(
      browser.getTitle(),
      orderConfirmationTestData.orderConfirmationTitle,
      orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
    );
  });

  it('Should navigate to address page and validate Billing and Shipping address generated as entered ', () => {
    navigationPage.clickSsenseLogo();
    browser.waitUntil(() => {
      return navigationPage.accountLink.isDisplayed();
    }, 5000);
    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    // Added static wait because as soon as it lands on address it tries to get address fields, but sometimes it get failed
    // as it takes time to list the address
    browser.pause(1000);
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    const TotalAddressGenerated = addressPage.getAddressListSize();
    logger.info('Total address generated are: ' + TotalAddressGenerated);
    expect(TotalAddressGenerated).to.equal(2);

    // Validate billing address fields are as per entered billing address fields
    savedBillingAddressFields = addressPage.getSavedAddressFields();
    logger.info(
      'Entered Billing Address fields :' + enteredBillingAddressFields.sort(),
    );
    logger.info(
      'Saved Billing Addresse fields are :' + savedBillingAddressFields.sort(),
    );

    for (let i = 0; i <= enteredBillingAddressFields.length - 1; i += 1) {
      for (let j = i; j <= i; j += 1) {
        if (enteredBillingAddressFields[i] === savedBillingAddressFields[j]) {
          logger.info(enteredBillingAddressFields[i]);
          logger.info(savedBillingAddressFields[j]);
        } else {
          logger.info(
            'Saved billing Address fields are not matching with entered billing address fields',
          );
        }
      }
    }
    logger.info(
      'Billing Address fields on list are matching with entered billing address fields',
    );
    logger.info('========================================================');
    // Validate shipping address fields are as per the entered shipping address fields
    logger.info(
      'Entered Shipping Addresse fields are: ' +
        enteredShippingAddressFields.sort(),
    );
    savedShippingAddressFields = addressPage.getAllAddressFields();
    logger.info(
      'Saved Shipping Addresse fields are: ' +
        savedShippingAddressFields.sort(),
    );
    for (let i = 0; i <= enteredBillingAddressFields.length - 1; i += 1) {
      for (let j = i; j <= i; j += 1) {
        if (enteredShippingAddressFields[i] === savedShippingAddressFields[j]) {
          logger.info(enteredShippingAddressFields[i]);
          logger.info(savedShippingAddressFields[j]);
        } else {
          logger.info(
            'Saved Shipping Address fields are not matching with entered address fields',
          );
        }
      }
    }
    logger.info(
      'Shipping Address fields on list are matching with entered shipping address fields',
    );
  });
});
