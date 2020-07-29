import { addressesPageLocators } from './pageLocators/AddressesPage_Locators';
import helpers from '../utils/helpers';
import { logger } from '../config/winstonLogger';
import { checkoutTestData } from '../resources/checkoutTestData';
import { randomData } from '../utils/random_data';
export class AddressesPage extends addressesPageLocators {
  getAddressHeading(): string {
    return helpers.getText(this.addressHeading);
  }

  clickAddNewAddress(): void {
    helpers.click(this.addNewAddress);
  }

  getAddressFormHeading(): string {
    return helpers.getText(this.addAddressFormHeading);
  }

  enterFnameInput(fname: string): void {
    helpers.setValue(this.fnameInput, fname);
  }

  enterLnameInput(lname: string): void {
    helpers.setValue(this.lnameInput, lname);
  }

  enterAddressInput(address: string): void {
    helpers.setValue(this.addressInput, address);
  }

  enterCompanyInput(company: string): void {
    helpers.setValue(this.companyInput, company);
  }

  enterCityInput(city: string): void {
    helpers.setValue(this.cityInput, city);
  }

  enterPostalCodeInput(postalNo: string): void {
    helpers.setValue(this.postCodeInput, postalNo);
  }

  enterCountryInput(country: string): void {
    helpers.select(this.countryInput, country, 'byVisibleText');
  }

  enterStateInput(state: string): void {
    helpers.select(this.stateInput, state, 'byVisibleText');
  }

  enterPhoneNoInput(phoneNo: string): void {
    helpers.setValue(this.phoneInput, phoneNo);
  }

  // Function to create array of address fields, same will be used while createing new address
  getAddressFields(): any {
    const createAddressFields: any = [];
    createAddressFields.push(
      randomData.GUEST_FIRSTNAME,
      randomData.GUEST_LASTNAME,
      randomData.GUEST_COMPANY_NAME,
      randomData.GUEST_STREETADDR,
      randomData.ADDRESS_COUNTRY,
      randomData.ADDRESS_STATE,
      checkoutTestData.CITY_NAME,
      checkoutTestData.ZIP_CODE,
      checkoutTestData.PHONE_NUMBER,
    );
    return createAddressFields;
  }

  /** * Function to Create new address with valid fields
   * @param {String} fname
   * @param {String} lname
   * @param {String} address
   * @param {String} city
   * @param {String} postalCode
   * @param {String} country
   * @param {String} state
   * @param {String} phoneno
   *
   */
  createNewAddress(addressFields: any[]): void {
    this.enterFnameInput(addressFields[0]);
    this.enterLnameInput(addressFields[1]);
    this.enterAddressInput(addressFields[2]);
    this.enterCompanyInput(addressFields[3]);
    this.enterCountryInput(addressFields[4]);
    this.enterStateInput(addressFields[5]);
    this.enterCityInput(addressFields[6]);
    this.enterPostalCodeInput(addressFields[7]);
    this.enterPhoneNoInput(addressFields[8]);
  }

  clickSaveAddressButton(): void {
    helpers.click(this.saveAddressButton);
  }

  isEditButtonExistAndClickable(): boolean {
    if (
      this.editAddressButton.isDisplayed() &&
      this.editAddressButton.isClickable()
    ) {
      return true;
    }
    return false;
  }

  isDeleteButtonExistAndClickable(): boolean {
    if (
      this.deleteButtonOnAddressList.isDisplayed() &&
      this.deleteButtonOnAddressList.isClickable()
    ) {
      return true;
    }
    return false;
  }

  // Function to get fields of saved address that can be compared with entered address fields
  getSavedAddressFields(): any {
    const addressFields: any = [];
    let fieldValue: any;
    let xpath: any;
    const names: any = helpers.getText(this.addressNameFields);
    const nameResults: any = names.split(' ');
    addressFields.push(nameResults[0], nameResults[1]);
    for (let i = 2; i <= this.savedAddressFields.length; i += 1) {
      if (i === 4) {
        i += 1;
      }
      // Here i is used to generate xpath for perticular div that has group of fields on address list page
      // On 5th and 6th two fields are displayed, we need to grab these fields and push into an array that can
      // be used to compare each field with entered address fields.
      if (i === 5 || i === 6) {
        xpath = 'div > div.address-data>div:nth-child(' + [i] + ')';
        const temp: any = $(xpath).getText();
        fieldValue = temp.split(' ');
        addressFields.push(
          fieldValue[0].replace(/,\s*$/, ''),
          fieldValue[1].trim(),
        );
      }
      // Here also i used to generated xpath for perticular div that has single field value
      if (i === 2 || i === 3 || i === 7) {
        xpath = 'div > div.address-data>div:nth-child(' + [i] + ')';
        fieldValue = $(xpath).getText().trim();
        addressFields.push(fieldValue);
      }
    }
    return addressFields;
  }

  // Function to get address fields of edit address view
  getEditAddressFormFields(): any {
    const addressFormFields: any = [];
    let xpath: any;
    let fieldValue: any;
    for (let i = 1; i <= this.addressFormFields.length - 2; i += 1) {
      if (i === 5 || i === 6 || i === 10) {
        i += 2;
      }
      if (i === 8) {
        fieldValue = this.addFormZip.getValue();
        addressFormFields.push(fieldValue);
        fieldValue = this.addFormPhone.getValue();
        addressFormFields.push(fieldValue);
        break;
      }
      xpath = '#formAddress > div.row-fluid > div:nth-child(' + [i] + ')>input';
      fieldValue = $(xpath).getValue();
      addressFormFields.push(fieldValue);
    }
    const selectedCountry = this.selectedCountry.getText().trim();
    addressFormFields.push(selectedCountry);
    const selectedState = this.selectedState.getText().trim();
    addressFormFields.push(selectedState);
    return addressFormFields;
  }

  getEditAddressFormHeading(): string {
    return helpers.getText(this.editAddressFormHeading);
  }

  isAddressContainerDisplayed(): boolean {
    if (this.addressContainer.isDisplayed()) {
      return true;
    }
    return false;
  }

  isAddNewAddressDisplayed(): boolean {
    if (this.addNewAddress.isDisplayed()) {
      return true;
    }
    return false;
  }

  clickDeleteOnAddressList(): void {
    helpers.click(this.deleteButtonOnAddressList);
  }

  clickCloseButtonOnDialuge(): void {
    helpers.click(this.closeButtonOnDeleteAddDialogue);
  }

  clickDeleteButtonDialuge(): void {
    helpers.click(this.DeleteButtonOnDeleteDialogue);
  }

  isDeleteButtonDialugeDisplayed(): boolean {
    if (this.DeleteDialogueBox.isDisplayed()) {
      return true;
    }
    return false;
  }

  isCloseButtonOnDeleteDialogueDisplayed(): boolean {
    if (
      this.closeButtonOnDeleteAddDialogue.isDisplayed() &&
      this.closeButtonOnDeleteAddDialogue.isClickable()
    ) {
      return true;
    }
    return false;
  }

  isDeleteButtonOnDeleteDialogueDisplayed(): any {
    if (
      this.DeleteButtonOnDeleteDialogue.isDisplayed() &&
      this.DeleteButtonOnDeleteDialogue.isClickable()
    ) {
      return true;
    }
    return false;
  }

  // Function to check that address form fields are inputbox/Checkbox/Dropdown/Buttons are clickable/editable
  validateAddressFormFields(): void {
    let xpath: any;
    let fieldName: any;
    for (let i = 1; i <= this.addressFormFields.length; i += 1) {
      // For loop iterates through the list of fields on address form, here i referes to the field order on form
      if (i <= 4 || i === 7) {
        xpath =
          '#formAddress > div.row-fluid > div:nth-child(' + [i] + ')>input';
        if ($(xpath).getAttribute('type') === 'text' && $(xpath).isEnabled()) {
          logger.info(
            $(xpath).getAttribute('name') +
              ' is input text field and it is editable',
          );
        }
      }
      if (i === 5 || i === 6) {
        fieldName =
          '#formAddress > div.row-fluid > div:nth-child(' + [i] + ') > label';
        xpath =
          '#formAddress > div.row-fluid > div:nth-child(' +
          [i] +
          ') > div > select';
        if (
          $(xpath).isClickable() &&
          $(xpath + '>option').getText() === 'Select'
        ) {
          logger.info($(fieldName).getText() + ' is dropdown and is clickable');
        }
      }

      if (i === 8) {
        for (let j = 1; j <= 2; j += 1) {
          xpath =
            '#formAddress > div > div:nth-child(' +
            [i] +
            ') > div > div:nth-child(' +
            [j] +
            ') > input';
          if (
            $(xpath).getAttribute('type') === 'text' &&
            $(xpath).isEnabled()
          ) {
            logger.info(
              $(xpath).getAttribute('name') +
                ' is input text field and it is editable',
            );
          }
        }
      }
      if (i === 9) {
        for (let k = 1; k <= 2; k += 1) {
          fieldName =
            '#formAddress > div > div:nth-child(' +
            [i] +
            ') > span:nth-child(' +
            [k] +
            ') > label';
          xpath =
            '#formAddress > div > div:nth-child(' +
            [i] +
            ') > span:nth-child(' +
            [k] +
            ') > input';
          if (
            $(xpath).getAttribute('type') === 'checkbox' &&
            $(xpath).isClickable()
          ) {
            logger.info($(xpath).getText() + ' is checkbox and it is editable');
          }
        }
      }
      if (i === 10) {
        if (
          this.cancelButtonOnAddressForm.isClickable() &&
          this.saveButtonOnAddressForm.isClickable()
        ) {
          logger.info(
            this.cancelButtonOnAddressForm.getText() + ' buttons is clickable',
          );
          logger.info(
            this.saveButtonOnAddressForm.getText() + ' buttons is clickable',
          );
        }
      }
    }
  }

  clickCancelButtonOnAddressForm(): void {
    helpers.click(this.cancelButtonOnAddressForm);
  }

  // Method to validate validation message for mandatory fields, non latin characters for input fields
  validateAddressFieldsValidationMsg(): any {
    let xpath: any;
    let msgXpath: any;
    for (let i = 1; i <= 8; i += 1) {
      if (i === 3) {
        i += 1;
      }
      if (i <= 4 || i === 7) {
        xpath =
          '#formAddress > div.row-fluid > div:nth-child(' + [i] + ')>input';
        msgXpath =
          '#formAddress > div.row-fluid > div:nth-child(' + [i] + ')>span';
        $(xpath).isDisplayed();
        $(msgXpath).isDisplayed();
      }
      if (i === 5 || i === 6) {
        xpath =
          '#formAddress > div.row-fluid > div:nth-child(' +
          [i] +
          ') > div > select';
        msgXpath = '#formAddress > div > div:nth-child(' + [i] + ') > span';
        $(xpath).isDisplayed();
        $(msgXpath).isDisplayed();
      }

      if (i === 8) {
        for (let j = 1; j <= 2; j += 1) {
          msgXpath =
            '#formAddress > div > div:nth-child(' +
            [i] +
            ') > div > div:nth-child(' +
            [j] +
            ') >span';
          xpath =
            '#formAddress > div > div:nth-child(' +
            [i] +
            ') > div > div:nth-child(' +
            [j] +
            ') > input';
          $(xpath).isDisplayed();
          $(msgXpath).isDisplayed();
        }
      }
    }
    return helpers.getText(this.validationMessage);
  }

  getInvalidPhoneMessage(): string {
    return helpers.getText(this.invalidPhoneMsg);
  }

  // Below method is require to check non-latin characters as existing method with byVisibleText will not be useful
  enterCountryInputByIndex(index: number): void {
    helpers.select(this.countryInput, index, 'byIndex');
  }

  // Below method is require to check non-latin characters as existing method with byVisibleText will not be useful
  enterStateInputByIndex(index: number): void {
    helpers.select(this.stateInput, index, 'byIndex');
  }

  // Method to enter non-latin characters for all address input fields
  enterNonLatinCharactersForAddressFields(
    fname: string,
    lname: string,
    company: string,
    address: string,
    country: number,
    state: number,
    city: string,
    postalCode: string,
    phoneno: string,
  ): void {
    this.enterFnameInput(fname);
    this.enterLnameInput(lname);
    this.enterCompanyInput(company);
    this.enterAddressInput(address);
    this.enterCountryInputByIndex(country);
    this.enterStateInputByIndex(state);
    this.enterCityInput(city);
    this.enterPostalCodeInput(postalCode);
    this.enterPhoneNoInput(phoneno);
  }

  enterInvalidPhoneNoInput(phoneNo: string): void {
    helpers.setValue(this.phoneInput, phoneNo);
  }

  getAddressListSize(): number {
    return this.addressList.length;
  }

  // Function to get all address fields from address listing page
  getAllAddressFields(): any {
    const addressFields: any = [];
    let fieldValue: any;
    let xpath: any;
    const names: any = helpers.getText(this.billingNameFieldsaddressList);
    const nameResults: any = names.split(' ');
    addressFields.push(nameResults[0], nameResults[1]);
    for (let i = 2; i <= this.savedAddressFields.length; i += 1) {
      if (i === 5 || i === 6) {
        xpath =
          'div.span16.tablet-portrait-full-fluid-width.centered-block-parent.smartphone-uncentered-block-parent.vspace4 >' +
          'div > div.address-data > div:nth-child(' +
          [i] +
          ')';
        const temp = $(xpath).getText();
        fieldValue = temp.split(' ');
        addressFields.push(
          fieldValue[0].replace(/,\s*$/, ''),
          fieldValue[1].trim(),
        );
      }
      if (i === 2 || i === 3 || i === 7) {
        xpath =
          'div.span16.tablet-portrait-full-fluid-width.centered-block-parent.smartphone-uncentered-block-parent.vspace4 >' +
          'div > div.address-data > div:nth-child(' +
          [i] +
          ')';
        fieldValue = $(xpath).getText().trim();
        addressFields.push(fieldValue);
      }
    }
    return addressFields;
  }

  validateUpdatedSavedAddress(addressField: string): boolean {
    const fieldsValue: string = helpers.getText(
      $(
        '#wrap > div > div > div.span10.content > div > div.row-fluid.addresses-list > div > div > div.span10.offset3.tablet' +
          '-portrait-full-fluid-width > div:nth-child(1) > div > div.address-data > div:nth-child(3)',
      ),
    );
    if (fieldsValue === addressField) {
      return true;
    }
    return false;
  }

  getAddressTextBilling(): string {
    const addressText: string = helpers.getText(this.addressTextBilling);
    return addressText;
  }

  getAddressTextShipping(): string {
    const addressText: string = helpers.getText(this.addressTextShipping);
    return addressText;
  }
}
export default new AddressesPage();
