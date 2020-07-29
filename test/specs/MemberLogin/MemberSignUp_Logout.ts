import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import loginPage from '../../../pageObjects/LoginPage';
import { randomData } from '../../../utils/random_data';
import { expect } from 'chai';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate user should be able to perform successful registration and logout', () => {
  let userEmail = '';
  it('should take user to login/Signup page', () => {
    navigationPage.clickOnLoginLink();
    browser.waitUntil(
      () => {
        return browser.getTitle() === loginSignUpTestData.LOGIN_TITLE;
      },
      5000,
      loginSignUpTestData.LOGIN_PAGE_LOADING_ERROR,
    );
    const url = browser.getUrl();
    expect(url).to.include(loginSignUpTestData.LOGIN_URL);
  });
  it('should perform signup process and land on account details page', () => {
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
  });
  it('should land on account details page and verify email id', () => {
    let email: any = '';

    email = browser.waitUntil((): any => {
      return accountDetailsPage.checkEmailId('value');
    }, 5000);
    expect(userEmail).to.equal(email);
  });

  it('should click on logout button', () => {
    navigationPage.clickOnAccountLink();
    navigationPage.clickOnLogoutLink();
  });
  it('verify successfully logout banner and Login button ', () => {
    const successLogout = navigationPage.getValueOfSuccessMsg();
    expect(successLogout).to.equals(
      loginSignUpTestData.LOGOUT_SUCCESSFULLY_MSG,
    );
    const loginText = navigationPage.getValueofLoginLink();
    expect(loginText).to.equals(loginSignUpTestData.LOGIN_TEXT);
  });
});
