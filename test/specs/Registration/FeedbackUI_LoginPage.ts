import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import loginPage from '../../../pageObjects/LoginPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate as a guests user able to see the feedback UI - Login Page', () => {
  let userEmail: any = '';
  it('should navigate to men section and click on first product ', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });

  it('should select size and add it to bag ', () => {
    const sizeCheck: any = browser.waitUntil(() => {
      return productDescriptionPage.selectSize();
    }, 5000);
    productDescriptionPage.addSize(sizeCheck);
    productDescriptionPage.clickAddToBag();
    productDescriptionPage.clickCheckoutBtn();
  });
  it('should accept guest users emailid and proceed to checkout page', () => {
    userEmail = randomData.GUEST_EMAIL;
    shoppingBagPage.enterUserEmail(userEmail);
    shoppingBagPage.clickAcceptEmailCheckoutBtn();
  });
  it('should user navigates to login page and enter details', () => {
    browser.back();
    navigationPage.clickOnLoginLink();
    loginPage.enterSignUpPassword(randomData.USER_PASSWORD);
    loginPage.clickNoThanksPromo();
  });
  it('should land on login page and verify prepopulated email id and click on create button', () => {
    let populatedEmail: any = '';
    populatedEmail = browser.waitUntil((): any => {
      return loginPage.checkPopulatedEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(populatedEmail);
    logger.info('check prepopulated email - ' + populatedEmail);
    loginPage.clickCreateAccBtn();
  });
  it('should validate the Feedback UI page', () => {
    const feedbackuiPage = browser.waitUntil((): any => {
      return navigationPage.getValueofAccountActivate();
    }, 5000);
    logger.info('check activate your account - ' + feedbackuiPage);
    expect(feedbackuiPage).to.equals(loginSignUpTestData.FeedBackUI_Msg);
  });
  it('should validate feedbackUI mailid with guest mailid', () => {
    const feedbackuiMail = browser.waitUntil((): any => {
      return navigationPage.getValueofFeedbackUIMail();
    }, 5000);
    logger.info('check feedback ui mail - ' + feedbackuiMail);
    expect(feedbackuiMail).to.equals(userEmail);
  });
});
