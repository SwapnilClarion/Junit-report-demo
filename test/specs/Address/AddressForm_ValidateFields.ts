import addressPage from '../../../pageObjects/AddressesPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import assert from 'assert';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { addressTestData } from '../../../resources/addressTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate user should land on Empty Address Page & validate content from new address form ', () => {
  it('Should validate that user is logged in', () => {
    navigationPage.clickOnLoginLink();
    browser.waitUntil(() => {
      return loginPage.getLoginHeading();
    }, 5000);
    const userEmail = randomData.GUEST_EMAIL;
    navigationPage.clickOnLoginLink();
    signupMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );

    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);
  });

  it('Should navigate to empty Address page and validate Add New address button', () => {
    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    const actualAddressHeading = browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);

    logger.info('Address Heading is: ' + actualAddressHeading);
    assert.equal(
      addressPage.isAddressContainerDisplayed(),
      false,
      addressTestData.EmptyAddressListError,
    );

    assert.equal(
      addressPage.isAddNewAddressDisplayed(),
      true,
      addressTestData.AddNewAddressDisplayError,
    );
  });

  it('Should land on new Address form and validate fields', () => {
    addressPage.clickAddNewAddress();
    browser.waitUntil((): any => {
      return addressPage.getAddressFormHeading();
    }, 5000);
    addressPage.validateAddressFormFields();
  });

  it('Should redirect on address list on clicking Cancel button on Address form', () => {
    addressPage.clickCancelButtonOnAddressForm();
    const addressHeading = browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    logger.info('Address list heading is ' + addressHeading);
    logger.info('User is redirected on Address list');
  });
});
