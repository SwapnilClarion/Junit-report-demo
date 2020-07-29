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
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { addressTestData } from '../../../resources/addressTestData';
import { globalTestData } from '../../../resources/globalTestData';
import { expect } from 'chai';
globalTestData.FILE_PATH = __filename;
describe('Validate that updating existing billing address can be saved without save click ', () => {
  let enteredAddressFields: any = [];
  let enteredBillingAddressFields: any = [];
  let newBillingAddressText: any = [];
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

  it('Should create 2 new address with valid fields', () => {
    addressPage.clickAddNewAddress();
    browser.waitUntil((): any => {
      return addressPage.getAddressFormHeading();
    }, 5000);
    enteredAddressFields = checkoutTestData.billingAddressFields;

    logger.info('Entered Address fields are: ' + enteredAddressFields);
    addressPage.createNewAddress(enteredAddressFields);
    addressPage.clickSaveAddressButton();
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    logger.info('Created new address successfully');
    addressPage.clickAddNewAddress();
    browser.waitUntil((): any => {
      return addressPage.getAddressFormHeading();
    }, 5000);
    enteredBillingAddressFields = checkoutTestData.shippingAddressFields;

    logger.info(
      'Entered Billling address fields are: ' + enteredBillingAddressFields,
    );
    addressPage.createNewAddress(enteredBillingAddressFields);
    addressPage.clickSaveAddressButton();
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
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
  it('should redirect on checkout page, update existing billing address and checkout without save', () => {
    browser.waitUntil((): any => {
      return checkoutPage.getCheckoutPageHeading();
    }, 5000);

    checkoutPage.closeAllNotification();
    enteredBillingAddressFields = addressPage.getAddressFields();
    checkoutPage.clickOnUseAsBillingCheckbox();
    checkoutPage.selectPaymentMethod(
      checkoutTestData.CREDIT_CARD_PAYMENT_METHOD,
    );
    // validate presence of Edit button and update existing address text for billing address
    newBillingAddressText = randomData.GUEST_STREETADDR;
    logger.info('Address text to be updated: ' + newBillingAddressText);
    checkoutPage.clickOtherAddressForBilling();

    expect(checkoutPage.isEditButtonDisplayedBillingAddDropdown()).to.equal(
      true,
    );
    checkoutPage.clickOnBillingOtherAddressEditLink();
    checkoutPage.enterBillingAddressInput(newBillingAddressText);
  });
  it('should complete payment process using Credit card ', () => {
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
  it('Validate udated address text for billing address section ', () => {
    const savedBillingAddressData = OrderConfirmationPage.getBillingAddressValue();
    logger.info(
      'Saved billing address text on order confirmation: ' +
        savedBillingAddressData,
    );
    assert.equal(
      newBillingAddressText,
      savedBillingAddressData,
      orderConfirmationTestData.billingAddressTextError,
    );
  });
  it('Should navigate to address page and validate updated address text for billing address ', () => {
    // Verify address text on address listing page matching with updated address text
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

    const savedBillingAddressTextData = addressPage.getAddressTextBilling();
    logger.info(
      'Saved billing address text on address listing page: ' +
        savedBillingAddressTextData,
    );
    assert.equal(
      newBillingAddressText,
      savedBillingAddressTextData,
      orderConfirmationTestData.billingAddressTextError,
    );

    // validate that billing address text saved is not duplicate
    const addressTextShipping: string = addressPage.getAddressTextShipping();
    expect(addressTextShipping).not.equal(newBillingAddressText);
  });
});
