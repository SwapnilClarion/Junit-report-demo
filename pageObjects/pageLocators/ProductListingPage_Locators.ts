import { Element, ElementArray } from '@wdio/sync';
export class productListingPageLocators {
  // Right Section
  get sortLink(): Element {
    return $(
      "//div[@class='span2 browsing-column browsing-right-column hidden-tablet-landscape']/div/nav[2]/div/a",
    );
  }

  get sortSubLinks(): ElementArray {
    return $$(
      "//div[@class='browsing-page-root browsing-section-container view']//div[@class='span2 " +
        "browsing-column browsing-right-column hidden-tablet-landscape']/div/nav[2]/div/div/ul/li/a",
    );
  }

  get firstProduct(): Element {
    return $('div.browsing-product-list>figure:nth-child(1)');
  }

  get activePriceLowToHigh(): Element {
    return $(
      '#wrap > div > div.span2.browsing-column.browsing-right-column.hidden-tablet-landscape > div > ' +
        'nav:nth-child(2) > div > div > ul > li.active > a',
    );
  }

  get oneSizeProduct(): Element {
    return $('div.browsing-product-list>figure:nth-child(2)');
  }

  // Sale Page Locators
  get allProductsList(): ElementArray {
    return $$(
      'div.browsing-product-content > div.browsing-product-list > figure',
    );
  }

  get noProductsAvailableTxt(): Element {
    return $(
      '#wrap > div > div.span12.browsing-column.browsing-center-column.tablet-landscape-full-fluid-width > ' +
        ' section > div:nth-child(2) > div > div > div.span16 > p',
    );
  }

  get firstSaleProductPrice(): Element {
    return $(
      'div.browsing-product-content > div > figure:nth-child(1) > div > p > span.price.sale',
    );
  }

  get firstProductPrice(): Element {
    return $(
      'div.browsing-product-content > div > figure:nth-child(1) > div > p.price > span.price',
    );
  }

  get bothSaleProductPrices(): ElementArray {
    return $$(
      'div.browsing-product-content > div > figure:nth-child(1) > div > p.price>span.price',
    );
  }

  // ====================================================================================================
  get secondProduct(): Element {
    return $('div.browsing-product-list>figure:nth-child(2)');
  }

  get firstProductId(): Element {
    return $('div.browsing-product-list>figure:nth-child(1)>a');
  }

  get allNonSaleProductPrice(): ElementArray {
    return $$(
      '(//figure[@class="browsing-product-item"]/*/p[not(span[@class="price sale"])])',
    );
  }

  get brandTitle(): Element {
    return $('#listing-title');
  }

  get allSaleProductsPrice(): ElementArray {
    return $$(
      '(//figure[@class="browsing-product-item"]/*/p[(span[@class="price sale"])]//following-sibling::span)',
    );
  }

  get thirdProduct(): Element {
    return $(
      '#wrap > div > div.span12.browsing-column.browsing-center-column.tablet-landscape-full-fluid-width >' +
        ' section > div.browsing-product-content > div > figure:nth-child(3) > a ',
    );
  }

  get selectBrandCategory(): Element {
    return $('#designer-list > li:nth-child(282) > a > span');
  }

  get soldOutProduct(): Element {
    return $(
      'div > figure:nth-child(4) > a > div.image-container > picture > img',
    );
  }
}
