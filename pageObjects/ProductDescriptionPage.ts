import { productDescriptionPageLocators } from './pageLocators/ProductDescriptionPage_Locators';
import helpers from '../utils/helpers';
import { logger } from '../config/winstonLogger';
import { wishlistTestData } from '../resources/wishlistTestData';
import { productDescriptionTestData } from '../resources/productDescriptionTestData';
import notification from '../methods/GetNotification';
import navigationPage from './NavigationPage';
import checkoutPage from './CheckoutPage';
import { Element } from '@wdio/sync';
export class ProductDescriptionPage extends productDescriptionPageLocators {
  selectSize(): any {
    let retSize: any = '';

    const allSize = this.allSizes;

    for (let index = 0; index < allSize.length; index += 1) {
      const element = allSize[index];
      if (
        !element.getText().includes('Sold Out') &&
        !element.getText().includes('Only one left') &&
        !element.getText().includes('SELECT A SIZE') &&
        !element.getText().includes('SÉLECTIONNER UNE TAILLE') &&
        !element.getText().includes('サイズの選択') &&
        !element.getText().includes('选择尺码')
      ) {
        if (
          !element.getText().includes('Sold Out') &&
          !element.getText().includes('Only one left')
        ) {
          retSize = element.getText();
          break;
        }
      }
    }
    return retSize;
  }

  addSize(sizeValue: string): void {
    if (sizeValue !== null || sizeValue !== undefined || sizeValue !== '') {
      helpers.select(this.productSize, sizeValue, 'byVisibleText');
    }
  }

  clickAddToBag(): void {
    helpers.click(this.addToBagBtn);
  }

  clickCheckoutBtn(): void {
    helpers.click(this.checkoutBtn);
  }

  clickWishlistBtn(): void {
    helpers.click(this.wishlistBtn);
  }

  enterEmailAddress(email: string): void {
    helpers.setValue(this.inputEmail, email);
  }

  isOneSizeButtonExist(): boolean {
    if (this.oneSizeButton.isExisting() && this.oneSizeButton.isDisplayed()) {
      return true;
    }
    return false;
  }

  getWishlistButtonText(): string {
    return helpers.getText(this.inWishListButton);
  }

  clickWishListNavMenu(): void {
    helpers.click(this.wishListNav);
  }

  getProductNameOnPDP(): string {
    return helpers.getText(this.productOnPDP);
  }

  isAddToBagButtonExist(): boolean {
    if (this.addToBagBtn.isExisting() && this.addToBagBtn.isDisplayed()) {
      return true;
    }
    return false;
  }

  clickInWishlistButton(): void {
    return helpers.click(this.inWishListButton);
  }

  getAddtoWishListButtonText(): string {
    return helpers.getText(this.addToWishListButton);
  }

  addToWishList(): void {
    const OneSizeButtonValue = this.isOneSizeButtonExist();
    logger.info('ONE SIZE button displayed: ' + OneSizeButtonValue);

    if (OneSizeButtonValue === false) {
      const sizeCheck: any = browser.waitUntil((): any => {
        return this.selectSize();
      }, 5000);
      this.addSize(sizeCheck);
    }
    this.clickWishlistBtn();
  }

  addToBag(): void {
    const OneSizeButtonValue = this.isOneSizeButtonExist();
    logger.info('ONE SIZE button displayed: ' + OneSizeButtonValue);

    if (OneSizeButtonValue === false) {
      const sizeCheck: any = browser.waitUntil((): any => {
        return this.selectSize();
      }, 5000);
      this.addSize(sizeCheck);
      this.clickAddToBag();
    } else {
      this.clickAddToBag();
    }
  }

  // Function to get all the available sizes for selected product and store in array that can be used while adding
  // multiple products in wishlist
  getAllSizes(): any {
    const allProductSize: any = [];
    let retSize: any;
    const allSize = this.allSizes;

    for (let index = 0; index < allSize.length; index += 1) {
      const element = allSize[index];
      if (
        !element.getText().includes('Sold Out') &&
        !element.getText().includes('SELECT A SIZE')
      ) {
        retSize = element.getText();
        allProductSize.push(retSize);
      }
    }
    return allProductSize;
  }

  // Function to add 15 products to wishlist - it will click each product, select all available size one by one
  // and add to Wishlist, if no size is available it will automatically move to next product
  // also it will skip product for which newsletter option is available (product is sold out)
  addMultipleProductToWishList(): any {
    let prodSize = [];
    let numberOfProduct = 0;
    for (let i = 1; i <= wishlistTestData.WishListProductLimit; i += 1) {
      const product = 'div.browsing-product-list>figure:nth-child(' + [i] + ')';
      helpers.click($(product));
      if (this.continueShoppingLink.isDisplayed()) {
        i += 1;
        navigationPage.clickOnMenOuterLink();
      }

      const oneSizeProduct = this.isOneSizeButtonExist();
      if (oneSizeProduct === true) {
        this.clickWishlistBtn();
        notification.getNotificationText();
        checkoutPage.closeAllNotification();
        numberOfProduct += 1;
      }
      // We have to use static wait here else it gives statle elements error and sometimes test get failed
      browser.pause(1000);
      prodSize = this.getAllSizes();
      for (let j = 0; j <= prodSize.length - 1; j += 1) {
        this.addSize(prodSize[j]);
        // We have to use static wait here as all the elements in DOM are available and dynamic wait doesn't work
        // to sync with all actions happening at a time we need static wait
        browser.pause(1000);
        this.clickWishlistBtn();
        notification.getNotificationText();
        checkoutPage.closeAllNotification();
        numberOfProduct += 1;

        if (numberOfProduct === wishlistTestData.WishListProductLimit) {
          i = numberOfProduct;
          break;
        }
      }
      navigationPage.clickOnMenOuterLink();
    }
    logger.info(
      'Total number of Products added from PDP to Wishlist :' + numberOfProduct,
    );
    return numberOfProduct;
  }

  getProdSKU(): string {
    const prodSKU = helpers.getText(this.productSKU);
    return prodSKU;
  }

  /**
   * This function will fetch price/price's of Sale/Non-Sale product and will return an array.
   * the prices with decimals are considered if the decimals are not 0.
   * @returns arrayOfPrices
   */
  getBothSaleProductPrices(): void {
    const prices: any = [];
    const bothPrices = this.bothSaleProductPrices;
    for (let index = 0; index < bothPrices.length; index += 1) {
      const element: any = bothPrices[index];
      const pr: string = element.getText().trim().substr(1).split(' ');
      prices.push(parseFloat(parseFloat(pr[0]).toFixed(2)));
    }
    return prices;
  }

  // This function is used to add number of products to wishlist, just need to pass number how much product want to add
  addNumberProductToWishList(numberOfProductsTobeAdded: number): number {
    let prodSize: any = [];
    let numberOfProduct = 0;
    for (let i = 1; i <= numberOfProductsTobeAdded; i += 1) {
      const product = 'div.browsing-product-list>figure:nth-child(' + [i] + ')';
      helpers.click($(product));
      // static wait added to wait size dropdown get loaded with all available sizes else  sometimes it doesnot select size
      browser.pause(1000);
      if (this.continueShoppingLink.isDisplayed()) {
        i += 1;
        navigationPage.clickOnWomenOuterLink();
      }

      const oneSizeProduct = this.isOneSizeButtonExist();
      if (oneSizeProduct === true) {
        this.clickWishlistBtn();
        notification.getNotificationText();
        checkoutPage.closeAllNotification();
        numberOfProduct += 1;
      }
      // We have to use static wait here else it gives statle elements error and sometimes test get failed
      browser.pause(1000);
      prodSize = this.getAllSizes();
      for (let j = 0; j <= prodSize.length - 1; j += 1) {
        this.addSize(prodSize[j]);
        // We have to use static wait here as all the elements in DOM are available and dynamic wait doesn't work
        // to sync with all actions happening at a time we need static wait
        browser.pause(1000);
        this.clickWishlistBtn();
        notification.getNotificationText();
        checkoutPage.closeAllNotification();
        numberOfProduct += 1;

        if (
          numberOfProduct === numberOfProductsTobeAdded ||
          numberOfProduct === wishlistTestData.WishListProductLimit
        ) {
          i = numberOfProduct;
          break;
        }
      }
      navigationPage.clickOnWomenOuterLink();
    }
    logger.info(
      'Total number of Products added from PDP to Wishlist :' + numberOfProduct,
    );
    return numberOfProduct;
  }

  getTextName(): string {
    return helpers.getText(this.brandName);
  }

  checkRelatedBrandName(): boolean {
    if (this.relatedName.isClickable() && this.relatedName.isDisplayed()) {
      return true;
    }
    return false;
  }

  viewAllButtonName(): boolean {
    if (this.viewName.isClickable() && this.viewName.isDisplayed()) {
      return true;
    }
    return false;
  }

  clickViewAllBtn(): void {
    helpers.click(this.viewName);
  }

  /**
   * Returns PDP Product ID.
   */
  getProductId(): any {
    const productLnk: any = this.extractProductid.getAttribute('href');
    const productId: any = productLnk.trim().split('/');
    return productId[productId.length - 1];
  }

  checkProductDesc(): boolean {
    if (
      this.productDesc.isExisting() ||
      this.productDesc.isDisplayed() ||
      !this.productDesc.isClickable
    ) {
      return true;
    }
    return false;
  }

  //  This function performs the scroll down/up action using the element locator vlaue.
  //  And validates the product desc and CTA container is present on UI or not.
  //  If element present on UI returns the true else false
  scrollUsingCssAndValidateElementIsDisplayed(locator: Element): boolean {
    let result = false;
    locator.scrollIntoView();
    if (
      this.productDescContainer.isDisplayed() &&
      this.productCTAContainer.isDisplayed()
    ) {
      result = true;
    }
    return result;
  }

  // This function iterates over the lazy load images using for loop.
  // and validate the  presence of element by calling the scrollUsingCssAndValidateElementIsDisplayed();
  // And returns the result true/false.
  validateProductDescAndAddToBagIsDisplayedAfterScrollDownUP(): boolean {
    let result = false;
    for (
      let index = 1;
      index <= this.productDescImageLazyLoadedImage.length;
      index += 1
    ) {
      const tempLocator: Element = $(
        ' div:nth-child(' + index + ') > div > picture > img',
      );
      result = this.scrollUsingCssAndValidateElementIsDisplayed(tempLocator);
    }
    logger.info(
      'Presence of product description and add bag container after scroll down is : ' +
        result,
    );
    for (
      let index = this.productDescImageLazyLoadedImage.length - 1;
      index >= 1;
      index -= 1
    ) {
      const tempLocator: Element = $(
        ' div:nth-child(' + index + ') > div > picture > img',
      );

      result = this.scrollUsingCssAndValidateElementIsDisplayed(tempLocator);
    }
    logger.info(
      'Presence of product description and add bag container after scroll up is : ' +
        result,
    );
    return result;
  }

  // This function will get product decsription
  getProductDesc(): string {
    const prodInfo = helpers.getText(this.productDesc);
    const description = prodInfo.replace(/\n|\r|br/g, '');
    return description;
  }

  checkProductName(): boolean {
    if (
      this.productName.isExisting() ||
      this.productName.isDisplayed() ||
      !this.productName.isClickable
    ) {
      return true;
    }
    return false;
  }

  getProductName(): string {
    return helpers.getText(this.productName);
  }

  checkBrandName(): boolean {
    if (this.brandName.isClickable() && this.brandName.isDisplayed()) {
      return true;
    }
    return false;
  }

  clickBrandName(): any {
    helpers.click(this.brandName);
  }

  getOnerMoreBtnTxt(): string {
    return helpers.getText(this.addOneMoreBtn);
  }

  getAddToBagBtnTxt(): string {
    return helpers.getText(this.addToBagBtn);
  }

  getCheckoutBtnTxt(): string {
    return helpers.getText(this.checkoutBtn);
  }

  clickAddOneMoreBtn(): void {
    helpers.click(this.addOneMoreBtn);
  }

  /**
   *
   * @param controlType
   * @param dataToBeValidated
   */
  validatePdpContent(currentLang: string, dataToBeValidated: string): boolean {
    let status = false;
    switch (currentLang) {
      case 'ENGLISH':
        status = productDescriptionTestData.pdp_eng_translations.includes(
          dataToBeValidated,
        );
        break;
      case 'FRANÇAIS':
        status = productDescriptionTestData.pdp_french_translations.includes(
          dataToBeValidated,
        );
        break;
      case '日本語':
        status = productDescriptionTestData.pdp_japanese_translations.includes(
          dataToBeValidated,
        );
        break;
      case '中文':
        status = productDescriptionTestData.pdp_chinese_translations.includes(
          dataToBeValidated,
        );
        break;
      default:
        logger.info(' Incorrect data to be validated');
        break;
    }
    return status;
  }

  // This function returns the all the sold out sizes from the select size drop down.
  getsoldOutAllSizes(): any {
    const allsoldOutProductSize: any = [];
    let retSize: any;
    const allSize = this.allSizes;

    for (let index = 0; index < allSize.length; index += 1) {
      const element = allSize[index];
      if (element.getText().includes('Sold Out')) {
        retSize = element.getText().trim();
        allsoldOutProductSize.push(retSize);
      }
    }
    return allsoldOutProductSize;
  }

  // This function validates the soldout sizes are disabled or not
  // If disabled then returns the true else false.
  validateSoldOutOptionsIsDisabled(): boolean {
    helpers.click(this.productSize);
    const allsoldOutProductSize: any = this.getsoldOutAllSizes();
    let result: boolean;
    for (let index = 0; index < allsoldOutProductSize.length; index += 1) {
      const attributeValue: string = $(
        "//select[@class='vspace2']//option[normalize-space()='" +
          allsoldOutProductSize[index] +
          "']",
      ).getAttribute('disabled');
      logger.info(
        'Sold out option : ' +
          allsoldOutProductSize[index] +
          ' is Disabled/Greyed out : ' +
          attributeValue,
      );
      if (attributeValue.localeCompare('disabled')) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  }

  checkSelectSize(): boolean {
    if (this.productSize.isClickable() && this.productSize.isDisplayed()) {
      return true;
    }
    return false;
  }

  // This function will return Array of All Sizes
  getSizeName(): any {
    const arrSizeOptions: any = [];
    for (let index = 0; index < this.AllSizeOptions.length; index += 1) {
      const optionSize: any = $(
        "//select[@class='vspace2']//option[" + (index + 1) + ']',
      )
        .getText()
        .trim();
      arrSizeOptions.push(optionSize);
    }
    return arrSizeOptions;
  }
}
export default new ProductDescriptionPage();
