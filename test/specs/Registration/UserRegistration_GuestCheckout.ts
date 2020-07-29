import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import orderConfirmationPage from '../../../pageObjects/OrderConfirmationPage';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { orderConfirmationTestData } from '../../../resources/orderConfirmationTestData';
import { loginSignUpTestData } from 'resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate User registration after performing Guest checkout', () => {
  let userEmail: any = '';

  it('should navigate to men section and click on first product ', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });

  it('should select size and add it to bag ', () => {
    productDescriptionPage.addToBag();
    checkoutPage.closeAllNotification();
    productDescriptionPage.clickCheckoutBtn();
  });
  it('should accept guest users emailid and proceed to checkout page', () => {
    userEmail = randomData.GUEST_EMAIL;
    shoppingBagPage.enterUserEmail(userEmail);
    shoppingBagPage.clickAcceptEmailCheckoutBtn();
  });
  it('should enter shipping address and select payment method', () => {
    checkoutPage.addNewShippingAddress(
      randomData.GUEST_FIRSTNAME,
      randomData.GUEST_LASTNAME,
      randomData.GUEST_STREETADDR,
      randomData.GUEST_CITY,
      randomData.GUEST_ZIPCODE,
      checkoutTestData.COUNTRY,
      checkoutTestData.STATE,
      randomData.GUEST_PHONENO,
    );
    checkoutPage.closeAllNotification();
    checkoutPage.selectPaymentMethod(checkoutTestData.CREDIT_CARD);
  });

  it('should complete payment process using Credit Card and return to SSense', () => {
    browser.switchToFrame(checkoutTestData.CreditCardFrame);
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
    // updated dynamic wait to 10000 as order confirmation takes time to load
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
  });

  it('should validate that the presence of password input field', () => {
    const passwordField = browser.waitUntil(() => {
      return orderConfirmationPage.checkPasswordField();
    }, 5000);
    logger.info('check password field- ' + passwordField);
    expect(passwordField).to.equal(true);
  });
  it('should create the account', () => {
    orderConfirmationPage.enterPasswordInput(randomData.USER_PASSWORD);
    orderConfirmationPage.clickNoThanksPromo();
    orderConfirmationPage.clickCreateAccountBtn();
  });
  it('should verify feedbackUI page', () => {
    const feedbackuiPage = browser.waitUntil((): any => {
      return navigationPage.getValueofAccountActivate();
    }, 15000);
    logger.info('check activate your account- ' + feedbackuiPage);
    expect(feedbackuiPage).to.equals(loginSignUpTestData.FeedBackUI_Msg);
  });
  it('should verify feedbackUI mailid with guest mailid', () => {
    const feedbackuiMail = browser.waitUntil((): any => {
      return navigationPage.getValueofFeedbackUIMail();
    }, 15000);
    logger.info('check feedbackUI mail - ' + feedbackuiMail);
    logger.info('check userEmail  - ' + userEmail);
    expect(feedbackuiMail).to.equals(userEmail);
  });
});
