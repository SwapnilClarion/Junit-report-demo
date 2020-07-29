import { Element, ElementArray } from '@wdio/sync';
export class addressesPageLocators {
  get addressHeading(): Element {
    return $('div.row-fluid.addresses-list > div > h1');
  }

  get addNewAddress(): Element {
    return $('div.span16.text-center.vspace4 > a');
  }

  get addAddressFormHeading(): Element {
    return $('#wrap > div > div > div.span10.content > div > div > h1');
  }

  get fnameInput(): Element {
    return $('#addresses-form-first-name');
  }

  get lnameInput(): Element {
    return $('#addresses-form-last-name');
  }

  get companyInput(): Element {
    return $('#addresses-form-company');
  }

  get addressInput(): Element {
    return $('#addresses-form-address');
  }

  get countryInput(): Element {
    return $('#addresses-form-country-input');
  }

  get stateInput(): Element {
    return $('#addresses-form-state');
  }

  get cityInput(): Element {
    return $('#addresses-form-city');
  }

  get postCodeInput(): Element {
    return $('#addresses-form-postal-code');
  }

  get phoneInput(): Element {
    return $('#addresses-form-phone');
  }

  get saveAddressButton(): Element {
    return $('#formAddress > div > div.span16.text-center.vspace3 > button');
  }

  get editAddressButton(): Element {
    return $('div.vspace1.text-uppercase.action-box > a:nth-child(1)');
  }

  get deleteButtonOnAddressList(): Element {
    return $('div.vspace1.text-uppercase.action-box > a.modal-btn-load');
  }

  get savedAddressFields(): ElementArray {
    return $$('div.address-container>div.address-data>div');
  }

  get addressNameFields(): Element {
    return $('div > div.address-data>div:nth-child(1)');
  }

  get addressFormFields(): ElementArray {
    return $$('#formAddress > div.row-fluid > div');
  }

  get selectedCountry(): Element {
    return $('#addresses-form-country-input > option:nth-child(45)');
  }

  get selectedState(): Element {
    return $('#addresses-form-state > option:nth-child(6)');
  }

  get addFormZip(): Element {
    return $('#formAddress > div.row-fluid > div:nth-child(8)>div>div>input');
  }

  get addFormPhone(): Element {
    return $(
      '#formAddress > div.row-fluid > div:nth-child(8)>div>div:nth-child(2)>input',
    );
  }

  get addFormZipPhone(): Element {
    return $('#formAddress > div.row-fluid > div:nth-child(8)>div');
  }

  get editAddressFormHeading(): Element {
    return $('#wrap > div > div > div.span10.content > div > div > h1');
  }

  get addressContainer(): Element {
    return $('div.address-container > div.address-data');
  }

  get closeButtonOnDeleteAddDialogue(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div:nth-child(2) > div > a > i',
    );
  }

  get DeleteButtonOnDeleteDialogue(): Element {
    return $(
      'div.modal-content > div > div > form > button > span.button-label',
    );
  }

  get DeleteDialogueBox(): Element {
    return $('div.modal-container-outer.modal-banner > div');
  }

  get addressContainerSize(): Element {
    return $('div.row-fluid.addresses-list > div');
  }

  get cancelButtonOnAddressForm(): Element {
    return $('#formAddress > div > div:nth-child(10) > a');
  }

  get saveButtonOnAddressForm(): Element {
    return $('#formAddress > div > div:nth-child(10) > button');
  }

  get validationMessage(): Element {
    return $('#formAddress > div.row-fluid > div:nth-child(1)>span');
  }

  get invalidPhoneMsg(): Element {
    return $(
      '#formAddress > div > div:nth-child(8) > div > div:nth-child(2) > span',
    );
  }

  get addressList(): ElementArray {
    return $$(
      'div.row-fluid.addresses-list > div > div > div.span10.offset3.tablet-portrait-full-fluid-width>div',
    );
  }

  get billingNameFieldsaddressList(): Element {
    return $(
      'div.span16.tablet-portrait-full-fluid-width.centered-block-parent.smartphone-uncentered-block-parent.vspace4 >' +
        'div > div.address-data > div:nth-child(1)',
    );
  }

  get setAsDefaultBillingCheckBox(): Element {
    return $(
      '#formAddress > div > div:nth-child(9) > span:nth-child(1) > label',
    );
  }

  get addressTextBilling(): Element {
    return $(
      'div.row-fluid.addresses-list > div > div > div.span10.offset3.tablet-portrait-full-fluid-width >' +
        'div:nth-child(1) > div > div.address-data > div:nth-child(3)',
    );
  }

  get addressTextShipping(): Element {
    return $(
      'div.span10.offset3.tablet-portrait-full-fluid-width > div:nth-child(2) > div > div.address-data > div:nth-child(3)',
    );
  }
}
