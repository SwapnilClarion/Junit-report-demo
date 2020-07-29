import { productDescriptionPageLocators } from './pageLocators/ProductDescriptionPage_Locators';
import helpers from '../../utils/helpers';
import { logger } from '../../config/winstonLogger';
import { productDescriptionTestData } from '../../resources/mobile/productDescriptionTestData';
export class ProductDescriptionPage extends productDescriptionPageLocators {
  getMobileProductBrandName(): string {
    const brand = helpers.getText(this.mobileProductBrandName);
    return brand;
  }

  getMobileProductName(): string {
    const name = helpers.getText(this.mobileProductName);
    return name;
  }

  // Function to get product price in mobile view
  getMobileProductPrice(): string {
    const price = helpers.getText(this.mobileProductPrice);
    const productPrice = price.trim().replace(/[a-z, $]/gi, '');
    return productPrice;
  }

  // Function to get product description in mobile view
  getMobileProductDescription(): string {
    const prodInfo = helpers.getText(this.mobileProductDescription);
    const description = prodInfo.replace(/\n|\r|br/g, '');
    return description;
  }

  getMobileProductSKU(): string {
    const sku = helpers.getText(this.mobileProductSKU);
    return sku;
  }

  // This function is used to get Json script data for the selected product in mobile view
  getLDJsonScriptData(): any {
    const htmlData: any = this.LDJsonScriptData.getHTML();
    let htmlStringData: string = htmlData.toString();
    htmlStringData = htmlStringData.replace(
      '<script type="application/ld+json">',
      '',
    );
    htmlStringData = htmlStringData.replace('</script>', ''); // To remove non-json content
    logger.info('================ LD JSON Script Data ====================');
    logger.info(htmlStringData);
    logger.info('=========================================================');
    const JsonData: any = JSON.parse(htmlStringData);
    return JsonData;
  }

  getProductImageUrl(): any {
    const productImageUrl: any = this.productImageUrl.getAttribute('src');
    return productImageUrl;
  }

  getProductBrandNameAlign(): any {
    return helpers.getAttribute(this.productBrandNameAlign, 'class');
  }

  getproductBrandNameCase(): any {
    return helpers.getAttribute(this.productBrandNameCase, 'class');
  }

  clickProductBrandName(): void {
    helpers.click(this.mobileProductBrandName);
  }

  clickHideViewLnk(): void {
    helpers.click(this.hideViewLnk);
  }

  getHideViewLnkTxt(): string {
    return helpers.getText(this.hideViewLnk);
  }

  getSoldOutHeading(): string {
    return helpers.getText(this.soldOutHeading);
  }

  /**
   * Validates view details link translation
   * @param lnkData
   */
  validateViewDetailsLnkTranslation(lnkData: string): boolean {
    let status = false;
    if (productDescriptionTestData.viewDetailsLnk.includes(lnkData)) {
      status = true;
    }
    return status;
  }

  clickAddToBag(): any {
    helpers.click(this.addToBagButton);
  }

  getNumberOfShoppingBagProduct(): number {
    const actualProduct = helpers.getText(this.numberShoppingBagProduct);
    return parseInt(actualProduct, 8);
  }

  clickOnContinueShoppingButton(): void {
    helpers.click(this.continueShoppingButton);
  }

  clickOnHideDetailsLink(): void {
    if (this.hideDetailsLink.isDisplayed()) {
      helpers.click(this.hideDetailsLink);
    }
  }

  isAddToBagButtonDisplayed(): boolean {
    if (this.mobileAddToBag.isDisplayed()) {
      return true;
    }
    return false;
  }

  isAddToWishlistButtonDisplayed(): boolean {
    if (this.addToWishlistButton.isDisplayed()) {
      return true;
    }
    return false;
  }

  // Function to get available product size that can be used to select size while adding product to cart
  getProductSize(): any {
    let retSize: any = '';
    const allSize = this.allSizes;
    for (let index = 0; index < allSize.length; index += 1) {
      const element = allSize[index];
      if (
        !element.getText().includes('Sold Out') &&
        !element.getText().includes('SELECT A SIZE') &&
        !element.getText().includes('SÉLECTIONNER UNE TAILLE') &&
        !element.getText().includes('サイズの選択') &&
        !element.getText().includes('选择尺码')
      ) {
        if (!element.getText().includes('Sold Out')) {
          retSize = element.getText();
          break;
        }
      }
    }
    return retSize;
  }

  selectSize(sizeValue: string): void {
    if (sizeValue !== null || sizeValue !== undefined || sizeValue !== '') {
      helpers.select(this.productSize, sizeValue, 'byVisibleText');
    }
  }

  // Function is used to select size and add product to shopping bag
  addToBag(): void {
    const productSizeDropdown = this.isSizeDropdownExist();
    logger.info('Product size dropdown displayed: ' + productSizeDropdown);

    if (productSizeDropdown === true) {
      const productSize: any = browser.waitUntil((): any => {
        return this.getProductSize();
      }, 5000);
      this.selectSize(productSize);
      this.clickAddToBag();
    } else {
      this.clickAddToBag();
    }
  }

  isSizeDropdownExist(): boolean {
    if (this.productSize.isDisplayed()) {
      return true;
    }
    return false;
  }

  getSelectedSize(): any {
    return this.productSize.getText();
  }

  getProceedToCheckoutButtonText(): any {
    return this.proceedToCheckout.getText();
  }

  // Add to bag notification for multi-size product
  getAddToBagNotification(): any {
    return this.addToBagNotification.getText();
  }

  // Add to bag notification for one-size product
  getAddToBagNotificationForOneSizeProduct(): any {
    return this.addToBagNotificationOneSize.getText();
  }

  // Function to get size part from product complete size string
  getSizeText(): any {
    let retSize: any = '';
    const allSize = this.allSizes;
    for (let index = 0; index < allSize.length; index += 1) {
      const element = allSize[index];
      if (
        !element.getText().includes('Sold Out') &&
        !element.getText().includes('SELECT A SIZE') &&
        !element.getText().includes('SÉLECTIONNER UNE TAILLE') &&
        !element.getText().includes('サイズの選択') &&
        !element.getText().includes('选择尺码')
      ) {
        if (!element.getText().includes('Sold Out')) {
          retSize = element.getAttribute('value').split('_')[0];
          break;
        }
      }
    }
    return retSize;
  }

  // Function is used to generate expected Add to Bag message based on product size
  expectedAddToBagMessage(): any {
    const sizeText = this.getSizeText();
    const notification =
      productDescriptionTestData.sizeText +
      sizeText +
      productDescriptionTestData.addToBagMessagePartialText;
    return notification;
  }
}
export default new ProductDescriptionPage();
