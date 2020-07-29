import { checkoutPageLocators } from './pageLocators/CheckoutPage_Locators';
import helpers from '../utils/helpers';
import { logger } from '../config/winstonLogger';
import { checkoutTestData } from '../resources/checkoutTestData';

export class CheckoutPage extends checkoutPageLocators {
  // ========================================================================
  clickSavedAddress(): void {
    if (this.selectsavedAddrLink.isDisplayed()) {
      helpers.click(this.selectsavedAddrLink);
      helpers.click(this.selectsavedAddr);
    } else if (this.selectsavedAddrLink1.isDisplayed()) {
      helpers.click(this.selectsavedAddrLink1);
      helpers.click(this.selectsavedAddr1);
    }
  }

  // ----------------------------------------------------Shipping Address-------------------------------------
  enterFnameInput(fname: string): void {
    this.fnameInput.clearValue();
    helpers.setValue(this.fnameInput, fname);
  }

  enterLnameInput(lname: string): void {
    this.lnameInput.clearValue();
    helpers.setValue(this.lnameInput, lname);
  }

  enterAddressInput(address: string): void {
    this.addressInput.clearValue();
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

  // Payment Method-------------------------------------
  /** *
   * Select Payment Method
   * @param {String} payMethod
   * Payment: credit, paypal , alipay
   */
  selectPaymentMethod(payMethod: string): void {
    switch (payMethod) {
      case 'credit':
        helpers.click(this.creditCardInput);
        break;
      case 'paypal':
        helpers.click(this.paypalInput);
        break;
      case 'alipay':
        helpers.click(this.aliPayInput);
        break;

      default:
        break;
    }
  }

  clickPayPalBtn(): void {
    helpers.click(this.payPalBtn);
  }

  clickPaypalExpressBtn(): void {
    helpers.click(this.paypalExpressBtn);
  }

  // Card Details
  enterCardNumber(cardNo: string): void {
    helpers.setValue(this.cardNumberInput, cardNo);
  }

  enterCardHolderName(name: string): void {
    helpers.setValue(this.holderNameInput, name);
  }

  selectCardExpiryMonth(expMonth: string): void {
    helpers.select(this.expiryMonthInput, expMonth, 'byVisibleText');
  }

  selectCardExpiryYear(expYear: string): void {
    helpers.select(this.expiryYearInput, expYear, 'byVisibleText');
  }

  enterCVVCode(cvv: string): void {
    helpers.setValue(this.cvvInput, cvv);
  }

  clickSameAsShipping(): void {
    helpers.click(this.samAsShippingCheckBox);
  }

  // Place Order
  clickPlaceOrderBtn(): void {
    helpers.click(this.placeOrderBtn);
  }

  // ------------------------------------- Methods------------------------------------------------------ //

  /** *
   * Methods : PayPal Payment Process Section
   */
  clickPayPalLoginBtn(): void {
    helpers.click(this.payPalLoginBtn);
  }

  enterPaypalEmail(email: string): void {
    helpers.setValue(this.payPalLoginEmailInput, email);
  }

  clickPayPalNextBtn(): void {
    helpers.click(this.payPalNextBtn);
  }

  enterPayPalPassword(password: string): void {
    helpers.setValue(this.payPalPasswordInput, password);
  }

  clickPayPalFinalLoginBtn(): void {
    helpers.click(this.payPalFinalLoginBtn);
  }

  selectPayWithVisaRadioBtn(): void {
    helpers.click(this.payWithVisaRadioBtn);
  }

  selectPayWithCreditUnionRadioBtn(): void {
    helpers.click(this.payWithCreditUnionRadioBtn);
  }

  clickPaymentSubmitBtn(): void {
    helpers.click(this.paymentSubmitBtn);
  }

  clickCancelAndReturnSsense(): void {
    helpers.click(this.cancelAndReturnToSSense);
  }

  // AliPay
  clickCheckoutSubmitBtn(): void {
    helpers.click(this.checkoutSubmitBtn);
  }

  // ------------------------------New Shipping Address---------
  /** * Add New Shipping Address Method
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
  addNewShippingAddress(
    fname: string,
    lname: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    state: string,
    phoneno: string,
  ): void {
    this.enterFnameInput(fname);
    this.enterLnameInput(lname);
    this.enterAddressInput(address);
    this.enterCityInput(city);
    this.enterPostalCodeInput(postalCode);
    this.enterCountryInput(country);
    this.enterStateInput(state);
    this.enterPhoneNoInput(phoneno);
  }

  /** * Credit Card Method
   *
   * Call this method for carrying out the credit card payment process.
   */
  paymentWithCreditCard(): void {
    this.enterCardNumber(checkoutTestData.CARD_NUMBER);
    this.selectCardExpiryMonth(checkoutTestData.EXPIRY_MONTH);
    this.selectCardExpiryYear(checkoutTestData.EXPIRY_YEAR);
    this.enterCardHolderName(checkoutTestData.CARD_HOLDER_NAME);
    this.enterCVVCode(checkoutTestData.SECURITY_CODE);
  }

  closeAllNotification(): void {
    let size: any;
    // Since notification takes time to load static wait is needed and dynamic wait is not working
    browser.pause(1000);
    if (!this.notification.isDisplayed()) {
      logger.info('Notification is not displayed or it is closed');
    } else if (this.notification.isDisplayed()) {
      size = this.notificationContainer.length;
      for (let i = 1; i <= size; i += 1) {
        helpers.click(this.notification);
      }
    }
  }

  /**
   * Returns an array of prices of all the products available in the Order Summary page.
   * @returns {Array prices}
   */
  getProductPrices(): any {
    const prices: any = [];
    const orderItems: any = this.allOrderItemsList;
    for (let index = 0; index < orderItems.length; index += 1) {
      const element: any = orderItems[index];
      if (element.$('div#percentage-info').isExisting()) {
        const prReg = element
          .$('div#regular-price')
          .getText()
          .trim()
          .substr(1)
          .split(' ');
        const prSale = element
          .$('div#percentage-info > div#sale-price')
          .getText()
          .trim()
          .substr(1)
          .split(' ');
        prices.push(
          parseFloat(parseFloat(prReg[0]).toFixed(2)),
          parseFloat(parseFloat(prSale[0]).toFixed(2)),
        );
      }
      const prNS = element
        .$('div#regular-price')
        .getText()
        .trim()
        .substr(1)
        .split(' ');
      prices.push(parseFloat(parseFloat(prNS[0]).toFixed(2)));
    }
    return prices;
  }

  getCheckoutPageHeading(): string {
    return helpers.getText(this.checkoutHeading);
  }

  enterStateByText(state: string): void {
    helpers.select(this.stateInput, state, 'byVisibleText');
  }

  /** * Function to Create shipping address for checkout process
   * @param {String} fname
   * @param {String} lname
   * @param {String} company
   * @param {String} address
   * @param {String} city
   * @param {String} postalCode
   * @param {String} country
   * @param {String} state
   * @param {String} phoneno
   *
   */
  addShippingAddressForCheckout(addressFields: any[]): void {
    this.enterFnameInput(addressFields[0]);
    this.enterLnameInput(addressFields[1]);
    this.enterCompanyInput(addressFields[2]);
    this.enterAddressInput(addressFields[3]);
    this.enterCountryInput(addressFields[4]);
    this.enterStateByText(addressFields[5]);
    this.enterCityInput(addressFields[6]);
    this.enterPostalCodeInput(addressFields[7]);
    this.enterPhoneNoInput(addressFields[8]);
  }

  // ----------------------------------------------------Billing Address-------------------------------------
  enterBillingFnameInput(fname: string): void {
    helpers.setValue(this.billingFnameInput, fname);
  }

  enterBillingLnameInput(lname: string): void {
    helpers.setValue(this.billingLnameInput, lname);
  }

  enterBillingAddressInput(address: string): void {
    this.addressInput.clearValue();
    helpers.setValue(this.billingAddressInput, address);
  }

  enterBillingCompanyInput(company: string): void {
    helpers.setValue(this.billingCompanyInput, company);
  }

  enterBillingCityInput(city: string): void {
    helpers.setValue(this.billingCityInput, city);
  }

  enterBillingPostalCodeInput(postalNo: string): void {
    helpers.setValue(this.billingPostCodeInput, postalNo);
  }

  enterBillingCountryInput(country: string): void {
    helpers.select(this.billingCountryInput, country, 'byVisibleText');
  }

  enterBillingStateByText(stateIndex: string): void {
    helpers.select(this.billingStateInput, stateIndex, 'byVisibleText');
  }

  enterBillingPhoneNoInput(phoneNo: string): void {
    helpers.setValue(this.billingPhoneInput, phoneNo);
  }

  /** * Function to Create Billing address for checkout process
   * @param {String} fname
   * @param {String} lname
   * @param {String} company
   * @param {String} address
   * @param {String} city
   * @param {String} postalCode
   * @param {String} country
   * @param {String} state
   * @param {String} phoneno
   *
   */
  addBillingAddressForCheckout(billingAddressFields: any[]): void {
    this.enterBillingFnameInput(billingAddressFields[0]);
    this.enterBillingLnameInput(billingAddressFields[1]);
    this.enterBillingCompanyInput(billingAddressFields[2]);
    this.enterBillingAddressInput(billingAddressFields[3]);
    this.enterBillingCountryInput(billingAddressFields[4]);
    this.enterBillingStateByText(billingAddressFields[5]);
    this.enterBillingCityInput(billingAddressFields[6]);
    this.enterBillingPostalCodeInput(billingAddressFields[7]);
    this.enterBillingPhoneNoInput(billingAddressFields[8]);
  }

  isUseAsBillingCheckboxDisplayed(): boolean {
    if (this.useAsBillingCheckbox.isDisplayed()) {
      return true;
    }
    return false;
  }

  isBillingAddressSectionDisplayed(): boolean {
    if (this.billingAddressSection.isDisplayed()) {
      return true;
    }
    return false;
  }

  getUseAsBillingLabelText(): string {
    return helpers.getText(this.useAsBillingLabel);
  }

  clickOnUseAsBillingCheckbox(): void {
    helpers.click(this.useAsBillingCheckbox);
  }

  getUseOtherAddressLinkText(): string {
    return helpers.getText(this.useOtherAddress);
  }

  clickOnUseOtherAddressLink(): void {
    helpers.click(this.useOtherAddress);
  }

  // This function is used to get address fields from use other address dropdown from shipping section
  getAddressUseOtherAddDropdownShipping(): any {
    let xpath: any;
    let fieldValue: any;
    const addressFields: any = [];
    const names: any = helpers.getText(this.shippingAddressNameFields);
    const nameResults: any = names.split(' ');
    addressFields.push(nameResults[0], nameResults[1]);
    for (let i = 2; i <= this.useOtherShippingAddressFields.length; i += 1) {
      if (i === 2) {
        xpath =
          'div.span8.dropdown-wrapper > div > div.dropdown-select-addresses > div > div > label > div>p:nth-child(' +
          [i] +
          ')';
        const temp: any = $(xpath).getText();
        fieldValue = temp.split(',');
        addressFields.push(
          fieldValue[0].replace(/,\s*$/, ''),
          fieldValue[1].trim(),
        );
      }
      if (i === 3) {
        xpath =
          'div.span8.dropdown-wrapper > div > div.dropdown-select-addresses > div > div > label > div>p:nth-child(' +
          [i] +
          ')';
        const temp: any = $(xpath).getText();
        fieldValue = temp.split(' ');
        addressFields.push(
          fieldValue[0].replace(/,\s*$/, ''),
          fieldValue[1].replace(/,\s*$/, ''),
          fieldValue[2].trim(),
        );
      }
      if (i === 4 || i === 5) {
        xpath =
          'div.span8.dropdown-wrapper > div > div.dropdown-select-addresses > div > div > label > div>p:nth-child(' +
          [i] +
          ')';
        fieldValue = $(xpath).getText().trim();
        addressFields.push(fieldValue);
      }
    }
    return addressFields;
  }

  closeUseOtherAddressDropdown(): void {
    helpers.click(this.closeButtonUseOtherAddressDropdown);
  }

  // function to click on Use other address dropdown for Billing section on checkout page
  clickOtherAddressForBilling(): void {
    helpers.click(this.billingUseOtherAddressDropdown);
  }

  // This function is used to get address fields from use other address dropdown from Billing section
  getAddressUseOtherAddDropdownBilling(): void {
    let xpath: any;
    let fieldValue: any;
    const addressFields: any = [];
    const names: any = helpers.getText(this.billingAddressNameFields);
    const nameResults: any = names.split(' ');
    addressFields.push(nameResults[0], nameResults[1]);
    for (let i = 2; i <= this.useOtherShippingAddressFields.length; i += 1) {
      if (i === 2) {
        xpath =
          '//*[@id="address-wrapper"]/div[1]/div/div/div[2]/div/div[2]/div/div/label/div/p' +
          '[@class="same-as-shipping-address-dropdown"]//following-sibling::p[' +
          [i] +
          ']';
        const temp = $(xpath).getText();
        fieldValue = temp.split(',');
        addressFields.push(
          fieldValue[0].replace(/,\s*$/, ''),
          fieldValue[1].trim(),
        );
      }
      if (i === 3) {
        xpath =
          '//*[@id="address-wrapper"]/div[1]/div/div/div[2]/div/div[2]/div/div/label/div/p' +
          '[@class="same-as-shipping-address-dropdown"]//following-sibling::p[' +
          [i] +
          ']';
        const temp: any = $(xpath).getText();
        fieldValue = temp.split(' ');
        addressFields.push(
          fieldValue[0].replace(/,\s*$/, ''),
          fieldValue[1].replace(/,\s*$/, ''),
          fieldValue[2].trim(),
        );
      }
      if (i === 4 || i === 5) {
        xpath =
          '//*[@id="address-wrapper"]/div[1]/div/div/div[2]/div/div[2]/div/div/label/div/p' +
          '[@class="same-as-shipping-address-dropdown"]//following-sibling::p[' +
          [i] +
          ']';
        fieldValue = $(xpath).getText().trim();
        addressFields.push(fieldValue);
      }
    }
    return addressFields;
  }

  clickOnSaveAddressButton(): void {
    helpers.click(this.saveShippingAddressButton);
  }

  clickAddNewShippingAddress(): void {
    helpers.click(this.addNewShippingAddressLink);
  }

  clickOnSaveBillingAddressButton(): void {
    helpers.click(this.saveBillingAddressButton);
  }

  clickAddNewBillingAddress(): void {
    helpers.click(this.addNewBillingAddressButton);
  }

  clickOnEditLinkAddressDropDown(): void {
    helpers.click(this.editLinkAddressDropDown);
  }

  validateEditedShippingAddressFields(fieldValue: string): boolean {
    const result: boolean = $(
      "//*[@id='address-wrapper']/div[1]/div/div/div[2]/div/div[2]/div/div/label/div/p[normalize-space()=contains(text(),'" +
        fieldValue +
        "')]",
    ).isDisplayed();
    return result;
  }

  clickOnBillingOtherAddressEditLink(): void {
    helpers.click(this.billingOtherAddressEditLink);
  }

  validateEditedBillingAddressFields(fieldValue: string): boolean {
    const value: string = helpers.getText(
      $(
        "//div[normalize-space()='+ New billing address']//parent::div//following-sibling::div//p[normalize-space()=contains(text(),'" +
          fieldValue +
          "')]",
      ),
    );
    logger.info('Updated value = ' + value);
    if (value.includes(fieldValue)) {
      return true;
    }
    return false;
  }

  getBillingAddressFieldFromDropdown(): string {
    const addressText: any = [];
    const addressValueDropdown: any = helpers.getText(
      this.getBillingAddressTextFromDropdown,
    );
    return addressText.push[addressValueDropdown[1]];
  }

  isEditButtonDisplayedBillingAddDropdown(): boolean {
    if (
      this.billingOtherAddressEditLink.isExisting() &&
      this.billingOtherAddressEditLink.isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  clickOnBillingOtherAddressCloseLink(): void {
    helpers.click(this.billingOtherAddressCloseLink);
  }

  getShippingFee(): string {
    return helpers.getText(this.shippingFee);
  }

  clickShippingMethod(): void {
    helpers.click(this.priorityBtn);
  }

  getShippingMethodText(): string {
    return helpers.getText(this.priorityText);
  }

  getShippingMethodAmount(): any {
    const amount: string = this.priorityTextAmnt.getText();
    return amount.split(' ');
  }

  getTaxesAmountText(): string {
    const tax = helpers.getText(this.taxes).replace(/\$/g, '');
    return tax;
  }

  getOrderTotalAmount(): string {
    return helpers.getText(this.orderTotal);
  }
}
export default new CheckoutPage();
