import { Element, ElementArray } from '@wdio/sync';
export class productDescriptionPageLocators {
  get allSizes(): ElementArray {
    return $$('select#size.vspace2>option');
  }

  get productSize(): Element {
    return $('select#size.vspace2');
  }

  get addToBagBtn(): Element {
    return $('form#addBagForm > div > button.btn-add-to-bag');
  }

  get oneSizeBtn(): Element {
    return $(
      '#product-item > div.product-item-container.row-fluid > div.span3.product-cta-container ' +
        '> div > div > div > div > div > div > div.add-to-bag-form > div.span16 ' +
        '> div > div.button.full-width.onesize',
    );
  }

  get checkoutBtn(): Element {
    return $(
      '#product-item > div.product-item-container.row-fluid > div.span3.product-cta-container > ' +
        ' div > div > div > div > div > div > div.add-to-bag-form > div.span16.vspace1.btn-checkout > a',
    );
  }

  get wishlistBtn(): Element {
    return $('.button.heart-icon');
  }

  get inputEmail(): Element {
    return $('#authentication-form-email');
  }

  get oneSizeButton(): Element {
    return $('div.span16 > div > div.button.full-width.onesize');
  }

  get inWishListButton(): Element {
    return $(
      'div.add-to-bag-form > div:nth-child(3) > form > div > div > button > span.button-label',
    );
  }

  get wishListNav(): Element {
    return $(
      'div > nav.span7.header-nav.header-nav-right > ul.nav.hidden-tablet-landscape > li:nth-child(3) > a',
    );
  }

  get productOnPDP(): Element {
    return $('div.product-description-container>div>h2');
  }

  get addToWishListButton(): Element {
    return $(
      'div.add-to-bag-form > div:nth-child(3) > form > div > button > span.button-label',
    );
  }

  get continueShoppingLink(): Element {
    return $('div.newsletter-signup > a');
  }

  get productSKU(): Element {
    return $(
      '#product-item > div.product-item-container.row-fluid >' +
        ' div.span3.offset1.product-item-description.tablet-landscape-full-fluid-width >' +
        ' div > div > div > div > div > div > div.content > span',
    );
  }

  // Prices
  get bothSaleProductPrices(): ElementArray {
    return $$('div.span16.price-container > h3 > span.price');
  }

  get brandName(): Element {
    return $('h1.product-brand > a');
  }

  get relatedName(): Element {
    return $(
      'span.tab-btn.active.smartphone-portrait-narrow-full-width > div > a > span:nth-child(1)',
    );
  }

  get viewName(): Element {
    return $(
      'div > div.tab-pane.span16.tab-content.vspace2.active > div.text-center.vspace3 > a',
    );
  }

  get extractProductid(): Element {
    return $(
      'div > nav.span7.header-nav.header-nav-right > ul.nav.hidden-tablet-landscape > li:nth-child(1) > a',
    );
  }

  get productDesc(): Element {
    return $('div.content > div > p > span:nth-child(1)');
  }

  get productDescContainer(): Element {
    return $('div.product-description-container');
  }

  get productCTAContainer(): Element {
    return $(
      '#product-item > div.product-item-container.row-fluid > div.span3.product-cta-container > div' +
        '> div > div > div > div > div',
    );
  }

  get productDescImageLazyLoadedImage(): ElementArray {
    return $$("img[class='product-detail lazyloaded']");
  }

  get productName(): Element {
    return $('div.content > h2');
  }

  get addOneMoreBtn(): Element {
    return $(
      '#addBagForm > div > button.button.full-width.btn-add-to-bag.button.full-width.no-border.button-primary>span',
    );
  }

  get subscribeButton(): Element {
    return $(
      'div.span3.product-cta-container div:nth-child(1) > form > div > div.span16.vspace1.submit-container.visible > button',
    );
  }

  get AllSizeOptions(): ElementArray {
    return $$('//select[@class="vspace2"]//option');
  }
}
