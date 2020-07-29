import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import loginPage from '../../../pageObjects/LoginPage';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import wishListPage from '../../../pageObjects/WishListPage';
import { logger } from '../../../config/winstonLogger';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate that newly registered user, when access Wishlist page, he should see empty Wishlist Page', () => {
  let userEmail: any = '';
  it('should take user to login/Signup page', () => {
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
  it('should perform signup process and land on account details page', () => {
    userEmail = randomData.GUEST_EMAIL;
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
    let email: any = '';

    email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });

  it('Should verify for Empty Wishlist', () => {
    navigationPage.clickOnWishlistLink();
    const containerSize = wishListPage.getContainerSize();
    logger.info('Container Size====' + containerSize);
    expect(containerSize).to.be.equal(0);
  });
});
