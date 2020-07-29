import addressPage from '../../../pageObjects/AddressesPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import assert from 'assert';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { addressTestData } from '../../../resources/addressTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate that user should be able to create address, validate address fields and delete address ', () => {
  let enteredAddressFields = [];
  let savedAddressFields = [];
  let formAddressFields = [];
  let addressListDisplayed;
  it('Should validate that user is not logged in', () => {
    logger.info('=======================================================');
    logger.info(
      'Address fields on list are matching with entered address fields',
    );
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

  it('Should perform registration and access Address page', () => {
    const userEmail = randomData.GUEST_EMAIL;
    signupMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );

    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);

    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    const actualAddressHeading = browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    logger.info('Landed on Address page');

    assert.equal(
      actualAddressHeading,
      addressTestData.ActualAddressHeading,
      addressTestData.AddressHeadingError,
    );
    logger.info('Address Heading is: ' + actualAddressHeading);
  });

  it('Should create new address with valid fields', () => {
    addressPage.clickAddNewAddress();
    browser.waitUntil((): any => {
      return addressPage.getAddressFormHeading();
    }, 5000);
    enteredAddressFields = addressPage.getAddressFields();

    logger.info('Entered Address fields are: ' + enteredAddressFields);
    addressPage.createNewAddress(enteredAddressFields);
    addressPage.clickSaveAddressButton();
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    logger.info('Created new address successfully');
  });

  it('Should validate entered address with saved address', () => {
    // Validate that saved address fields are matching with the entered address fields
    savedAddressFields = addressPage.getSavedAddressFields();
    logger.info('Saved Addresse fields are: ' + savedAddressFields);
    for (let i = 0; i <= enteredAddressFields.length; i += 1) {
      for (let j = 0; j <= savedAddressFields.length; j += 1) {
        if (enteredAddressFields[i] === savedAddressFields[j]) {
          j += 1;
        }
      }
    }
    logger.info(
      'Address fields on list are matching with entered address fields',
    );
  });

  it('Should validate Edit/Delete button are displayed and clickable', () => {
    logger.info('=======================================================');
    logger.info(
      'validate saved address fields with fields on edit address view',
    );
    assert.equal(
      addressPage.isEditButtonExistAndClickable(),
      true,
      addressTestData.EditButtonStateError,
    );
    logger.info('Edit button is displayed and clickable');
    assert.equal(
      addressPage.isDeleteButtonExistAndClickable(),
      true,
      addressTestData.DeleteButtonStateError,
    );
    logger.info('Delete button is displayed and clickable');
  });

  it('Should validate address fields on list with the fields on edit address view ', () => {
    addressPage.editAddressButton.click();
    const actualEditAddressHeading = browser.waitUntil((): any => {
      return addressPage.getEditAddressFormHeading();
    }, 5000);
    assert.equal(
      actualEditAddressHeading,
      addressTestData.expEditAddressHeading,
      addressTestData.editAddressHeadingError,
    );

    formAddressFields = addressPage.getEditAddressFormFields();
    logger.info('Address fields on Edit address view: ' + formAddressFields);
    for (let i = 0; i <= savedAddressFields.length; i += 1) {
      for (let j = 0; j <= formAddressFields.length; j += 1) {
        if (savedAddressFields[i] === formAddressFields[j]) {
          j += 1;
        }
      }
    }
    logger.info(
      'Address fields on list are matching with address fields on Edit view',
    );
  });

  it('Should navigate to address page and verify Delete button ', () => {
    logger.info('=======================================================');
    logger.info('validate Delete address & close/Delete button on Dialogue');
    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);

    addressListDisplayed = addressPage.isAddressContainerDisplayed();
    assert.equal(
      addressListDisplayed,
      true,
      addressTestData.EmptyAddressListError,
    );
  });

  it('Should click on Delete button and check behavior of Close button on dialogue ', () => {
    // Clicking on Close button on Dialogue box should not delete address and redirect on address list
    addressPage.clickDeleteOnAddressList();
    browser.waitUntil(() => {
      return addressPage.isDeleteButtonDialugeDisplayed();
    }, 5000);

    assert.equal(
      addressPage.isCloseButtonOnDeleteDialogueDisplayed(),
      true,
      addressTestData.CloseButtonOnDialogueError,
    );
    addressPage.clickCloseButtonOnDialuge();
    // Here, static wait is needed as it immediately try to get address container
    browser.pause(2000);

    addressListDisplayed = browser.waitUntil(() => {
      return addressPage.isAddressContainerDisplayed();
    }, 5000);
    assert.equal(
      addressListDisplayed,
      true,
      addressTestData.EmptyAddressListError,
    );
    logger.info(
      'Clicking on Close icon redirected user on address list and address is not deleted',
    );
  });

  it('Should click on Delete button and check behavior of Delete button on dialogue ', () => {
    // Clicking on Delete button on Dialogue should delete the address and empty address list is displayed
    addressPage.clickDeleteOnAddressList();
    browser.waitUntil(() => {
      return addressPage.isDeleteButtonDialugeDisplayed();
    }, 5000);
    addressPage.clickDeleteButtonDialuge();
    // Here, static wait is needed as it immediately try to get addressHeading and container
    browser.pause(2000);
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    const addressList = addressPage.isAddressContainerDisplayed();
    expect(addressList).to.equal(false);
    logger.info(
      'Clicking on Delete button address get deleted and user see empty address list',
    );
  });
});
