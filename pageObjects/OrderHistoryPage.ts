import { orderHistoryPageLocators } from './pageLocators/OrderHistoryPage_Locators';
import helpers from '../utils/helpers';
export class OrderHistoryPage extends orderHistoryPageLocators {
  /**
   * Selects the reason from dropdown in order history page
   */
  selectModifyOrderReasons(reason: string): void {
    this.modifyOrderReasons.selectByVisibleText(reason);
  }

  /**
   * Clicks on view details link in order history page
   */
  clickViewDetailsLnk(): void {
    helpers.click(this.viewDetails);
  }

  /**
   * Clicks on track details link in order history page
   */
  clickTrackDetails(): void {
    helpers.click(this.trackDetails);
  }

  /**
   * Gets the orderId from order history page
   */
  getOrderId(): string {
    const orderIdTxt = helpers.getText(this.orderId);
    return orderIdTxt;
  }

  /**
   * Gets the order Date from order history page
   */
  getOrderDate(): string {
    const orderDateTxt = helpers.getText(this.orderDate);
    return orderDateTxt;
  }

  /**
   * Gets the order Price from order history page
   */
  getOrderPrice(): string {
    const orderPriceTxt = helpers.getText(this.orderPrice);
    return orderPriceTxt;
  }

  /**
   * Gets the order Status from order history page
   */
  getOrderStatus(): string {
    const orderStatusTxt = helpers.getText(this.orderStatus);
    return orderStatusTxt;
  }

  /**
   * Gets the orderId from order details section of order history page
   */
  getOrderIdFromDetails(): string {
    const orderIdHeading = helpers
      .getText(this.orderIdDetails)
      .trim()
      .split(' ');
    const orderId = orderIdHeading[1];
    return orderId;
  }

  /**
   * Gets the Payment Method from order details section of order history page
   */
  getOrderPaymentMethod(): string {
    const payMethod = helpers.getText(this.orderPaymentMethod);
    return payMethod;
  }

  /**
   * Gets the Shipping Method from order details section of order history page
   */
  getShippingMethod(): string {
    const shipMethod = helpers.getText(this.shippingMethod);
    return shipMethod;
  }

  /**
   * Get's all the Items prices in Order Summary section
   */
  getAllItemsPrices(): any {
    const allPrices: any = [];
    const productPrice = this.allItemsPrices;
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

  /** *
   * Returns array of item description.
   * @returns {Array}
   */
  getDescriptionContent(): any {
    const descriptionContent = this.allDescriptionContent;
    const description: any = [];
    for (let index = 0; index < descriptionContent.length; index += 1) {
      const element: any = descriptionContent[index];
      if (element.isClickable()) {
        description.push(element.getText());
      }
    }
    return description;
  }

  /**
   * Clicks on Brand Name
   */
  clickOnBrandName(): void {
    if (this.productName.isClickable()) {
      helpers.click(this.productName);
    }
  }

  /**
   * Clicks on Brand Image
   */
  clickOnBrandImg(): void {
    if (this.itemImage.isDisplayed() && this.itemImage.isClickable()) {
      helpers.click(this.itemImage);
    }
  }

  getEditMyOrderName(): string {
    return this.editMyOrderName.getValue();
  }

  getEditMyOrderCancelOrderID(): any {
    return this.editMyOrderInvoiceNumber.getValue();
  }

  getEditMyOrderEmailAddress(): any {
    return this.editMyOrderEmail.getValue();
  }

  clickOnEditMyOrderSubmitButton(): void {
    helpers.click(this.editMyOrderSubmitButton);
  }

  selectReasonFromDropDown(reason: string): void {
    helpers.select(this.editMyOrderReasonDropDown, reason, 'byVisibleText');
  }

  clickonrConfirmCancellationOption(option: string): void {
    helpers.click(
      $("//span[normalize-space()='" + option.trim() + "']//parent::button"),
    );
  }

  closeOrderCancelPopup(): void {
    helpers.click(this.orderCancelPopup);
  }
}

export default new OrderHistoryPage();
