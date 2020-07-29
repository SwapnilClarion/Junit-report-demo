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
    ' for sale and non-sale items and Order History page and check Price at all pages',
  () => {
    let orderId: any = '';
    const userEmail: string = randomData.GUEST_EMAIL;
    let plpSaleProductPrice: any = [];
    let plpNonSaleProductPrice: any = '';
    let pdpSaleProductPrice: any = [];
    let pdpNonSaleProductPrice: any = '';
    it('Should validate that user is not logged in', () => {
      logger.info(
        '=== Member Checkout for Sale and Non-Sale using Credit card ' +
          ' Order History and Price Checks at all pages ====',
      );
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
    it('Should validate that sale feature is enabled', () => {
      logger.info('Sale Link Present : ' + navigationPage.isSaleLinkExist());
      assert.equal(
        navigationPage.isSaleLinkExist(),
        true,
        productListingTestData.Sale_Link_Display_Error,
      );
    });
    // Sale-------------------------------
    it('Should navigate to sale plp and click on first product', () => {
      logger.info('----Sale Product-----');
      browser.waitUntil((): any => {
        return browser.getTitle();
      }, 5000);
      productListingPage.goToPlp(
        productListingTestData.sale_gender_male,
        productListingTestData.go_to_sale,
      );
      browser.waitUntil((): any => {
        return productListingPage.getfirstSaleProductPrice();
      }, 5000);
      plpSaleProductPrice = browser.waitUntil((): any => {
        return productListingPage.getBothSaleProductPrices();
      }, 5000);
      logger.info('PLP Sale Product Price : ' + plpSaleProductPrice);
      productListingPage.selectFirstProduct(
        productListingTestData.sale_gender_male,
        productListingTestData.go_to_sale,
      );
    });
    it('Should select size and add product to wishlist', () => {
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
    });
    it('Should verify PLP item sale prices with PDP item sale price', () => {
      pdpSaleProductPrice = browser.waitUntil((): any => {
        return productDescriptionPage.getBothSaleProductPrices();
      }, 5000);
      logger.info('PDP product prices  : ' + pdpSaleProductPrice);
      logger.info('Sale PLP Price === Sale PDP Price Check ');
      logger.info(plpSaleProductPrice[0] + '===' + pdpSaleProductPrice[0]);
      logger.info(plpSaleProductPrice[1] + '===' + pdpSaleProductPrice[1]);
      expect(plpSaleProductPrice[0]).to.equal(pdpSaleProductPrice[0]);
      expect(plpSaleProductPrice[1]).to.equal(pdpSaleProductPrice[1]);
    });
    it(
      'Should navigate to wishlist page and verify PLP item sale' +
        ' prices with PDP item sale price',
      () => {
        navigationPage.clickOnWishlistLink();
        browser.waitUntil(() => {
          return wishlistPage.productNameOnWishlist.isDisplayed();
        }, 5000);
        const wishlistPrices = browser.waitUntil((): any => {
          return wishlistPage.getAllProductPrice();
        }, 5000);
        logger.info('Wishlist Sale Prices : ' + wishlistPrices);
        logger.info('Sale PLP Price === Sale Wishlist Price Check ');
        logger.info(plpSaleProductPrice[0] + '===' + wishlistPrices[0]);
        logger.info(plpSaleProductPrice[1] + '===' + wishlistPrices[1]);
        expect(plpSaleProductPrice[0]).to.equal(wishlistPrices[0]);
        expect(plpSaleProductPrice[1]).to.equal(wishlistPrices[1]);
      },
    );
    it('Should navigate to wishlist page and move the product to Shopping Bag', () => {
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
    it(
      'Should navigate to Shopping Bag verify PLP item sale prices with' +
        ' Shopping Bag item sale price',
      () => {
        browser.waitUntil((): any => {
          return shoppingBagPage.getShoppingBagHeading();
        }, 5000);
        const sbPrices = browser.waitUntil((): any => {
          return shoppingBagPage.getAllProductPrices();
        }, 5000);
        logger.info('Shopping Bag Prices : ' + sbPrices);
        logger.info('Sale PLP Price === Sale Shopping Bag Price Check ');
        logger.info(plpSaleProductPrice[0] + '===' + sbPrices[0]);
        logger.info(plpSaleProductPrice[1] + '===' + sbPrices[1]);
        expect(plpSaleProductPrice[0]).to.equal(sbPrices[0]);
        expect(plpSaleProductPrice[1]).to.equal(sbPrices[1]);
      },
    );
    // -------------------------------------
    // Non-Sale
    it('Should navigate to Non-sale plp and click on first product', () => {
      logger.info('----Non-Sale Product-----');
      browser.waitUntil((): any => {
        return browser.getTitle();
      }, 5000);
      productListingPage.goToPlp(
        productListingTestData.sale_gender_female,
        productListingTestData.go_to_plp,
      );
      browser.waitUntil((): any => {
        return productListingPage.getfirstProductPrice();
      }, 5000);
      plpNonSaleProductPrice = browser.waitUntil(() => {
        return productListingPage.getBothSaleProductPrices();
      }, 5000);
      plpNonSaleProductPrice = productListingPage.getNonSaleProducts();
      logger.info('PLP Non-Sale Product Price : ' + plpNonSaleProductPrice);
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
      pdpNonSaleProductPrice = browser.waitUntil((): any => {
        return productDescriptionPage.getBothSaleProductPrices();
      });
      logger.info('PDP product prices  : ' + pdpNonSaleProductPrice[0]);
      // Price Verify PLP with PDP
      logger.info('Non-Sale PLP Price === PDP Non-Sale Price Check ');
      logger.info(plpNonSaleProductPrice + '===' + pdpNonSaleProductPrice[0]);
      expect(plpNonSaleProductPrice).to.equal(pdpNonSaleProductPrice[0]);
    });
    it('Should navigate to wishlist page and move the product to Shopping Bag', () => {
      navigationPage.clickOnWishlistLink();
      browser.waitUntil(() => {
        return wishlistPage.productNameOnWishlist.isDisplayed();
      }, 5000);
      const wishlistPrice = browser.waitUntil((): any => {
        return wishlistPage.getAllProductPrice();
      }, 5000);
      logger.info('Wishlist Non-Sale : ' + wishlistPrice);
      // Price verify PLP with Wishlist
      logger.info('Non-Sale PLP Price === Non-Sale Wishlist Price Check ');
      logger.info(plpNonSaleProductPrice + '===' + wishlistPrice[0]);
      expect(plpNonSaleProductPrice).to.equal(wishlistPrice[0]);
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
      logger.info('Non-Sale PLP Price === Non-Sale Shopping Bag Price Check ');
      logger.info(
        plpNonSaleProductPrice + '===' + sbPrices[sbPrices.length - 1],
      );
      expect(plpNonSaleProductPrice).to.equal(sbPrices[sbPrices.length - 1]);
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
      checkoutPage.closeAllNotification();
    });
    it('Should verify plp prices with checkout prices ', () => {
      const checkoutPrices: any = browser.waitUntil((): any => {
        return checkoutPage.getProductPrices();
      }, 5000);
      logger.info('Sale PLP Price === Sale Checkout Price Check ');
      logger.info(plpSaleProductPrice[0] + '===' + checkoutPrices[0]);
      logger.info(plpSaleProductPrice[1] + '===' + checkoutPrices[1]);
      logger.info('Non-Sale PLP Price === Non-Sale Checkout Price Check ');
      logger.info(
        plpNonSaleProductPrice +
          '===' +
          checkoutPrices[checkoutPrices.length - 1],
      );
      expect(plpSaleProductPrice[0]).to.equal(checkoutPrices[0]);
      expect(plpSaleProductPrice[1]).to.equal(checkoutPrices[1]);
      expect(plpNonSaleProductPrice).to.equal(
        checkoutPrices[checkoutPrices.length - 1],
      );
    });
    it('should select payment method complete payment process using Credit card and return to SSense ', () => {
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
        15000,
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
      logger.info('Sale PLP Price === Sale Order Confirmation Price Check ');
      logger.info(plpSaleProductPrice[0] + '===' + orderConfPrices[0]);
      logger.info(plpSaleProductPrice[1] + '===' + orderConfPrices[1]);
      logger.info(
        'Non-Sale PLP Price === Non-Sale Order Confirmation Price Check ',
      );
      logger.info(plpNonSaleProductPrice + '===' + orderConfPrices[2]);
      expect(plpSaleProductPrice[0]).to.equal(orderConfPrices[0]);
      expect(plpSaleProductPrice[1]).to.equal(orderConfPrices[1]);
      expect(plpNonSaleProductPrice).to.equal(orderConfPrices[2]);
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
      logger.info('Sale PLP Price === Sale Order History Price Check ');
      logger.info(plpSaleProductPrice[0] + '===' + orderHistoryPrices[0]);
      logger.info(plpSaleProductPrice[1] + '===' + orderHistoryPrices[1]);
      logger.info('Non-Sale PLP Price === Non-Sale Order History Price Check ');
      logger.info(plpNonSaleProductPrice + '===' + orderHistoryPrices[2]);
      expect(plpSaleProductPrice[0]).to.equal(orderHistoryPrices[0]);
      expect(plpSaleProductPrice[1]).to.equal(orderHistoryPrices[1]);
      expect(plpNonSaleProductPrice).to.equal(orderHistoryPrices[2]);
    });
  },
);
