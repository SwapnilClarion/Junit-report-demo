import helpers from '../../utils/helpers';
import { Element, ElementArray } from '@wdio/sync';
class MasterOrderPage {
  /** -----------------------------Product Component Locators ---------------------------------- */
  get LabelShipping(): Element {
    return $('#master_order_pricedetail > tbody > tr.shipping > td.title-cont');
  }

  get TextFieldShippingAmount(): Element {
    return $('#shipping-amount');
  }

  get LabelShippingCurrency(): Element {
    return $(
      '#master_order_pricedetail > tbody > tr.shipping > td.amount-cont > span.order-currency',
    );
  }

  get ButtonEditShipping(): Element {
    return $(
      '#master_order_pricedetail > tbody > tr.shipping > td.action-cont > a',
    );
  }

  get DropdownSelectShippingService(): ElementArray {
    return $$('#shipping_services > select > option');
  }

  /** -----------------------------Product Component Methods ---------------------------------- */
  getLabelShipping(): string {
    const label: string = helpers.getText(this.LabelShipping);
    return label;
  }

  getTextFieldShippingAmount(): string {
    const amount: string = helpers.getText(this.TextFieldShippingAmount);
    return amount;
  }

  getLabelShippingCurrency(): string {
    const label: string = helpers.getText(this.LabelShippingCurrency);
    return label;
  }

  clickButtonEditShipping(): void {
    helpers.click(this.ButtonEditShipping);
  }
}
export default new MasterOrderPage();
