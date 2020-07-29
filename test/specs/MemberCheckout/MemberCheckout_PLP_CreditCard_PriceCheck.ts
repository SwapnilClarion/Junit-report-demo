import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import { randomData } from '../../../utils/random_data';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import orderHistoryPage from '../../../pageObjects/OrderHistoryPage';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import notification from '../../../methods/GetNotification';
import wishlistPage from '../../../pageObjects/WishListPage';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { productListingTestData } from '../../../resources/productListingTestData';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe(
  'Validate Order Confirmation Page for Member user using Credit Card' +
    ' for regular PLP items and Order History page and check Price at all pages',
  () => {
    let orderId: any = '';
    const userEmail: string = randomData.GUEST_EMAIL;
    let plpProductPrice: any = '';
    let pdpProductPrice: any = '';
    it('Should validate that user is not logged in', () => {
      logger.info(' Order History and Price Checks at all pages ====');
      logger.info('Login Link Present : ' + loginPage.isLoginLinkExist());
      assert.equal(
        loginPage.isLoginLinkExist(),
        true,
        loginSignUpTestData.Login_Link_Display_Error,
      );
    });
    it('Should take user to login/Signup page', () => {
      navigationPage.clickOnLoginLink();
      browser.waitUntil(
        () => {
          return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
        },
        5000,
        loginSignUpTestData.LOGIN_PAGE_LOADING_ERROR,
      );
      const url = browser.waitUntil((): any => {
        return browser.getUrl();
      }, 5000);
      expect(url).to.include(loginSignUpTestData.LOGIN_URL);
    });
    it('Should perform signup process and land on account details page', () => {
      if (
        loginPage.viewNotificationMsg() !==
        loginSignUpTestData.Login_SameEmail_Error
      ) {
        loginPage.enterSignUpEmailId('');
        signupMethod.signup(
          userEmail,
          randomData.USER_PASSWORD,
          loginSignUpTestData.NO_THANKS_PROMO,
        );
      }
    });
    it('should land on account details page and verify emailid ', () => {
      const email = browser.waitUntil((): any => {
        return accountDetailsPage.checkEmailId('value');
      }, 5000);
      expect(userEmail).to.equal(email);
    });
    it('Should navigate to regular plp and click on first product', () => {
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
      plpProductPrice = browser.waitUntil((): any => {
        return productListingPage.getBothSaleProductPrices();
      }, 5000);
      for (let index = 0; index < plpProductPrice.length; index += 1) {
        logger.info('PLP Product Price : ' + plpProductPrice[index]);
      }
      productListingPage.selectFirstProduct(
        productListingTestData.sale_gender_male,
        productListingTestData.go_to_sale,
      );
    });
    it('Should select size and add product to wishlist and verify prices', () => {
      browser.waitUntil(() => {
        return productDescriptionPage.wishlistBtn.isDisplayed();
      }, 5000);
      productDescriptionPage.addToWishList();
      const actualWishlistNotification = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      checkoutPage.closeAllNotification();
      logger.info(
        'Actual banner text displayed for Add to Bag is: ' +
          actualWishlistNotification,
      );
      pdpProductPrice = browser.waitUntil((): any => {
        return productDescriptionPage.getBothSaleProductPrices();
      });
      logger.info('PDP product prices  : ' + pdpProductPrice[0]);
      // Price Verify PLP with PDP
      for (let index = 0; index < pdpProductPrice.length; index += 1) {
        logger.info('PLP Product Price : ' + plpProductPrice[index]);
        logger.info('PLP Price === PDP Price Check ');
        logger.info(plpProductPrice[index] + ' === ' + pdpProductPrice[index]);
        expect(plpProductPrice[index]).to.equal(pdpProductPrice[index]);
      }
    });
    it('Should navigate to wishlist page and move the product to Shopping Bag', () => {
      navigationPage.clickOnWishlistLink();
      browser.waitUntil(() => {
        return wishlistPage.productNameOnWishlist.isDisplayed();
      }, 5000);
      const wishlistPrice: any = browser.waitUntil((): any => {
        return wishlistPage.getAllProductPrice();
      }, 5000);
      logger.info('Wishlist Price : ' + wishlistPrice);
      // Price verify PLP with Wishlist
      for (let index = 0; index < wishlistPrice.length; index += 1) {
        logger.info('PLP Price === Wishlist Price Check ');
        logger.info(plpProductPrice[index] + ' === ' + wishlistPrice[index]);
        expect(plpProductPrice[index]).to.equal(wishlistPrice[index]);
      }
      wishlistPage.clickAddToBagBtn();
      const actualWishlistBagNotification = browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      checkoutPage.closeAllNotification();
      logger.info(
        'Actual banner text displayed for Add to Bag is: ' +
          actualWishlistBagNotification,
      );
      browser.waitUntil(() => {
        return wishlistPage.wishlistCheckoutBtn.isDisplayed();
      }, 5000);
      wishlistPage.clickwishlistCheckoutBtn();
    });
    it('Should navigate to Shopping Bag and verify PLP prices with Shopping Bag prices ', () => {
      browser.waitUntil((): any => {
        return shoppingBagPage.getShoppingBagHeading();
      }, 5000);
      const sbPrices: any = browser.waitUntil((): any => {
        return shoppingBagPage.getAllProductPrices();
      }, 5000);
      logger.info('Shopping Bag Prices : ' + sbPrices);
      // Shopping Bag Price Verify
      for (let index = 0; index < sbPrices.length; index += 1) {
        logger.info('PLP Price === Shopping Bag Price Check ');
        logger.info(plpProductPrice[index] + ' === ' + sbPrices[index]);
        expect(plpProductPrice[index]).to.equal(sbPrices[index]);
      }
      shoppingBagPage.clickProceedToCheckoutOnShoppingBag();
    });
    // ------------------------------------
    it('Should add shipping address ', () => {
      browser.waitUntil(
        () => {
          return browser.getTitle() === checkoutTestData.CheckoutPageTitle;
        },
        5000,
        checkoutTestData.CheckoutPageLoadingMessage,
      );
      logger.info('-----------------Checkout Page---------------');
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
    });
    it('Should verify plp prices with checkout prices ', () => {
      const checkoutPrices: any = browser.waitUntil((): any => {
        return checkoutPage.getProductPrices();
      }, 5000);
      for (let index = 0; index < checkoutPrices.length; index += 1) {
        logger.info('PLP Price === Checkout Price Check ');
        logger.info(plpProductPrice[index] + ' === ' + checkoutPrices[index]);
        expect(plpProductPrice[index]).to.equal(checkoutPrices[index]);
      }
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
      // Due to slow response from the CCpay sandbox, the tests are failing.So the timeout
      // 10000 is added to return to order confirmation page
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
      browser.waitUntil(() => {
        return orderConfirmationPage.OrderConfirmationText.isDisplayed();
      }, 5000);
      logger.info('------- Order Confirmation Page --------');
      assert.equal(
        browser.getTitle(),
        orderConfirmationTestData.orderConfirmationTitle,
        orderConfirmationTestData.OrderConfirmationPageLoadingMessage,
      );
    });
    it('Should validate payment method type on confirmation', () => {
      const actualPaymentMethod = orderConfirmationPage.getPaymentMethod();
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
      const ActualOrderConfirmationText = orderConfirmationPage.getOrderConfirmationText();
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
    it('Should validate prices of PLP and Order confirmation page', () => {
      const orderConfPrices: any = orderConfirmationPage.getAllItemsPrices();
      for (let index = 0; index < orderConfPrices.length; index += 1) {
        logger.info('PLP Price === Order Confirmation Price Check ');
        logger.info(plpProductPrice[index] + ' === ' + orderConfPrices[index]);
        expect(plpProductPrice[index]).to.equal(orderConfPrices[index]);
      }
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
      logger.info('------- Order History Page --------');
      const orderIdPresent = browser.waitUntil(() => {
        return orderHistoryPage.orderId.isDisplayed();
      });
      logger.info(
        'Order-Id present on Order History page  : ' + orderIdPresent,
      );
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
      const viewDetailsLnkStatus = browser.waitUntil(() => {
        return orderHistoryPage.viewDetails.isDisplayed();
      });
      logger.info('View Details link is Present  : ' + viewDetailsLnkStatus);
      const viewDetailsLnk = browser.waitUntil(() => {
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
    });
    it('Should validate prices of PLP and Order History page', () => {
      browser.waitUntil(() => {
        return orderHistoryPage.shippingMethod.isDisplayed();
      }, 5000);
      const orderHistoryPrices: any = browser.waitUntil((): any => {
        return orderHistoryPage.getAllItemsPrices();
      }, 5000);
      for (let index = 0; index < orderHistoryPrices.length; index += 1) {
        logger.info('PLP Price === Order History Price Check ');
        logger.info(
          plpProductPrice[index] + ' === ' + orderHistoryPrices[index],
        );
        expect(plpProductPrice[index]).to.equal(orderHistoryPrices[index]);
      }
    });
  },
);
