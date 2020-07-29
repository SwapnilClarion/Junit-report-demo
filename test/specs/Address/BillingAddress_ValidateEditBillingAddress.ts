import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import loginPage from '../../../pageObjects/LoginPage';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import addressPage from '../../../pageObjects/AddressesPage';
import assert from 'assert';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { addressTestData } from '../../../resources/addressTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate the user is able to edit billing address', () => {
  let userEmail: any = '';
  let enteredAddressFields: any = [];
  let updatedData: any;
  it('Should take user to login/Signup page', () => {
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
  it('Should perform signup process and land on account details page', () => {
    userEmail = randomData.GUEST_EMAIL;
    if (
      loginPage.viewNotificationMsg() !==
      'A member with same email already exists'
    ) {
      signupMethod.signup(
        userEmail,
        randomData.USER_PASSWORD,
        loginSignUpTestData.NO_THANKS_PROMO,
      );
    }
  });
  it('Should land on account details page and verify emailid ', () => {
    const email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });
  it('should click on address link ', () => {
    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
  });

  it('Should create new address with valid fields', () => {
    for (let index = 0; index <= 1; index += 1) {
      addressPage.clickAddNewAddress();
      browser.waitUntil((): any => {
        return addressPage.getAddressFormHeading();
      }, 5000);
      if (index === 0) {
        enteredAddressFields = checkoutTestData.shippingAddressFields;
      } else {
        enteredAddressFields = checkoutTestData.billingAddressFields;
      }
      logger.info('Entered Address fields are: ' + enteredAddressFields);
      addressPage.createNewAddress(enteredAddressFields);
      addressPage.clickSaveAddressButton();
      browser.waitUntil((): any => {
        return addressPage.getAddressHeading();
      }, 5000);
    }
    logger.info('Created new address successfully.');
  });
  it('Should navigate to product listing page select first product and add it to bag ', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    browser.waitUntil(() => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    productDescriptionPage.addToBag();
    checkoutPage.closeAllNotification();
  });
  it('Should click on proceed to checkout button ', () => {
    productDescriptionPage.clickCheckoutBtn();
    shoppingBagPage.clickProceedToCheckoutOnShoppingBag();
    browser.waitUntil((): any => {
      return checkoutPage.getCheckoutPageHeading();
    }, 5000);
    checkoutPage.closeAllNotification();
  });
  it('Should click on other billing address edit link and update billing address street field', () => {
    checkoutPage.clickOnUseAsBillingCheckbox();
    checkoutPage.selectPaymentMethod(
      checkoutTestData.CREDIT_CARD_PAYMENT_METHOD,
    );
    checkoutPage.clickOtherAddressForBilling();
    checkoutPage.clickOnBillingOtherAddressEditLink();
    updatedData = randomData.GUEST_STREETADDR;
    logger.info('Data used to update the street field address :' + updatedData);
    checkoutPage.enterBillingAddressInput(updatedData);
    checkoutPage.clickOnSaveBillingAddressButton();
  });
  it('Should validate the billing address street filed is updated on other address dropdown ', () => {
    checkoutPage.clickOtherAddressForBilling();
    // After editing billing address it takes the few time to reflect changes thats why added static wait.
    browser.pause(5000);
    assert.equal(
      checkoutPage.validateEditedBillingAddressFields(updatedData),
      true,
      addressTestData.shippingAddressValidateMessage,
    );
    checkoutPage.clickOnBillingOtherAddressCloseLink();
  });
  it('Should enter payment details and click on place order button', () => {
    checkoutPage.creditCardInput.scrollIntoView();
    browser.switchToFrame(0);
    checkoutPage.paymentWithCreditCard();
    browser.switchToParentFrame();
    checkoutPage.clickPlaceOrderBtn();
    // Since order confirmation takes time to load wait until condition require 25000 seconds timeout
    browser.waitUntil(
      () => {
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
  it('Should validate the update billing and shipping address on order confirmation page and click on continue shopping button ', () => {
    logger.info('Validating updated address filed on order confirmation page');
    for (let index = 1; index <= 1; index += 1) {
      logger.info('Address type : ' + addressTestData.addressType[index]);
      assert.equal(
        orderConfirmationPage.validateUpdatedBillingOrShippingAddress(
          addressTestData.addressType[index],
          updatedData,
        ),
        true,
        addressTestData.shippingAddressValidateMessage,
      );
    }
    orderConfirmationPage.clickContinueShoppingBtn();
  });
  it('Should navigate to address page and validate address is updated on saved address page ', () => {
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
    browser.pause(5000);
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    assert.equal(
      addressPage.validateUpdatedSavedAddress(updatedData),
      true,
      addressTestData.shippingAddressValidateMessage,
    );
  });
});
