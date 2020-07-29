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
describe('Validate validation message for mandatory fields and non-latin characters ', () => {
  // Validate validation message for mandatory fields, non-latin characters and less than 7 characters for phone input
  let langArray: any = [];
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

  it('Should perform user registration', () => {
    const userEmail = randomData.GUEST_EMAIL;
    signupMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );

    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);

    langArray = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
  });

  it('Should access Address page and click on Add New Address', () => {
    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
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
    addressPage.clickAddNewAddress();
  });

  it('Should validate non-latin characters and mandatory fields validation messages', () => {
    // validate messages for mandatory fields & non-latin characters for selected languages
    for (let index = 0; index < langArray.length; index += 1) {
      if (index > 0) {
        navigationPage.selectLanguage(index);
      }
      addressPage.clickSaveAddressButton();
      const actualValidationMsg = addressPage.validateAddressFieldsValidationMsg();
      logger.info(
        'Validation message for mandatory fields is: ' + actualValidationMsg,
      );

      assert.equal(
        actualValidationMsg,
        addressTestData.AddressMandatoryFieldValidationMessage[index],
        addressTestData.addressValidationMsgError,
      );

      // Enter non latin characters for address input field and validate message displayed
      addressPage.enterNonLatinCharactersForAddressFields(
        addressTestData.NonLatinCharactersAddressFields[0],
        addressTestData.NonLatinCharactersAddressFields[1],
        addressTestData.NonLatinCharactersAddressFields[0],
        addressTestData.NonLatinCharactersAddressFields[1],
        2,
        2,
        addressTestData.NonLatinCharactersAddressFields[0],
        addressTestData.NonLatinCharactersAddressFields[1],
        addressTestData.NonLatinCharactersAddressFields[0],
      );
      const actualMsgForNonLatinCharacters = addressPage.validateAddressFieldsValidationMsg();
      logger.info(
        'Validation message for non-latin characters is: ' +
          actualMsgForNonLatinCharacters,
      );
      assert.equal(
        actualMsgForNonLatinCharacters,
        addressTestData.AddressNonLatinCharacterMessage[index],
        addressTestData.AddressNonLatinCharacterErr,
      );

      // Enter less than 7 characters for phone input field and validate message displayed
      browser.refresh();
      addressPage.enterInvalidPhoneNoInput(
        addressTestData.invalidAddressPhoneInput,
      );
      const actualInvalidPhoneMsg = addressPage.getInvalidPhoneMessage();
      logger.info(
        'The validation message for less than 7 characters for phone input box is: ' +
          actualInvalidPhoneMsg,
      );
      assert.equal(
        actualInvalidPhoneMsg,
        addressTestData.AddressPhoneValidationMessage[index],
        addressTestData.AddressNonLatinCharacterErr,
      );
      logger.info('==========================================================');
    }
  });
});
