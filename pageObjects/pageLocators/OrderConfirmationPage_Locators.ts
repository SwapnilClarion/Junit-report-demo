import { Element, ElementArray } from '@wdio/sync';
export class orderConfirmationPageLocators {
  /** =======================================Locators============================================== */
  get orderIdAndStatusMsg(): Element {
    return $(
      '#wrap > div > div.header-text.flex-container-column.header-center > p',
    );
  }

  get continueShoppingBtn(): Element {
    return $('#wrap > div > div.confirmation-footer > a');
  }

  get passwordInput(): Element {
    return $('#password');
  }

  get mensPromoRadioBtn(): Element {
    return $('#gender_men_form');
  }

  get womensPromoRadioBtn(): Element {
    return $('#gender_women_form');
  }

  get noThanksPromoRadioBtn(): Element {
    return $('#no_thanks_form');
  }

  get createAccBtn(): Element {
    return $('#submitRegister');
  }

  get paymentMethodTxt(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(4) > div',
    );
  }

  get OrderConfirmationText(): Element {
    return $(
      '#wrap > div > div.header-text.flex-container-column.header-center > p',
    );
  }

  get orderConfirmationId(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(1) > h2',
    );
  }

  get allItemsPrices(): ElementArray {
    return $$('div.row-fluid.row-table> div.span4.text-right');
  }

  get shippingAddressNameFields(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(7) > div:nth-child(2)',
    );
  }

  get shippingAddressFields(): ElementArray {
    return $$(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(7)>div',
    );
  }

  get billingAddressNameFields(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(6) > div:nth-child(2)',
    );
  }

  get billingAddressFields(): ElementArray {
    return $$(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(6)>div',
    );
  }

  get getBillingAddresText(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(6) > div:nth-child(4)',
    );
  }

  get shippingMethodText(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(5) > div > span',
    );
  }

  get shippingMethodTaxes(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(3) > div:nth-child(2) > div.span5.text-right',
    );
  }

  get gstTaxes(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(3) > div:nth-child(3) > div.span5.text-right',
    );
  }

  get pstTaxes(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(3) > div:nth-child(4) > div.span5.text-right',
    );
  }

  get orderTotal(): Element {
    return $(
      '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(3) > div:nth-child(5) >' +
        'div.span10.text-right > strong',
    );
  }
}
