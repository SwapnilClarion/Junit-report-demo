import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import aliPayPage from '../../../pageObjects/AliPayPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import notification from '../../../methods/GetNotification';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { productListingTestData } from '../../../resources/productListingTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Order Confirmation Page for Guest user for sale and non-sale items using AliPay', () => {
  it('should navigate to men section and click on first product ', () => {
    logger.info(
      '============= Guest Checkout for Sale and Non-Sale items using Alipay ================',
    );
    navigationPage.clickOnMenOuterLink();
  });
  it('Should validate that sale feature is enabled', () => {
    logger.info('Sale Link Present : ' + navigationPage.isSaleLinkExist());
    assert.equal(
      navigationPage.isSaleLinkExist(),
      true,
      productListingTestData.Sale_Link_Display_Error,
    );
  });
  // Sale
  it('Should navigate to sale plp and click on first product', () => {
    logger.info('----Sale Product-----');
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    productListingPage.goToPlp(
      productListingTestData.sale_gender_female,
      productListingTestData.go_to_sale,
    );
    browser.waitUntil((): any => {
      return productListingPage.getfirstSaleProductPrice();
    }, 5000);
    productListingPage.selectFirstProduct(
      productListingTestData.sale_gender_male,
      productListingTestData.go_to_sale,
    );
  });
  it('Should select size and add product to shopping bag', () => {
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
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
  // Non-Sale
  it('Should navigate to Non-sale plp and click on first product', () => {
    logger.info('----Non-Sale Product-----');
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    productListingPage.goToPlp(
      productListingTestData.sale_gender_male,
      productListingTestData.go_to_plp,
    );
    browser.waitUntil((): any => {
      return productListingPage.getfirstProductPrice();
    }, 5000);
    productListingPage.getNonSaleProducts();
  });
  it('Should select size and add product to shopping bag', () => {
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
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
  // -----------
  it('Should accept guest users email address and proceed to checkout page ', () => {
    const shoppingBagPageTitle = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Shopping Bag Page Title ==> ' + shoppingBagPageTitle);
    const userEmail = randomData.GUEST_EMAIL;
    logger.info('Guest Email Id ===> ' + userEmail);
    shoppingBagPage.enterUserEmail(userEmail);
    shoppingBagPage.clickAcceptEmailCheckoutBtn();
  });

  it('Should add shipping address ', () => {
    browser.waitUntil(
      () => {
        return browser.getTitle() === checkoutTestData.CheckoutPageTitle;
      },
      5000,
      checkoutTestData.CheckoutPageLoadingMessage,
    );
    logger.info(' Checkout Page Title === > ' + browser.getTitle());
    checkoutPage.addNewShippingAddress(
      randomData.GUEST_FIRSTNAME,
      randomData.GUEST_LASTNAME,
      randomData.GUEST_STREETADDR,
      checkoutTestData.CITY_NAME,
      checkoutTestData.ZIP_CODE,
      checkoutTestData.ALIPAY_COUNTRY,
      checkoutTestData.ALIPAY_STATE,
      checkoutTestData.PHONE_NUMBER,
    );
  });
  it('should select paypment method complete payment process using Alipay and return to SSense ', () => {
    checkoutPage.closeAllNotification();
    checkoutPage.selectPaymentMethod(checkoutTestData.alipay_payment_method);
    checkoutPage.clickCheckoutSubmitBtn();

    if (!checkoutPage.orderTotalAlert.isExisting()) {
      logger.info('Order Total alert is not displayed');
    } else {
      checkoutPage.clickPlaceOrderBtn();
    }
    aliPayPage.alipayPayment();
  });

  it('Should land on Order confirmation page', () => {
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
    const payMethod = browser.waitUntil((): any => {
      return orderConfirmationPage.getPaymentMethod();
    }, 5000);
    assert.equal(
      payMethod,
      orderConfirmationTestData.Expected_alipay_payment_method_order_confirmation,
      orderConfirmationTestData.PaymentTypeTextDisplayMessage,
    );
  });

  it('Should validate Password inputbox is present on order confirmation', () => {
    const passwordFieldStatus = browser.waitUntil(() => {
      return orderConfirmationPage.checkPasswordField();
    }, 5000);
    logger.info('PASSWORD Inputbox VALUE IS ' + passwordFieldStatus);
    assert.equal(
      passwordFieldStatus,
      true,
      orderConfirmationTestData.PasswordInputDisplayMessage,
    );
  });

  it('Should validate Create an Account button is present on order confirmation', () => {
    const createBtnStatus = browser.waitUntil(() => {
      return orderConfirmationPage.checkCreateAccBtn();
    }, 5000);
    logger.info('CREATE ACCOUNT VALUE ' + createBtnStatus);
    assert.equal(
      createBtnStatus,
      true,
      orderConfirmationTestData.CreateAccountButtonDisplayMessage,
    );
  });

  it('Should validate order confirmation message on order confirmation page', () => {
    const ActualOrderConfirmationText = browser.waitUntil((): any => {
      return orderConfirmationPage.getOrderConfirmationText();
    }, 5000);

    logger.info(
      'CONFIRMATION TEXT is ' +
        orderConfirmationPage.getOrderConfirmationText(),
    );
    expect(ActualOrderConfirmationText).to.include(
      orderConfirmationTestData.Exp_Order_Confirmation_Text,
    );
  });
});
