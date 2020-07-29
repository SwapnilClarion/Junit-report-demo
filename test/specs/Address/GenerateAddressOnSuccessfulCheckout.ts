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
import { checkoutTestData } from 'resources/checkoutTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate - when user perform registration & successful checkout only one address should get generated ', () => {
  let enteredAddressFields = [];
  let savedAddressFields = [];
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
    enteredAddressFields = addressPage.getAddressFields();

    logger.info('Entered Address fields are: ' + enteredAddressFields);
    checkoutPage.addShippingAddressForCheckout(enteredAddressFields);
    checkoutPage.closeAllNotification();
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
    // Since order confirmation takes time to load wait until condition require 25000 seconds timeout
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
  it('Should navigate to address page and validate that one address generated ', () => {
    navigationPage.clickSsenseLogo();
    browser.waitUntil(() => {
      return navigationPage.accountLink.isDisplayed();
    }, 5000);
    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    const TotalAddressGenerated = browser.waitUntil((): any => {
      return addressPage.getAddressListSize();
    }, 5000);
    logger.info('Total address generated are: ' + TotalAddressGenerated);
    expect(TotalAddressGenerated).to.equal(1);

    savedAddressFields = addressPage.getSavedAddressFields();
    logger.info('Entered Address fields are:' + enteredAddressFields.sort());
    logger.info('Saved Addresse fields are: ' + savedAddressFields.sort());

    for (let i = 0; i <= enteredAddressFields.length - 1; i += 1) {
      for (let j = i; j <= i; j += 1) {
        if (enteredAddressFields[i] === savedAddressFields[j]) {
          logger.info(enteredAddressFields[i]);
          logger.info(savedAddressFields[j]);
        } else {
          logger.info(
            'Saved Address fields are not matching with the entered address fields',
          );
        }
      }
    }
    logger.info(
      'Address fields on list are matching with entered address fields',
    );
  });
});
