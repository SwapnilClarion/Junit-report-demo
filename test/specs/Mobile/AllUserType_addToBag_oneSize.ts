import mobileNavigationPage from '../../../pageObjects/mobile/NavigationPage';
import mobileProductDescriptionPage from '../../../pageObjects/mobile/ProductDescriptionPage';
import mobileProductListingPage from '../../../pageObjects/mobile/ProductListingPage';
import loginPage from '../../../pageObjects/LoginPage';
import { expect } from 'chai';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { shoppingBagTestData } from '../../../resources/shoppingBagTestData';
import notification from '../../../methods/GetNotification';
import { productDescriptionTestData } from '../../../resources/mobile/productDescriptionTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate Add to bag feature for One-size product and validate shopping bag count ', () => {
  let userEmail: any = '';
  let shoppingBagCountBeforeAddtoCart: any;
  let shoppingBagCountAfterAddtoCart: any;
  let pdpMobileCookieName: any = '';
  let pdpMobileCookieValue: any = '';
  let email: any = '';
  let actualAddToBagNotification: any;
  let expectedAddToBagNotification: any;
  let sizeDropdownStatus: any;
  let productInfoStatus: any;
  let successBannerStatus: any;
  it('Should validate that user is not logged in', () => {
    logger.info('============= Guest/Logged Out User ================');
    mobileNavigationPage.clickMobileAccountLink();
    const actualLoginHeading: any = browser.waitUntil((): any => {
      return loginPage.getLoginHeading();
    }, 5000);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
    logger.info('User is logged out!!');
  });
  it('Should navigate to PLP and select One-size product', () => {
    mobileNavigationPage.clickMobileMainMenu();
    // static wait added as it takes time to load navigation menu and gives stale element error
    browser.pause(1000);
    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileMenLink.isDisplayed();
    }, 5000);
    browser.setCookies({ name: 'is_new_pdp_mobile', value: 'new' });
    mobileNavigationPage.clickMobileMenLink();
    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileTrending.isDisplayed();
    }, 5000);
    mobileNavigationPage.clickMobileTrending();
    logger.info('Redirected to PLP');

    // Shopping bag product count before clicking Add to Bag
    shoppingBagCountBeforeAddtoCart = mobileProductDescriptionPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of Shopping bag count before clicking Add to Bag: ' +
        shoppingBagCountBeforeAddtoCart,
    );
    mobileProductListingPage.clickOneSizeProductMobileView();
    logger.info('Selected One-size product');
  });
  it('Should validate Add To Bag button and Add to Wishlist button', () => {
    // Validate add to Bag button
    const addToBagButtonStatus: boolean = browser.waitUntil((): any => {
      return mobileProductDescriptionPage.isAddToBagButtonDisplayed();
    }, 5000);
    logger.info('Add to Bag button displayed status: ' + addToBagButtonStatus);
    assert.equal(
      addToBagButtonStatus,
      true,
      productDescriptionTestData.AddtoBagButtonDisplayError,
    );

    // validate add to Wishlist button
    const addToWishlistButtonStatus: boolean = browser.waitUntil((): any => {
      return mobileProductDescriptionPage.isAddToWishlistButtonDisplayed();
    }, 5000);
    logger.info(
      'Add to Wishlist button displayed status: ' + addToWishlistButtonStatus,
    );
    assert.equal(
      addToWishlistButtonStatus,
      true,
      productDescriptionTestData.AddtoBagButtonDisplayError,
    );
  });
  it('Should validate size dropdown is not displayed', () => {
    sizeDropdownStatus = mobileProductDescriptionPage.productSize.isDisplayed();
    logger.info('Select Size dropdown displayed: ' + sizeDropdownStatus);
    expect(sizeDropdownStatus).to.equal(false);
  });
  it('Should validate is_new_pdp_mobile cookie value', () => {
    // Get is_new_pdp_mobile cookie value
    const pdpMobile = browser.getCookies(['is_new_pdp_mobile']);
    pdpMobileCookieName = pdpMobile[0].name;
    pdpMobileCookieValue = pdpMobile[0].value;
    logger.info('is_new_pdp_mobile cookie Name is : ' + pdpMobileCookieName);
    logger.info('is_new_pdp_mobile cookie Value is : ' + pdpMobileCookieValue);
  });

  it('Should validate Add to Bag button text changes to Produceed to Checkout ', () => {
    // validate Add to bag button text changed to proceed to checkout
    logger.info('Clicking on Add To Bag button');
    mobileProductDescriptionPage.addToBag();
    const actualCheckoutButtonText: any = mobileProductDescriptionPage.getProceedToCheckoutButtonText();
    logger.info(
      'Add to Bag button text is changed to : ' + actualCheckoutButtonText,
    );
    assert.equal(
      actualCheckoutButtonText,
      productDescriptionTestData.proceedToCheckoutButtonText,
      productDescriptionTestData.proceedToCheckoutButtonTextError,
    );
    productInfoStatus = browser.waitUntil((): any => {
      return mobileProductDescriptionPage.productInfo.isDisplayed();
    }, 5000);
    logger.info('Product info on pdp displayed : ' + productInfoStatus);
  });
  it('Should validate success banner is not displayed', () => {
    // validate success banner is not displayed for add to bag
    successBannerStatus = notification.notification.isDisplayed();
    logger.info('Success banner for Add to bag : ' + successBannerStatus);
    expect(successBannerStatus).to.equal(false);
  });
  it('Should validate Add to Bag messgae for one size product', () => {
    // validate Add to bag message
    actualAddToBagNotification = mobileProductDescriptionPage.getAddToBagNotificationForOneSizeProduct();
    logger.info(
      'Add to Bag message displayed is : ' + actualAddToBagNotification,
    );
    expectedAddToBagNotification =
      productDescriptionTestData.AddToBagMessageforOneSizeProduct;
    logger.info(
      'Expected Add to bag notification is: ' + expectedAddToBagNotification,
    );
    assert.equal(
      actualAddToBagNotification,
      expectedAddToBagNotification,
      productDescriptionTestData.AddToBagMessageError,
    );
  });
  it('Should validate Add to Wishlist button is not displayed ', () => {
    // validate add to Wishlist button is not displayed
    const addToWishlistButtonStatus: boolean = mobileProductDescriptionPage.isAddToWishlistButtonDisplayed();
    logger.info(
      'Add to Wishlist button displayed status: ' + addToWishlistButtonStatus,
    );
    assert.equal(
      addToWishlistButtonStatus,
      false,
      productDescriptionTestData.AddtoBagButtonDisplayError,
    );
  });
  it('Should validate shopping bag product count is increased ', () => {
    // Validate shopping bag product count is increased
    shoppingBagCountAfterAddtoCart = mobileProductDescriptionPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of Shopping bag count after clicking Add to Bag: ' +
        shoppingBagCountAfterAddtoCart,
    );
    assert.equal(
      shoppingBagCountAfterAddtoCart,
      shoppingBagCountBeforeAddtoCart + 1,
      shoppingBagTestData.shoppingBagProductCountError,
    );
    logger.info('=========================================================');
  });
  //  ====================================Logged-In User ==============================================
  it('Should perform new user registration ', () => {
    logger.info('=================Logged In User========================');
    mobileNavigationPage.clickMobileAccountLink();
    browser.waitUntil((): any => {
      return loginPage.getLoginHeading();
    }, 5000);

    userEmail = randomData.GUEST_EMAIL;
    if (
      loginPage.viewNotificationMsg() !==
      loginSignUpTestData.Login_SameEmail_Error
    ) {
      signupMethod.signup(
        userEmail,
        randomData.USER_PASSWORD,
        loginSignUpTestData.NO_THANKS_PROMO,
      );
    }
    logger.info('User registration successful');
  });
  it('should land on account details page and verify email id', () => {
    email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });
  it('Should navigate to PLP and select One-size product', () => {
    mobileNavigationPage.clickMobileMainMenu();
    // static wait added as it takes time to load navigation menu and gives stale element error
    browser.pause(1000);
    browser.waitUntil((): any => {
      return mobileNavigationPage.mobileTrending.isDisplayed();
    }, 5000);
    mobileNavigationPage.clickMobileTrending();
    logger.info('Redirected to PLP');

    // Shopping bag product count before clicking Add to Bag
    shoppingBagCountBeforeAddtoCart = mobileProductDescriptionPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of Shopping bag count before clicking Add to Bag: ' +
        shoppingBagCountBeforeAddtoCart,
    );
    mobileProductListingPage.clickOneSizeProductMobileView();
    logger.info('Selected One-size product');
  });
  it('Should validate Add To Bag button and Add to Wishlist button', () => {
    // Validate add to Bag button
    const addToBagButtonStatus: boolean = browser.waitUntil((): any => {
      return mobileProductDescriptionPage.isAddToBagButtonDisplayed();
    }, 5000);
    logger.info('Add to Bag button displayed status: ' + addToBagButtonStatus);
    assert.equal(
      addToBagButtonStatus,
      true,
      productDescriptionTestData.AddtoBagButtonDisplayError,
    );

    // validate add to Wishlist button
    const addToWishlistButtonStatus: boolean = browser.waitUntil((): any => {
      return mobileProductDescriptionPage.isAddToWishlistButtonDisplayed();
    }, 5000);
    logger.info(
      'Add to Wishlist button displayed status: ' + addToWishlistButtonStatus,
    );
    assert.equal(
      addToWishlistButtonStatus,
      true,
      productDescriptionTestData.AddtoBagButtonDisplayError,
    );
  });
  it('Should validate size dropdown is not displayed', () => {
    sizeDropdownStatus = mobileProductDescriptionPage.productSize.isDisplayed();
    expect(sizeDropdownStatus).to.equal(false);
  });
  it('Should validate is_new_pdp_mobile cookie value', () => {
    // Get is_new_pdp_mobile cookie value
    const pdpMobile = browser.getCookies(['is_new_pdp_mobile']);
    pdpMobileCookieName = pdpMobile[0].name;
    pdpMobileCookieValue = pdpMobile[0].value;
    logger.info('is_new_pdp_mobile cookie Name is : ' + pdpMobileCookieName);
    logger.info('is_new_pdp_mobile cookie Value is : ' + pdpMobileCookieValue);
  });

  it('Should validate Add to Bag button text changes to Produceed to Checkout ', () => {
    // validate Add to bag button text changed to proceed to checkout
    mobileProductDescriptionPage.addToBag();
    const actualCheckoutButtonText: any = mobileProductDescriptionPage.getProceedToCheckoutButtonText();
    logger.info(
      'Add to Bag button text is changed to : ' + actualCheckoutButtonText,
    );
    assert.equal(
      actualCheckoutButtonText,
      productDescriptionTestData.proceedToCheckoutButtonText,
      productDescriptionTestData.proceedToCheckoutButtonTextError,
    );
    productInfoStatus = browser.waitUntil((): any => {
      return mobileProductDescriptionPage.productInfo.isDisplayed();
    }, 5000);
    logger.info('Product info on pdp displayed : ' + productInfoStatus);
  });
  it('Should validate success banner is not displayed', () => {
    // validate success banner is not displayed for add to bag
    successBannerStatus = notification.notification.isDisplayed();
    logger.info('Success banner for Add to bag : ' + successBannerStatus);
    expect(successBannerStatus).to.equal(false);
  });
  it('Should validate Add to Bag message for one size product', () => {
    // validate Add to bag message
    actualAddToBagNotification = mobileProductDescriptionPage.getAddToBagNotificationForOneSizeProduct();
    logger.info(
      'Add to Bag message displayed is : ' + actualAddToBagNotification,
    );
    expectedAddToBagNotification =
      productDescriptionTestData.AddToBagMessageforOneSizeProduct;
    logger.info(
      'Expected Add to bag message is: ' + expectedAddToBagNotification,
    );
    assert.equal(
      actualAddToBagNotification,
      expectedAddToBagNotification,
      productDescriptionTestData.AddToBagMessageError,
    );
  });
  it('Should validate Add to Wishlist button is not displayed ', () => {
    // validate add to Wishlist button is not displayed
    const addToWishlistButtonStatus: boolean = mobileProductDescriptionPage.isAddToWishlistButtonDisplayed();
    logger.info(
      'Add to Wishlist button displayed status: ' + addToWishlistButtonStatus,
    );
    assert.equal(
      addToWishlistButtonStatus,
      false,
      productDescriptionTestData.AddtoBagButtonDisplayError,
    );
  });
  it('Should validate shopping bag product count is increased ', () => {
    // Validate shopping bag product count is increased
    shoppingBagCountAfterAddtoCart = mobileProductDescriptionPage.getNumberOfShoppingBagProduct();
    logger.info(
      'Number of Shopping bag count after clicking Add to Bag: ' +
        shoppingBagCountAfterAddtoCart,
    );
    assert.equal(
      shoppingBagCountAfterAddtoCart,
      shoppingBagCountBeforeAddtoCart + 1,
      shoppingBagTestData.shoppingBagProductCountError,
    );
    logger.info('=========================================================');
  });
});
