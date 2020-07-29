import { orderConfirmationPageLocators } from './pageLocators/OrderConfirmationPage_Locators';
import helpers from '../utils/helpers';

export class OrderConfirmationPage extends orderConfirmationPageLocators {
  enterPasswordInput(password: string): void {
    helpers.setValue(this.passwordInput, password);
  }

  clickMensPromo(): void {
    helpers.click(this.mensPromoRadioBtn);
  }

  clickWomensPromo(): void {
    helpers.click(this.womensPromoRadioBtn);
  }

  clickNoThanksPromo(): void {
    helpers.click(this.noThanksPromoRadioBtn);
  }

  clickCreateAccountBtn(): void {
    helpers.click(this.createAccBtn);
  }

  checkCreateAccBtn(): boolean {
    if (this.createAccBtn.isExisting() && this.createAccBtn.isDisplayed()) {
      return true;
    }
    return false;
  }

  checkPasswordField(): boolean {
    if (this.passwordInput.isExisting() && this.passwordInput.isDisplayed()) {
      return true;
    }
    return false;
  }

  getOrderIdAndStatusMsg(): string {
    const message = helpers.getText(this.orderIdAndStatusMsg);
    return message;
  }

  getPaymentMethod(): string {
    const payment = helpers.getText(this.paymentMethodTxt);
    return payment;
  }

  clickContinueShoppingBtn(): void {
    helpers.click(this.continueShoppingBtn);
  }

  getOrderConfirmationText(): string {
    const confirmationText = helpers.getText(this.OrderConfirmationText);
    return confirmationText;
  }

  getOrderConfirmationID(): string {
    const orderTxt = helpers.getText(this.orderConfirmationId);
    const oid = orderTxt.split(' ');
    return oid[1];
  }

  /**
   * Get's all the Items prices in Order Summary section
   */
  getAllItemsPrices(): any {
    const allPrices: any = [];
    const productPrice: any = this.allItemsPrices;
    for (let index = 0; index < productPrice.length; index += 1) {
      const element = productPrice[index];
      const pr = element.getText().trim().split(' ');
      for (let j = 0; j < pr.length; j += 1) {
        const regStr = pr[j].replace(new RegExp(/^[a-zA-Z$.]*$/gim), ' ');

        if (regStr !== ' ') {
          allPrices.push(parseFloat(parseFloat(regStr.substr(1)).toFixed(2)));
        }
      }
    }
    return allPrices;
  }

  // This method is used to get shipping address fields from Order confirmation page
  getShippingAddressFields(): any {
    let xpath: any;
    let fieldValue: any;
    const addressFields: any = [];
    const names: any = helpers.getText(this.shippingAddressNameFields);
    const nameResults: any = names.split(' ');
    addressFields.push(nameResults[0], nameResults[1]);
    // Here for loop is initiated with 3 as there are no fields available for 1st 2nd div
    for (let i = 3; i <= this.shippingAddressFields.length + 1; i += 1) {
      // On order confirmation multiple fields are displayed - based on that it is grouped to get field data
      if (i === 5 || i === 6) {
        xpath =
          '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(7) > div:nth-child(' +
          [i] +
          ')';
        const temp: any = $(xpath).getText();
        fieldValue = temp.split(' ');
        addressFields.push(
          fieldValue[0].replace(/,\s*$/, ''),
          fieldValue[1].trim(),
        );
      }
      // here single fields are displayed on order confirmation so it is grouped accordingly
      if (i === 3 || i === 4 || i === 7) {
        xpath =
          '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(7) > div:nth-child(' +
          [i] +
          ')';
        fieldValue = $(xpath).getText().trim();
        addressFields.push(fieldValue);
      }
    }
    return addressFields;
  }

  // This method is used to get Billing address fields from Order confirmation page
  getBillingAddressFields(): any {
    let xpath: any;
    let fieldValue: any;
    const addressFields: any = [];
    const names: any = helpers.getText(this.billingAddressNameFields);
    const nameResults: any = names.split(' ');
    addressFields.push(nameResults[0], nameResults[1]);
    // Here for loop is initiated with 3 as there are no fields available for 1st 2nd div
    for (let i = 3; i <= this.billingAddressFields.length + 1; i += 1) {
      // On order confirmation multiple fields are displayed - based on that it is grouped to get field data
      if (i === 5 || i === 6) {
        xpath =
          '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(6) > div:nth-child(' +
          [i] +
          ')';
        const temp: any = $(xpath).getText();
        fieldValue = temp.split(' ');
        addressFields.push(
          fieldValue[0].replace(/,\s*$/, ''),
          fieldValue[1].trim(),
        );
      }
      // here single fields are displayed on order confirmation so it is grouped accordingly
      if (i === 3 || i === 4 || i === 7) {
        xpath =
          '#wrap > div > div.row-fluid.order-history-details.static.vspace4 > div:nth-child(1) > div > div:nth-child(6) > div:nth-child(' +
          [i] +
          ')';
        fieldValue = $(xpath).getText().trim();
        addressFields.push(fieldValue);
      }
    }
    return addressFields;
  }

  // This function accepts two parameters one is address type and another is updated address field value.
  // And validates the updated billing or shipping address field value is present or not on the order confirmation page
  validateUpdatedBillingOrShippingAddress(
    addressType: string,
    addressField: string,
  ): boolean {
    let result = false;
    result = $(
      "//p[text()='" +
        addressType +
        "']//following-sibling::div[contains(text(),'" +
        addressField +
        "')]",
    ).isDisplayed();
    return result;
  }

  getBillingAddressValue(): string {
    const addressText: string = helpers.getText(this.getBillingAddresText);
    return addressText;
  }

  getShippingText(): string {
    return helpers.getText(this.shippingMethodText);
  }

  getShippingTax(): string {
    return helpers.getText(this.shippingMethodTaxes);
  }

  getOrderTotal(): any {
    const amountTxt: string = helpers.getText(this.orderTotal);
    const amount = amountTxt.split(' ');
    return amount[0];
  }

  // This function will do sum of GST + PST Taxes on Order confirmation page
  getTaxAmount(): any {
    const gstTxt: any = parseFloat(
      parseFloat(helpers.getText(this.gstTaxes).replace(/\$/g, '')).toFixed(2),
    );
    const pstTxt: any = parseFloat(
      parseFloat(helpers.getText(this.pstTaxes).replace(/\$/g, '')).toFixed(2),
    );
    const tax = gstTxt + pstTxt;
    return tax;
  }
}
export default new OrderConfirmationPage();
