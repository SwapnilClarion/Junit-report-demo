import { Element, ElementArray } from '@wdio/sync';
export class orderHistoryPageLocators {
  /**
   * ===============================================Locators====================================
   */
  get previousOrderListItems(): ElementArray {
    return $$("//div[@class='table vspace2']/div");
  }

  get modifyOrderReasons(): Element {
    return $('select#order-history-on-hold-reason-input');
  }

  get viewDetails(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > ' +
        'div.span16 > div > div:nth-child(2) > div:nth-child(2) > div.row-fluid.row-table >' +
        ' div.span6.item > div.row-fluid.hidden-smartphone-landscape > div:nth-child(1) > a',
    );
  }

  get trackDetails(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div.span16 > div > div:nth-child(2) > div:nth-child(2) >' +
        ' div.row-fluid.row-table > div.span6.item > div.row-fluid.hidden-smartphone-landscape > div:nth-child(2) > a',
    );
  }

  get orderId(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div.span16 > div > div:nth-child(2) > div:nth-child(2) >' +
        ' div.row-fluid.row-table > div.span6.item > div:nth-child(1)',
    );
  }

  get orderDate(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div.span16 > div > div:nth-child(2) >' +
        ' div:nth-child(2) > div.row-fluid.row-table > div:nth-child(2)',
    );
  }

  get orderPrice(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div.span16 > div > div:nth-child(2) > ' +
        'div:nth-child(2) > div.row-fluid.row-table > div:nth-child(3)',
    );
  }

  get orderStatus(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div.span16 > div > div:nth-child(2) >' +
        ' div:nth-child(2) > div.row-fluid.row-table > div.span2.status',
    );
  }

  get orderIdDetails(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div:nth-child(1) > div > div:nth-child(1) > h2',
    );
  }

  get orderItemsList(): ElementArray {
    return $$(
      '#wrap > div > div > div.span10.content > div > div.span16.vspace4 > div > div',
    );
  }

  get orderPaymentMethod(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div:nth-child(1) > div > div:nth-child(4) > div',
    );
  }

  get shippingMethod(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div:nth-child(1) > div > div:nth-child(5) > div > span',
    );
  }

  get allItemsPrices(): ElementArray {
    return $$(
      '#wrap > div > div > div.span10.content > div >' +
        ' div.span16.vspace4 > div > div.row-fluid.row-table > div.span4.text-right',
    );
  }

  get allDescriptionContent(): ElementArray {
    return $$(
      '#wrap > div > div > div.span10.content > div > div.span16.vspace4 >' +
        ' div > div.row-fluid.row-table > div.span7 >a',
    );
  }

  get itemImage(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div >' +
        ' div.span16.vspace4 > div > div.row-fluid.row-table > div.span3 > a > img',
    );
  }

  get productName(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div.span16.vspace4 > div > div.row-fluid.row-table > div.span7 > a.underline',
    );
  }

  get editMyOrderHeading(): Element {
    return $('#wrap > div > div > div.span10.content > div > div > h1');
  }

  get editMyOrderName(): Element {
    return $('input#modify-order-customer-name');
  }

  get editMyOrderEmail(): Element {
    return $('input#modify-order-email');
  }

  get editMyOrderInvoiceNumber(): Element {
    return $('input#modify-order-invoice-number');
  }

  get editMyOrderSubmitButton(): Element {
    return $(' div.span16.text-center.vspace2 > button');
  }

  get editMyOrderReasonDropDown(): Element {
    return $('select#order-history-modify-reason');
  }

  get orderConfirmCancellationPopup(): Element {
    return $(
      'div.cancel-order-modal > div > div > div.modal-container-outer.modal-banner',
    );
  }

  get orderCancelPopup(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div.cancel-order-modal > div > div > div.modal-container-outer.modal-banner > div >' +
        ' div.modal-content > div > div > form > button',
    );
  }
}
