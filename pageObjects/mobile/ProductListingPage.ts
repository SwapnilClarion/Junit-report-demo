import { productListingPageLocators } from './pageLocators/ProductListingPage_Locators';
import helpers from '../../utils/helpers';
export class ProductListingPage extends productListingPageLocators {
  clickFirstProductMobileView(): void {
    helpers.click(this.mobileFirstProduct);
  }

  getFirstProductHeading(): string {
    return helpers.getText(this.firstProductHeading);
  }

  clickSecondProductMobileView(): void {
    helpers.click(this.mobileSecondProduct);
  }

  getBrandPlpPageHeading(): string {
    return helpers.getText(this.brandPlpPageHeading);
  }

  clickFourthProduct(): void {
    helpers.click(this.mobileFourthProduct);
  }

  // Click on one-size product
  clickOneSizeProductMobileView(): void {
    helpers.click(this.oneSizeProduct);
  }
}

export default new ProductListingPage();
