import { productListingPageLocators } from './pageLocators/ProductListingPage_Locators';
import helpers from '../utils/helpers';
import navigationPage from './NavigationPage';
import { productListingTestData } from '../resources/productListingTestData';
import { logger } from '../config/winstonLogger';
export class ProductListingPage extends productListingPageLocators {
  // Right Section Methods
  clickSortLnk(): void {
    helpers.click(this.sortLink);
  }

  clickSortSubLinks(sortByLnk: string): void {
    this.sortSubLinks.forEach((element) => {
      if (element.getText() === sortByLnk) {
        element.click();
      }
    });
  }

  clickFirstProduct(): void {
    helpers.click(this.firstProduct);
  }

  clickOneSizeProduct(): void {
    helpers.click(this.oneSizeProduct);
  }

  // Sale
  getnoProductsAvailableTxt(): string {
    const labelTxt = helpers.getText(this.noProductsAvailableTxt);
    return labelTxt;
  }

  getfirstSaleProductPrice(): string {
    const price = helpers.getText(this.firstSaleProductPrice);
    return price;
  }

  getfirstProductPrice(): string {
    const price = helpers.getText(this.firstProductPrice);
    return price;
  }

  /**
   * Goes to PLP of sale or non-sale section of the particular gender preference.
   *
   * @param {String} gender
   * @param {boolean} goToSale
   */
  goToPlp(gender: string, goToSale: boolean): void {
    if (goToSale) {
      switch (gender) {
        case 'men':
          if (
            navigationPage.menOuterLink.getAttribute('class').includes('active')
          ) {
            navigationPage.clickSaleLink();
          } else {
            navigationPage.clickOnMenOuterLink();
            navigationPage.clickSaleLink();
          }
          break;
        case 'women':
          if (
            navigationPage.womenOuterLink
              .getAttribute('class')
              .includes('active')
          ) {
            navigationPage.clickSaleLink();
          } else {
            navigationPage.clickOnWomenOuterLink();
            // This static wait is required as the sale link saves preference
            // of previous gender selection, as by default men's is selected transition
            // to women section has to be first and then to sale section.
            browser.pause(1000);
            navigationPage.clickSaleLink();
          }
          break;
        default:
          break;
      }
    } else {
      switch (gender) {
        case 'men':
          navigationPage.clickOnMenOuterLink();
          break;
        case 'women':
          navigationPage.clickOnWomenOuterLink();
          break;
        default:
          break;
      }
    }
  }

  /**
   * Selects the first first : if products are available in sale PLP otherwise it
   * switches to PLP and clicks on the first product and goes to PDP.
   * @param {String} gender
   * @param {boolean} goToSale
   */
  selectFirstProduct(gender: string, goToSale: boolean): void {
    if (this.allProductsList.length <= 0) {
      this.goToPlp(gender, goToSale);
    }
    this.clickFirstProduct();
  }
  // Second Product
  //

  clickSecondProduct(): void {
    helpers.click(this.secondProduct);
  }

  /**
   * Selects the first Non-Sale product from PLP, and clicks on it .
   * Also returns the price of the product.
   */
  getNonSaleProducts(): any {
    let productPrice: any = '';
    for (let index = 0; index < this.allProductsList.length; index += 1) {
      const element = this.allProductsList[index];
      if (!element.$('p.price>span.price.sale').isExisting()) {
        const pr = element
          .$('p.price>span.price')
          .getText()
          .trim()
          .substr(1)
          .split(' ');
        productPrice = parseFloat(parseFloat(pr[0]).toFixed(2));
        element.click();
        break;
      }
    }
    return productPrice;
  }

  /**
   * Returns prices i.e sale price and discounted price of first Sale product.
   * @returns arrayOfPrices
   */
  getBothSaleProductPrices(): any {
    const prices: any = [];
    const bothPrices: any = this.bothSaleProductPrices;
    for (let index = 0; index < bothPrices.length; index += 1) {
      const element = bothPrices[index];
      const price: string = element.getText().trim().substr(1).split(' ');
      prices.push(parseFloat(parseFloat(price).toFixed(2)));
    }
    return prices;
  }

  /**
   * Returns the PLP's First Product ID.
   */
  getFirstProductId(): any {
    const productLnk: any = this.firstProductId.getAttribute('href');
    const productId: any = productLnk.trim().split('/');
    return productId[productId.length - 1];
  }

  // This function will store all the non sale product value in array and returns the same array.
  getAllNonSaleProductsPrice(): any {
    const arrayOfNonSaleProductPrice: any = [];
    for (
      let index = 0;
      index < this.allNonSaleProductPrice.length;
      index += 1
    ) {
      const saleProduct = $(
        "(//figure[@class='browsing-product-item']/*/p[not(span[@class='price sale'])])[" +
          (index + 1) +
          ']',
      );
      const nonSaleProductPrice = saleProduct.getText();
      arrayOfNonSaleProductPrice[index] = nonSaleProductPrice.replace(
        /\$/g,
        '',
      );
    }
    return arrayOfNonSaleProductPrice;
  }

  // This function compare the product values stored in array are in ascending order or not
  // If values are stored in ascending order then this function will return true else function will return false.
  validateLowToHighPLPListingOrder(arrayOfProductPrice: any[]): boolean {
    let result: boolean;
    if (arrayOfProductPrice.length >= 2) {
      for (let index = 0; index < arrayOfProductPrice.length - 1; index += 1) {
        if (
          parseFloat(arrayOfProductPrice[index]).toFixed(2) <=
          parseFloat(arrayOfProductPrice[1 + index]).toFixed(2)
        ) {
          result = true;
        } else {
          result = false;
        }
      }
    }
    return result;
  }
  // This function will navigate to the PLP and validate the values stored in array are in ascending order or not.

  navigateToPLPAndValidateLowToHighPLPListingOrder(): any {
    let arrayOfNonSalePrice: any = [];
    let result: any;
    for (
      let index = 0;
      index <= productListingTestData.ArrayPLPOptions.length - 1;
      index += 1
    ) {
      if (index <= 1) {
        this.goToPlp(
          productListingTestData.ArrayPLPOptions[index],
          productListingTestData.go_to_plp,
        );
      } else if (index === 2) {
        navigationPage.clickAccessoryCategoryLink();
      } else {
        navigationPage.clickOnFirstDesignerslink();
      }
      browser.waitUntil(() => {
        return navigationPage.priceLowToHigh.isExisting();
      }, 5000);
      navigationPage.clickPriceLowToHighLink();
      arrayOfNonSalePrice = this.getAllNonSaleProductsPrice();
      result = this.validateLowToHighPLPListingOrder(arrayOfNonSalePrice);
      logger.info('list of prices to be validated =', arrayOfNonSalePrice);
    }
    return result;
  }

  // This function will store all the  sale product value in array and returns the same array.
  getAllSaleProductsPrice(): any {
    const arrayOfSaleProductPrice: any = [];
    for (
      let index = 0;
      index < this.allSaleProductsPrice.length - 1;
      index += 1
    ) {
      const saleProduct: any = $(
        "(//figure[@class='browsing-product-item']/*/p[(span[@class='price sale'])]//following-sibling::span)[" +
          (index + 1) +
          ']',
      );
      const saleProductPrice: any = saleProduct.getText();
      arrayOfSaleProductPrice[index] = saleProductPrice.replace(/\$/g, '');
    }
    return arrayOfSaleProductPrice;
  }

  // This function will navigate to the Sale PLP and validate the values stored in array are in ascending order or not.
  navigateToPLPAndValidateLowToHighPLPListingOrderForSaleProduct(): boolean {
    let arrayOfSaleProductPrice: any = [];
    let result: boolean;
    for (
      let index = 0;
      index < productListingTestData.ArrayPLPOptions.length - 2;
      index += 1
    ) {
      if (navigationPage.isSaleLinkExist()) {
        this.goToPlp(
          productListingTestData.ArrayPLPOptions[index],
          productListingTestData.go_to_sale,
        );
        browser.waitUntil(() => {
          return navigationPage.priceLowToHigh.isExisting();
        }, 5000);
        navigationPage.clickPriceLowToHighLink();
        arrayOfSaleProductPrice = this.getAllSaleProductsPrice();
        logger.info(
          'list of prices to be validated = ',
          arrayOfSaleProductPrice,
        );
        result = this.validateLowToHighPLPListingOrder(arrayOfSaleProductPrice);
      }
    }
    return result;
  }
  // This function will check presence of Brand Title on brand PLP page

  checkBrandTitleText(): boolean {
    if (this.brandTitle.isExisting() && this.brandTitle.isDisplayed()) {
      return true;
    }
    return false;
  }

  getDisplayedBrandName(): string {
    return helpers.getText(this.brandTitle);
  }

  /**
   * Returns the array of sorting options present in PLP.
   * @returns{any[]}
   */
  getSortingLinks(): any {
    const sortLinks: any = this.sortSubLinks;
    const sortLinksTxt: any = [];
    for (let index = 0; index < sortLinks.length; index += 1) {
      const element: any = sortLinks[index];
      const lnkTxt: string = element.getText().trim();
      sortLinksTxt.push(lnkTxt);
    }
    return sortLinksTxt;
  }

  /**
   * This function returns boolean value after checking the sorting links on the PLP with thetest data.
   * It takes two arguments the language selected and the sorting options array.
   * @param language
   * @param sortLnkTxt
   * @returns {boolean}
   */
  checkSortingOptions(language: string, sortLnkTxt: any[]): boolean {
    let sortingOptions: any = [];
    let status = false;
    switch (language) {
      case 'ENGLISH':
        sortingOptions = productListingTestData.english_sortLnks;
        break;
      case 'FRANÇAIS':
        sortingOptions = productListingTestData.french_sortLnks;
        break;
      case '日本語':
        sortingOptions = productListingTestData.japanese_sortLnks;
        break;
      case '中文':
        sortingOptions = productListingTestData.chinese_sortLnks;
        break;
      default:
        break;
    }
    for (let index = 0; index < sortingOptions.length; index += 1) {
      if (sortingOptions.includes(sortLnkTxt[index])) {
        logger.info('Link Present  :  ' + sortLnkTxt[index]);
        status = true;
      }
    }
    return status;
  }

  clickOnThirdProduct(): void {
    helpers.click(this.thirdProduct);
  }

  clickOnBrandName(brandName: string): void {
    helpers.click($('=' + brandName));
  }

  clickBrandCategoryLink(): void {
    helpers.click(this.selectBrandCategory);
  }

  clickOnSoldOutProduct(): void {
    helpers.click(this.soldOutProduct);
  }
}

export default new ProductListingPage();
