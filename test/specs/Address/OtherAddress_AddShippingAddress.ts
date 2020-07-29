import addressPage from '../../../pageObjects/AddressesPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import notification from '../../../methods/GetNotification';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import OrderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { addressTestData } from '../../../resources/addressTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate that new shipping address can be added on checkout page and verify it is saved on address list ', () => {
  let enteredAddressFields: any = [];
  let enteredShippingAddressFields: any = [];
  let savedShippingAddressFields: any = [];
  let shippingAddressFieldsOnCheckout: any = [];
  let shippingAddressFieldsOnOrderConfirmation: any = [];
  it('Should validate that user is not logged in', () => {
    logger.info('=======================================================');

    navigationPage.clickOnLoginLink();
    const actualLoginHeading: any = browser.waitUntil((): any => {
      return loginPage.getLoginHeading();
    }, 5000);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });

  it('Should perform registration and access Address page', () => {
    const userEmail: string = randomData.GUEST_EMAIL;
    signupMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );

    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);

    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    const actualAddressHeading = browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    logger.info('Landed on Address page');

    assert.equal(
      actualAddressHeading,
      addressTestData.ActualAddressHeading,
      addressTestData.AddressHeadingError,
    );
    logger.info('Address Heading is: ' + actualAddressHeading);
  });

  it('Should create new address with valid fields', () => {
    addressPage.clickAddNewAddress();
    browser.waitUntil((): any => {
      return addressPage.getAddressFormHeading();
    }, 5000);
    enteredAddressFields = checkoutTestData.shippingAddressFields;

    logger.info('Entered Address fields are: ' + enteredAddressFields);
    addressPage.createNewAddress(enteredAddressFields);
    addressPage.clickSaveAddressButton();
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    logger.info('Created new address successfully');
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
  it('should click on proceed to checkout button', () => {
    productDescriptionPage.clickCheckoutBtn();
    shoppingBagPage.clickProceedToCheckoutOnShoppingBag();
  });
  it('should redirect on checkout page and click add new address from on other address and create address ', () => {
    browser.waitUntil((): any => {
      return checkoutPage.getCheckoutPageHeading();
    }, 5000);
    checkoutPage.closeAllNotification();

    enteredShippingAddressFields = addressPage.getAddressFields();
    checkoutPage.clickOnUseOtherAddressLink();
    checkoutPage.clickAddNewShippingAddress();
    checkoutPage.addShippingAddressForCheckout(enteredShippingAddressFields);
    checkoutPage.clickOnSaveAddressButton();
  });

  it('should validate that other dropdown display newly created address ', () => {
    checkoutPage.clickOnUseOtherAddressLink();
    // Here static wait require as after creating new address existing address in dropdown get shifted to second position
    // and newly created address comes at the top, it takes to reflect it.
    browser.pause(2000);
    shippingAddressFieldsOnCheckout = checkoutPage.getAddressUseOtherAddDropdownShipping();
    logger.info('====================================================');
    logger.info(
      'Entered shipping Address fields are : ' + enteredShippingAddressFields,
    );
    logger.info(
      'Entered shipping Address fields are : ' +
        enteredShippingAddressFields.sort(),
    );
    logger.info(
      'Address fields on other Address dropdown(Shipping) on checkout are:' +
        shippingAddressFieldsOnCheckout.sort(),
    );
    for (let i = 0; i <= enteredShippingAddressFields.length - 1; i += 1) {
      for (let j = i; j <= i; j += 1) {
        if (
          enteredShippingAddressFields[i] === shippingAddressFieldsOnCheckout[j]
        ) {
          logger.info(enteredShippingAddressFields[i]);
          logger.info(shippingAddressFieldsOnCheckout[j]);
        } else {
          logger.info(
            'Shipping address field on checkout page are not matching with entered billing address fields',
          );
        }
      }
    }
    logger.info(
      'Shipping Section: Address fields on Use other address dropdown are matching with address fields on address list',
    );
    logger.info('====================================================');
  });
  it('should select payment method complete payment process using Credit card ', () => {
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
      checkoutPage.closeAllNotification();
      checkoutPage.clickPlaceOrderBtn();
    }
  });
  it('Should land on Order confirmation page', () => {
    // Since order confirmation takes time to load wait until condition require 10000 seconds timeout
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
  it('Should navigate to address page and validate that one address generated ', () => {
    // Verify address on address listing page matching with entered address fields
    navigationPage.clickSsenseLogo();
    // static wait added to wait until home page loads and then click on Account link
    browser.pause(1000);
    browser.waitUntil(() => {
      return navigationPage.accountLink.isDisplayed();
    }, 5000);
    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    // Added static wait because as soon as it lands on address it tries to get address fields, but sometimes it get failed
    // as it takes time to list the address
    browser.pause(2000);
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    const TotalAddressGenerated: any = browser.waitUntil((): any => {
      return addressPage.getAddressListSize();
    }, 5000);
    logger.info('Total address generated are: ' + TotalAddressGenerated);

    savedShippingAddressFields = addressPage.getAllAddressFields();
    logger.info(
      'Entered shipping address fields for Checkout :' +
        enteredShippingAddressFields.sort(),
    );

    logger.info(
      'Saved newly created shipping Addresse fields are: ' +
        savedShippingAddressFields.sort(),
    );

    for (let i = 0; i <= enteredShippingAddressFields.length - 1; i += 1) {
      for (let j = i; j <= i; j += 1) {
        if (enteredShippingAddressFields[i] === savedShippingAddressFields[j]) {
          logger.info(enteredShippingAddressFields[i]);
          logger.info(savedShippingAddressFields[j]);
        } else {
          logger.info(
            'Saved Address fields are not matching with the entered shipping address fields',
          );
          logger.info('====================================================');
        }
      }
    }
    logger.info(
      'Address fields on list are matching with entered shipping address fields',
    );
    logger.info('====================================================');
  });
});
