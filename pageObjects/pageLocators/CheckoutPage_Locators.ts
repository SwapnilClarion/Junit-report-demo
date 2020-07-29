import { Element, ElementArray } from '@wdio/sync';

export class checkoutPageLocators {
  get fnameInput(): Element {
    return $('input[name="fname"]');
  }

  get lnameInput(): Element {
    return $('input[name="lname"]');
  }

  get addressInput(): Element {
    return $('input[id="address1"]');
  }

  get companyInput(): Element {
    return $('input[name="shipping_company"]');
  }

  get cityInput(): Element {
    return $('input[name="city"]');
  }

  get postCodeInput(): Element {
    return $('input[id="postCode"]');
  }

  get countryInput(): Element {
    return $('select[name="country"]');
  }

  get stateInput(): Element {
    return $('select[name="state"]');
  }

  get phoneInput(): Element {
    return $('input[name="phone"]');
  }

  /** *
   * Locators : Shipping Payment Options
   */
  get creditCardInput(): Element {
    return $('input[id="credit"]');
  }

  get paypalInput(): Element {
    return $('input[id="paypal"]');
  }

  get aliPayInput(): Element {
    return $('input[id="alipay"]');
  }

  /** *
   * Locators : Saved Shipping Address Section
   */

  get selectsavedAddrLink(): Element {
    return $(
      '#shippingAddressForm > div:nth-child(1) > div > div > div.span8.dropdown-wrapper >' +
        'div > div.dropdown-select-toggle > div.dropdown-select-label',
    );
  }

  get selectsavedAddrLink1(): Element {
    return $(
      '#address-wrapper > div.span16 > div > div > div.span8.dropdown-wrapper > div >' +
        'div.dropdown-select-header > div > div',
    );
  }

  get selectsavedAddr(): Element {
    return $(
      '#shippingAddressForm > div:nth-child(1) > div > div > div.span8.dropdown-wrapper >' +
        'div > div.dropdown-select-options > div:nth-child(1)',
    );
  }

  get selectsavedAddr1(): Element {
    return $(
      '#address-wrapper > div.span16 > div > div > div.span8.dropdown-wrapper >' +
        'div > div.dropdown-select-addresses > div:nth-child(1) > div > label > div > p:nth-child(2)',
    );
  }

  /** *
   * Locators : Credit/Debit Card
   */
  get cardNumberInput(): Element {
    return $("//input[@id='ccNum' and @type='tel']");
  }

  get expiryMonthInput(): Element {
    return $("select[id='expiryMonth']");
  }

  get expiryYearInput(): Element {
    return $("select[id='expiryYear']");
  }

  get holderNameInput(): Element {
    return $("input[id='holderName']");
  }

  get cvvInput(): Element {
    return $("input[id='ccCVV']");
  }

  /** *
   * Locators : Shipping Check Section
   */
  get samAsShippingCheckBox(): Element {
    return $("input[id='sameAsShipping']");
  }

  /** *
   * Locators : Place Order Section
   */
  get placeOrderBtn(): Element {
    return $('//button[@id="checkoutSubmitButton"]');
  }

  /** *
   * Locators : Promotional Coupons Section
   */
  get couponCodeInput(): Element {
    return $("//input[@placeholder='PROMOTIONAL CODE']");
  }

  get applyCouponBtn(): Element {
    return $("//div[@class='span16 couponButton']/button");
  }

  /** *
   * Locators : Paypal Section
   */
  get payPalBtn(): Element {
    return $('#paypal-animation-container');
  }

  get payPalLoginEmailInput(): Element {
    return $('#email');
  }

  get payPalNextBtn(): Element {
    return $('button[id="btnNext"]');
  }

  get payPalPasswordInput(): Element {
    return $('#password');
  }

  get payPalLoginBtn(): Element {
    return $(
      '#loginSection > div > div.span11.alignRight.baslLoginButtonContainer > a',
    );
  }

  get payWithVisaRadioBtn(): Element {
    return $("input[id='CC-MFVMLB2BJ7AR4-funding-option']");
  }

  get payWithCreditUnionRadioBtn(): Element {
    return $("input[id='BA-E636Z6SZTHBK4-funding-option']");
  }

  get paymentSubmitBtn(): Element {
    return $("button[name='payment-submit-btn']");
  }

  get cancelAndReturnToSSense(): Element {
    return $("//a[@class='CancelLink_cancel-link_2uud4']");
  }

  get payPalFinalLoginBtn(): Element {
    return $('#btnLogin');
  }

  get paypalExpressBtn(): Element {
    return $('#paypalExpressButton');
  }

  /** *
   * Locators : AliPay Section
   */
  get checkoutSubmitBtn(): Element {
    return $('#checkoutSubmitButton > span');
  }

  get orderTotalAlert(): Element {
    return $(
      '#app > div.body-wrapper > div.notification-manager-container > span > div > div > span > span > span',
    );
  }

  get notification(): Element {
    return $('div.notification-message-container>span>span>span');
  }

  get notificationContainer(): ElementArray {
    return $$(
      '//div[@class="notification-manager-container"]/following-sibling::*',
    );
  }

  get allOrderItemsList(): ElementArray {
    return $$(
      'div.small.relative.order-summary-list-image-cta.banner > div:nth-child(2) > li.list-item-checkout ' +
        '> div.list-item-checkout-right > div.price-column-checkout > div.price-checkout',
    );
  }

  get checkoutHeading(): Element {
    return $('#wrap > div > form > div.top-title > h4');
  }

  /** *
   * Locators : Billing Address Section
   */
  get billingFnameInput(): Element {
    return $('#billingAddressForm>div>div>div>div>div>input#firstName');
  }

  get billingLnameInput(): Element {
    return $('#billingAddressForm>div>div>div>div>div>input#lastName');
  }

  get billingAddressInput(): Element {
    return $(
      '#billingAddressForm>div>div>div:nth-child(2)>div>div>input#address1',
    );
  }

  get billingCompanyInput(): Element {
    return $('#billingAddressForm>div>div>div>div>div>input#company');
  }

  get billingCityInput(): Element {
    return $('#billingAddressForm>div>div>div>div>div>input#city');
  }

  get billingPostCodeInput(): Element {
    return $('#billingAddressForm>div>div>div>div>div>input#postCode');
  }

  get billingCountryInput(): Element {
    return $('#billingAddressForm>div>div>div>div>div>div>select#countryCode');
  }

  get billingStateInput(): Element {
    return $('#billingAddressForm>div>div>div>div>div>div>select#stateCode');
  }

  get billingPhoneInput(): Element {
    return $('#billingAddressForm>div>div>div>div>div>input#phone');
  }

  get useAsBillingCheckbox(): Element {
    return $('#wrap>div>form>div:nth-child(2)>span');
  }

  get billingAddressSection(): Element {
    return $('div#address-wrapper>div:nth-child(2)>div#billingAddressForm');
  }

  get useAsBillingLabel(): Element {
    return $('#wrap > div > form > div:nth-child(2) > span > label');
  }

  get useOtherAddress(): Element {
    return $(
      'div.span8.dropdown-wrapper > div > div.dropdown-select-header > div > div',
    );
  }

  get useOtherShippingAddressFields(): ElementArray {
    return $$(
      'div.span8.dropdown-wrapper > div > div.dropdown-select-addresses > div > div > label > div>p',
    );
  }

  get editLinkAddressDropDown(): Element {
    return $(
      '#address-wrapper > div.span16 > div > div > div.span8.dropdown-wrapper > div > div.dropdown-select-addresses > div > span',
    );
  }

  get shippingAddressNameFields(): Element {
    return $(
      'div.span8.dropdown-wrapper > div > div.dropdown-select-addresses > div > div > label > div>p:nth-child(1)',
    );
  }

  get closeButtonUseOtherAddressDropdown(): Element {
    return $(
      'div.dropdown-select-header.open > div.dropdown-select-toggle > div',
    );
  }

  get billingUseOtherAddressDropdown(): Element {
    return $(
      '//*[@id="creditCard"]/following-sibling::div/div/div/div//div[2]/div/div/div[@class="dropdown-select-toggle"]',
    );
  }

  get billingAddressNameFields(): Element {
    return $(
      '//*[@id="address-wrapper"]/div[1]/div/div/div[2]/div/div[2]/div/div/label/div/p' +
        '[@class="same-as-shipping-address-dropdown"]//following-sibling::p[1]',
    );
  }

  get addNewShippingAddressLink(): Element {
    return $(
      '//*[@id="address-wrapper"]/div[1]/div/div/div[2]/div/div[1]/div[1]/div',
    );
  }

  get saveShippingAddressButton(): Element {
    return $(
      '#shippingAddressForm > div > div:nth-child(6) > div:nth-child(1) > button',
    );
  }

  get addNewBillingAddressButton(): Element {
    return $(
      '//*[@id="address-wrapper"]/div[1]/div/div/div[2]/div/div[1]/div[1]/div[contains(text(), "New billing address")]',
    );
  }

  get saveBillingAddressButton(): Element {
    return $(
      '#billingAddressForm > div > div > div:nth-child(6) > div:nth-child(1) > button',
    );
  }

  get billingOtherAddressEditLink(): Element {
    return $(
      "//div[normalize-space()='+ New billing address']//parent::div//parent::div//span[text()='Edit']",
    );
  }

  get selectBillingAddressfromDropdown(): Element {
    return $(
      '#address-wrapper > div.span16 > div > div > div.span8.dropdown-wrapper > div >' +
        'div.dropdown-select-addresses > div:nth-child(2) > div > label',
    );
  }

  get getBillingAddressTextFromDropdown(): Element {
    return $(
      '//div[normalize-space()="+ New billing address"]//parent::div//parent::div//' +
        'div[2][@class="compact-address-row"]/div/label/div/p[2]',
    );
  }

  get billingOtherAddressCloseLink(): Element {
    return $(
      '#address-wrapper > div.span16 > div > div > div.span8.dropdown-wrapper > div >' +
        'div.dropdown-select-header.open > div.dropdown-select-toggle > div',
    );
  }

  get shippingFee(): Element {
    return $(
      '#wrap > div > form > div:nth-child(5) > div > div:nth-child(2) > div.order-summary-total-container.flex-row >' +
        'div.order-summary-total.flex-column > div.subtotal-content.flex-row > div.column-right.flex-column > div:nth-child(2) >' +
        'div:nth-child(1)',
    );
  }

  get taxes(): Element {
    return $(
      '#wrap > div > form > div:nth-child(5) > div > div:nth-child(2) > div.order-summary-total-container.flex-row >' +
        'div.order-summary-total.flex-column > div.subtotal-content.flex-row > div.column-right.flex-column >' +
        'div:nth-child(2) > div:nth-child(2)',
    );
  }

  get orderTotal(): Element {
    return $(
      '#wrap > div > form > div:nth-child(5) > div > div:nth-child(2) > div.order-summary-total-container.flex-row >' +
        'div.order-summary-total.flex-column > div.total-content.flex-row > div.column-right.flex-column > div',
    );
  }

  get priorityBtn(): Element {
    return $('#priority');
  }

  get priorityText(): Element {
    return $('//input[@id="priority"]//parent::div//following-sibling::div[5]');
  }

  get priorityTextAmnt(): Element {
    return $('//input[@id="priority"]//parent::div//following-sibling::div[1]');
  }
}
