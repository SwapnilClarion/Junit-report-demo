import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { productDescriptionTestData } from '../../../resources/productDescriptionTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate if logged out user add product to wishlist is getting redirected to login page', () => {
  it('Should validate that user is not logged in', () => {
    assert.equal(
      loginPage.isLoginLinkExist(),
      true,
      loginSignUpTestData.Login_Link_Display_Error,
    );
  });

  it('Should navigate to product listing page click on first product', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
  });
  it('Should select size if product has more than one size and click Add to Wishlist', () => {
    // IF product is displayed with One size it will directly click on Add Wishlist button
    browser.waitUntil(() => {
      return productDescriptionPage.wishlistBtn.isEnabled();
    }, 10000);

    const OneSizeButtonValue = productDescriptionPage.isOneSizeButtonExist();
    logger.info('ONE SIZE button displayed: ', OneSizeButtonValue);

    if (OneSizeButtonValue === false) {
      const sizeCheck: any = browser.waitUntil(() => {
        return productDescriptionPage.selectSize();
      }, 5000);
      productDescriptionPage.addSize(sizeCheck);
      productDescriptionPage.clickWishlistBtn();
    } else {
      productDescriptionPage.clickWishlistBtn();
    }
  });

  it('Should redirect user on login page ', () => {
    browser.waitUntil(() => {
      return loginPage.getLoginHeading();
    }, 5000);

    assert.equal(
      loginPage.getLoginHeading(),
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });

  it('Should display banner message ', () => {
    assert.equal(
      loginPage.isBannerForWishListDisplayed(),
      true,
      loginSignUpTestData.Banner_Display_Error,
    );
  });

  it('Should validate banner message ', () => {
    const actualBannerText = loginPage.getNotificationForWishList();
    logger.info(
      'Actual Banner text displayed on login page is :',
      actualBannerText,
    );
    assert.equal(
      actualBannerText,
      loginSignUpTestData.Exp_Banner_Text_WishList,
      productDescriptionTestData.Banner_Text_Error,
    );
  });
});
