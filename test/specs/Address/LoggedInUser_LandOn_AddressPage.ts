import addressPage from '../../../pageObjects/AddressesPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { addressTestData } from '../../../resources/addressTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate As a redirected user, when perform registration should land on Address Page ', () => {
  it('Should validate that user is not logged in', () => {
    navigationPage.clickOnLoginLink();
    const actualLoginHeading = browser.waitUntil(() => {
      return loginPage.getLoginHeading();
    }, 5000);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });

  it('Should redirect on Login/Sign up page when access address page', () => {
    browser.navigateTo(addressTestData.AddressURL);
    logger.info('Accessed Address page ');
    const actualSignupHeading = browser.waitUntil((): any => {
      return loginPage.getSignUpHeading();
    }, 5000);
    assert.equal(
      actualSignupHeading,
      loginSignUpTestData.ExpectedSignUpHeading,
      loginSignUpTestData.SignUpHeadingError,
    );
    logger.info('Redirected on login/signup page');
  });

  it('Should perform registration and land on Address page', () => {
    const userEmail = randomData.GUEST_EMAIL;
    signupMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );
    logger.info('Performed registration successfully');
    const actualAddressHeading = browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);

    logger.info('Address Heading is: ' + actualAddressHeading);
    assert.equal(
      actualAddressHeading,
      addressTestData.ActualAddressHeading,
      addressTestData.AddressHeadingError,
    );
    logger.info('Landed on Address page');
  });
});
