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
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { addressTestData } from '../../../resources/addressTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate user is able to edit shipping address without save action ', () => {
  let enteredAddressFields: any = [];
  let updatedData: any;
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

  it('Should navigate to product listing page select first product and add it to bag and perform proceed to checkout', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    browser.waitUntil(() => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    productDescriptionPage.addToBag();

    browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
  });
  it('Should click on proceed to checkout button', () => {
    productDescriptionPage.clickCheckoutBtn();
    shoppingBagPage.clickProceedToCheckoutOnShoppingBag();
  });
  it('Should redirect on checkout page and click edit link from other address and edit the address without clicking save button ', () => {
    browser.waitUntil((): any => {
      return checkoutPage.getCheckoutPageHeading();
    }, 5000);
    checkoutPage.closeAllNotification();
    checkoutPage.clickOnUseOtherAddressLink();
    checkoutPage.clickOnEditLinkAddressDropDown();
    updatedData = randomData.GUEST_STREETADDR;
    logger.info('Data used to update the street field address :' + updatedData);
    checkoutPage.enterAddressInput(updatedData);
  });
  it('Should select payment method complete payment process using Credit card ', () => {
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
  it('Should validate the update billing and shipping address on order confirmation page and click on continue shopping button ', () => {
    for (let index = 0; index <= 1; index += 1) {
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
    // Validates the  two addresses are created or not
    assert.equal(
      addressPage.getAddressListSize(),
      addressTestData.addressListSizeCount,
      addressTestData.presentAddresValidateMesssage,
    );
    assert.equal(
      addressPage.validateUpdatedSavedAddress(updatedData),
      true,
      addressTestData.shippingAddressValidateMessage,
    );
  });
});
