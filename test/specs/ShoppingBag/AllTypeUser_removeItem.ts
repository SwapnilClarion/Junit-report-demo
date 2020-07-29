import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import notification from '../../../methods/GetNotification';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import loginMethods from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import loginPage from '../../../pageObjects/LoginPage';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate user [Guest,LoggedOut,LoggedIn] is able to remove item from shopping bag', () => {
  let bagBeforeCount: any = '';
  let bagAfterCount: any = '';
  // ------------------------- Guest User ---------------------------------//
  it('Should navigate to PLP and select the first product', () => {
    logger.info('============= Guest User Scenario ================');
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });

  it('Should select size and add product to shopping bag and go to shopping bag page', () => {
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
  it('Should accept emailid and proceed to checkout page and redirect back to shoppingbag page', () => {
    shoppingBagPage.enterUserEmail(randomData.GUEST_EMAIL);
    shoppingBagPage.clickAcceptEmailCheckoutBtn();
    browser.waitUntil(() => {
      return checkoutPage.fnameInput.isExisting();
    }, 5000);
    browser.back();
  });
  it('Should verify the email-id field is populated', () => {
    browser.waitUntil(() => {
      return shoppingBagPage.userEmailInput.isExisting();
    }, 5000);
    const shoppingEmail: any = browser.waitUntil((): any => {
      return shoppingBagPage.userEmailInput.getAttribute('value');
    }, 5000);
    logger.info('Shopping Bag Email ==> ' + shoppingEmail);
    expect(shoppingEmail.length).to.be.gt(1);
  });
  it('Should get the initial bag count before removing item ', () => {
    bagBeforeCount = browser.waitUntil((): any => {
      return shoppingBagPage.getNumberOfShoppingBagProduct();
    }, 5000);
    logger.info('Initial Bag Count ====> ' + bagBeforeCount);
  });
  it('Should remove the items from bag and verify the page title ', () => {
    shoppingBagPage.clickRemoveItemBtn();
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Page Title ===> ' + browser.getTitle());
    expect(shoppingBagTestData.shoppingBagTitle).to.include(browser.getTitle());
  });
  it('Should get the bag count and verify the bags empty  ', () => {
    browser.waitUntil(() => {
      return shoppingBagPage.shopForMenBtn.isExisting();
    }, 5000);
    const emptyBagTxt = browser.waitUntil((): any => {
      return shoppingBagPage.getEmptyShoppingBagText();
    }, 5000);
    logger.info('Empty Bag Text === > ' + emptyBagTxt);
    expect(emptyBagTxt).to.include(
      shoppingBagTestData.ExpectedEmptyShoppingBagText,
    );
  });
  it('Should verify the  bag count is less than the previous bag count  ', () => {
    bagAfterCount = shoppingBagPage.getNumberOfShoppingBagProduct();
    logger.info('After Bag Count ====> ' + bagAfterCount);
    expect(bagAfterCount).to.be.lt(bagBeforeCount);
    browser.deleteAllCookies();
  });
  // --------------------- Logged-In User ----------------------------------//

  it('Should validate that login link is present', () => {
    logger.info('============= LoggedIn User Scenario ================');
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
      'login/Signup page page is not loaded yet',
    );
    const url = browser.getUrl();
    expect(url).to.include(loginSignUpTestData.LOGIN_URL);
  });
  it('Should perform signup process and land on account details page', () => {
    // This is to verify that the email-id field is empty.
    browser.execute(
      'document.querySelector("#register-form-email-address").value="";',
    );
    if (
      loginPage.viewNotificationMsg() !==
      'A member with same email already exists'
    ) {
      loginPage.enterSignUpEmailId('');
      loginMethods.signup(
        randomData.GUEST_GMAIL_Email,
        randomData.USER_PASSWORD,
        loginSignUpTestData.NO_THANKS_PROMO,
      );
    }
  });
  it('Should navigate to PLP and click on first product', () => {
    browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
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
    productDescriptionPage.clickCheckoutBtn();
  });
  it('Should get the bag count  ', () => {
    bagBeforeCount = browser.waitUntil((): any => {
      return shoppingBagPage.getNumberOfShoppingBagProduct();
    }, 5000);
    logger.info('Initial Bag Count ====> ' + bagBeforeCount);
  });
  it('Should remove the items from bag  ', () => {
    browser.waitUntil(() => {
      return shoppingBagPage.proceedToCheckoutOnShoppingBag.isDisplayed();
    }, 5000);
    shoppingBagPage.clickRemoveItemBtn();
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Page Title After remove ==> ' + browser.getTitle());
  });
  it('Should get the bag count and verify the bags empty  ', () => {
    browser.waitUntil(() => {
      return shoppingBagPage.shopForMenBtn.isExisting();
    }, 5000);
    const emptyBagTxt = browser.waitUntil((): any => {
      return shoppingBagPage.getEmptyShoppingBagText();
    }, 5000);
    logger.info('Empty Bag Text === > ' + emptyBagTxt);
    expect(emptyBagTxt).to.include(
      shoppingBagTestData.ExpectedEmptyShoppingBagText,
    );
  });
  it('Should verify the page title ', () => {
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Page Title ===> ' + browser.getTitle());
    expect(shoppingBagTestData.shoppingBagTitle).to.include(browser.getTitle());
  });
  it('Should verify the  bag count is less than the previous bag count  ', () => {
    bagAfterCount = shoppingBagPage.getNumberOfShoppingBagProduct();
    logger.info('After Bag Count ====> ' + bagAfterCount);
    expect(bagAfterCount).to.be.lt(bagBeforeCount);
    navigationPage.clickOnAccountLink();
    navigationPage.clickOnLogoutLink();
    checkoutPage.closeAllNotification();
  });
  // -----------------------------Logged-Out User ---------------------------------//
  it('Should take user to login/Signup page', () => {
    logger.info('============= LoggedOut User Scenario ================');
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    navigationPage.clickOnLoginLink();
    browser.waitUntil(
      () => {
        return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
      },
      5000,
      'login/Signup page page is not loaded yet',
    );
    const url = browser.getUrl();
    expect(url).to.include(loginSignUpTestData.LOGIN_URL);
  });
  it('Should verify the email input field for signup is empty', () => {
    browser.execute(
      'document.querySelector("#register-form-email-address").value="";',
    );
    let signupEmailInp = loginPage.registerEmailInput.getAttribute('value');
    logger.info('Email Input Contents ' + signupEmailInp);
    if (
      signupEmailInp === '' ||
      signupEmailInp === null ||
      signupEmailInp === undefined
    ) {
      signupEmailInp = null;
    }
    expect(signupEmailInp).to.equal(null);
  });
  it('Should navigate to PLP and click on first product', () => {
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
    productDescriptionPage.clickCheckoutBtn();
  });

  it('Should get the bag count  ', () => {
    browser.waitUntil(() => {
      return shoppingBagPage.userEmailInput.isExisting();
    }, 5000);
    bagBeforeCount = browser.waitUntil((): any => {
      return shoppingBagPage.getNumberOfShoppingBagProduct();
    }, 5000);
    logger.info('Initial Bag Count ====> ' + bagBeforeCount);
  });
  it('Should remove the items from bag and verify the page title ', () => {
    shoppingBagPage.clickRemoveItemBtn();
    browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Page Title ===> ' + browser.getTitle());
    expect(shoppingBagTestData.shoppingBagTitle).to.include(browser.getTitle());
  });
  it('Should get the bag count and verify the bags empty  ', () => {
    browser.waitUntil(() => {
      return shoppingBagPage.shopForMenBtn.isExisting();
    }, 5000);
    const emptyBagTxt = browser.waitUntil((): any => {
      return shoppingBagPage.getEmptyShoppingBagText();
    }, 5000);
    logger.info('Empty Bag Text === > ' + emptyBagTxt);
    expect(emptyBagTxt).to.include(
      shoppingBagTestData.ExpectedEmptyShoppingBagText,
    );
  });
  it('Should verify the  bag count is less than the previous bag count  ', () => {
    bagAfterCount = shoppingBagPage.getNumberOfShoppingBagProduct();
    logger.info('After Bag Count ====> ' + bagAfterCount);
    expect(bagAfterCount).to.be.lt(bagBeforeCount);
  });
});
