import { wishListPageLocators } from './pageLocators/WishListPage_Locators';
import helpers from '../utils/helpers';
export class WishListPage extends wishListPageLocators {
  // ======================================================================================================
  getWishlistHeading(): string {
    return helpers.getText(this.WishListHeading);
  }

  getProductNameOnWishList(): string {
    return helpers.getText(this.productNameOnWishlist);
  }

  extractProdUrlOnWishList(): string {
    return helpers.getAttribute(this.extractProductURL, 'href');
  }

  getContainerSize(): number {
    const size = this.wishlistContainer.length;
    return size;
  }

  removeWishListProduct(): void {
    const NumberOfProduct = this.getContainerSize();
    for (let i = 1; i <= NumberOfProduct; i += 1) {
      const product =
        'div.browsing-product-list > figure:nth-child(' +
        [i] +
        ') > div > div > form:nth-child(2) > div > div > button > span.button-label';

      helpers.click($(product));
    }
  }

  /**
   * Returns an array of prices of Sale/Non-Sale products from Wishlist.
   * @returns arrayOfPrices
   */
  getAllProductPrice(): any {
    const prices: any = [];
    const bothPrices: any = this.bothFirstProductPrice;
    for (let index = 0; index < bothPrices.length; index += 1) {
      const element: any = bothPrices[index];
      const pr: string = element.getText().trim().substr(1).split(' ');
      prices.push(parseFloat(parseFloat(pr[0]).toFixed(2)));
    }
    return prices;
  }

  /**
   * Adds product to Shopping Bag
   */
  clickAddToBagBtn(): void {
    helpers.click(this.addToBagBtn);
  }

  /**
   * Redirects to Shopping Bag
   */
  clickwishlistCheckoutBtn(): void {
    helpers.click(this.wishlistCheckoutBtn);
  }

  isAddToBagOnWishlistDisplayed(): boolean {
    if (
      this.addToBagOnWishlist.isExisting() &&
      this.addToBagOnWishlist.isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  getAddToBagButtonText(): string {
    return helpers.getText(this.addToBagOnWishlist);
  }

  isRemoveLinkDisplayed(): boolean {
    if (
      this.removeProductLinkOnWishlist.isExisting() &&
      this.removeProductLinkOnWishlist.isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  getRemoveLinkText(): string {
    return helpers.getText(this.removeProductLinkOnWishlist);
  }

  isCheckoutButtonDisplayed(): boolean {
    if (
      this.checkoutButtonOnWishlist.isExisting() &&
      this.checkoutButtonOnWishlist.isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  getCheckoutButtonText(): string {
    return helpers.getText(this.checkoutButtonOnWishlist);
  }

  getMovedToBagText(): string {
    return helpers.getText(this.movedToBagText);
  }

  clickAddToBagButton(): void {
    helpers.click(this.addToBagOnWishlist);
  }

  getEmptyWishlistText(): string {
    return helpers.getText(this.emptyWishListText);
  }

  clickWishListImageBtn(): void {
    helpers.click(this.wishListImage);
  }
}
export default new WishListPage();
