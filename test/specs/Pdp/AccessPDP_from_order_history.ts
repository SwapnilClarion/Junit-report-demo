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
describe('Validate a user is able access PDP from order history page', () => {
  let userEmail = '';
  let orderId: any = '';
  let description: any = [];
  it('should take user to login/Signup page', () => {
    logger.info('=============Access PDP from  Order History========');
    navigationPage.clickOnLoginLink();
    browser.waitUntil(
      () => {
        return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
      },
      5000,
      loginSignUpTestData.LOGIN_PAGE_LOADING_ERROR,
    );
    const url: any = browser.waitUntil((): any => {
      return browser.getUrl();
    }, 5000);
    expect(url).to.include(loginSignUpTestData.LOGIN_URL);
  });
  it('should perform signup process and land on account details page', () => {
    userEmail = randomData.GUEST_EMAIL;
    logger.info('User Email : ' + userEmail);
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
  it('should land on account details page and verify emailid ', () => {
    const email: any = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });

  it('Should navigate to product listing page click on first product', () => {
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
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
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
      10000,
      orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
    );
    assert.equal(
      browser.getTitle(),
      orderConfirmationTestData.orderConfirmationTitle,
      orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
    );
  });

  it('Should validate payment method type on confirmation', () => {
    const actualPaymentMethod: string = orderConfirmationPage.getPaymentMethod();
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
    const ActualOrderConfirmationText: string = orderConfirmationPage.getOrderConfirmationText();
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
    const orderIdPresent: boolean = browser.waitUntil(() => {
      return orderHistoryPage.orderId.isDisplayed();
    });
    logger.info('Order-Id present on Order History page  : ' + orderIdPresent);
    if (!orderIdPresent) {
      logger.info(orderConfirmationTestData.orderHistory_order_id_error);
    }
    const orderIdTxt: any = browser.waitUntil((): any => {
      return orderHistoryPage.getOrderId().trim();
    });
    logger.info('Order-Id from Order History Page  : ' + orderIdTxt);
    expect(orderId).to.equal(orderIdTxt);
  });
  it('should verify view-details link is clickable', () => {
    const viewDetailsLnkStatus: boolean = browser.waitUntil(() => {
      return orderHistoryPage.viewDetails.isDisplayed();
    });
    logger.info('View Details link is Present  : ' + viewDetailsLnkStatus);
    const viewDetailsLnk: boolean = browser.waitUntil(() => {
      return orderHistoryPage.viewDetails.isClickable();
    });
    logger.info('View Details Link is Clickable  :  ' + viewDetailsLnk);
    orderHistoryPage.clickViewDetailsLnk();
  });
  it('should verify order-id on order details page', () => {
    const orderIdTxt: any = browser.waitUntil((): any => {
      return orderHistoryPage.getOrderId().trim();
    }, 5000);
    logger.info('Order Details page with Order-Id  :' + orderIdTxt);
    expect(orderId).to.equal(orderIdTxt);
    browser.waitUntil(() => {
      return orderHistoryPage.productName.isDisplayed();
    }, 5000);
    description = browser.waitUntil((): any => {
      return orderHistoryPage.getDescriptionContent();
    }, 5000);
    logger.info('Description  =  ' + description);
  });
  it('should verify brand name heading with the brand name from order History', () => {
    orderHistoryPage.clickOnBrandName();
    const brandPlpHeading: any = browser.waitUntil((): any => {
      return productListingPage.getDisplayedBrandName();
    }, 5000);
    logger.info('Brand PLP Heading  :  ' + brandPlpHeading);
    logger.info(description[0] + ' === ' + brandPlpHeading);
    expect(description[0]).to.equal(brandPlpHeading);
  });
  it('should go back to order history and  click on brand image and land on product PDP', () => {
    browser.back();
    browser.waitUntil(() => {
      return orderHistoryPage.productName.isDisplayed();
    }, 5000);
    orderHistoryPage.clickOnBrandImg();
    browser.waitUntil((): any => {
      return productDescriptionPage.brandName.isDisplayed();
    }, 5000);
    const brandName: any = browser.waitUntil((): any => {
      return productDescriptionPage.getTextName();
    }, 5000);
    logger.info('PDP brand Name  :  ' + brandName);
    const prodSKU: any = browser.waitUntil((): any => {
      return productDescriptionPage.getProdSKU();
    }, 5000);
    logger.info('PDP SKU  :  ' + prodSKU);
    expect(description.includes(brandName, prodSKU)).to.equal(true);
  });
});
