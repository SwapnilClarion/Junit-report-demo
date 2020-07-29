import { Element, ElementArray } from '@wdio/sync';
export class productDescriptionPageLocators {
  get mobileAddToBag(): Element {
    return $(
      '#wrap > div > div > div.pdp__mobile--new.pdp__redesign > div > div.pdp-mobile >' +
        'div > div > div.s-row.pdp-header__right > div > div:nth-child(2) > div > div >' +
        'div:nth-child(1) > div > div.s-row > div > div:nth-child(1) > div.pdp-product-cta__atb-section > div > div > button',
    );
  }

  get mobileProductBrandName(): Element {
    return $(
      '#wrap > div > div > div.pdp__mobile--new.pdp__redesign > div >' +
        ' div.pdp-mobile > div > div > div.s-row.pdp-header__right > div > ' +
        'div:nth-child(1) > div > div > div.s-column.pdp-product-title__left > div:nth-child(1) > h1 > a',
    );
  }

  get mobileProductName(): Element {
    return $(
      '#wrap > div > div > div.pdp__mobile--new.pdp__redesign > ' +
        'div > div.pdp-mobile > div > div > div.s-row.pdp-header__right > div > div:nth-child(1) >' +
        ' div > div > div.s-column.pdp-product-title__left > div:nth-child(2) > h2',
    );
  }

  get mobileProductPrice(): Element {
    return $('div:nth-child(2) > div > div > div > h1');
  }

  get mobileProductDescription(): Element {
    return $(
      'div.s-row.pdp-header__right > div > div:nth-child(2) > div > div > div:nth-child(2) >' +
        'div > div > div > div > div:nth-child(2) > div > p:nth-child(2)',
    );
  }

  get mobileProductSKU(): Element {
    return $(
      'div:nth-child(2) > div > div > div:nth-child(2) > div > div > div > div > p',
    );
  }

  get LDJsonScriptData(): Element {
    return $('#wrap > div > div.pdp__mobile--new > div > script');
  }

  get productImageUrl(): Element {
    return $('#carousel-slide-6 > picture > img');
  }

  get productBrandNameAlign(): Element {
    return $(
      '#wrap > div > div > div.pdp__mobile--new.pdp__redesign > div >' +
        ' div.pdp-mobile > div > div > div.s-row.pdp-header__right > div > div:nth-child(1) >' +
        ' div > div > div.s-column.pdp-product-title__left',
    );
  }

  get productBrandNameCase(): Element {
    return $(
      '#wrap > div > div > div.pdp__mobile--new.pdp__redesign > div > div.pdp-mobile >' +
        ' div > div > div.s-row.pdp-header__right > div > div:nth-child(1) > div > div > ' +
        'div.s-column.pdp-product-title__left > div:nth-child(1) > h1',
    );
  }

  get hideViewLnk(): Element {
    return $(
      '#wrap > div > div.pdp__mobile--new > div > div:nth-child(2) > div > div.s-row.pdp-header__right >' +
        ' div > div:nth-child(2) > div > div > div.s-row.pdp-content__container--order-1 > div > div > div >' +
        ' div.pdp-product-description--toggle > span > a',
    );
  }

  get soldOutHeading(): Element {
    return $(
      '#wrap > div > div.pdp__mobile--new > div > div:nth-child(2) > div > div.s-row.pdp-header__right > div >' +
        ' div:nth-child(1) > div > div > div:nth-child(2) > div > div > div > h2',
    );
  }

  get productInfoSection(): Element {
    return $(
      '#wrap > div > div.pdp__mobile--new > div > div:nth-child(2) > div > div.s-row.pdp-header__right > div >' +
        ' div:nth-child(2) > div > div > div.s-row.pdp-content__container--order-1 > div > div > div > div:nth-child(2) >' +
        ' div:nth-child(2) > div > p:nth-child(2)',
    );
  }

  get addToBagButton(): Element {
    return $(
      '#wrap > div > div > div.pdp__mobile--new.pdp__redesign > div > div.pdp-mobile >' +
        'div > div > div.s-row.pdp-header__right > div > div:nth-child(2) > div > div >' +
        'div:nth-child(1) > div > div.s-row > div > div:nth-child(1) > div.pdp-product-cta__atb-section > div > div > button',
    );
  }

  get numberShoppingBagProduct(): Element {
    return $('#mobile-header-shopping-bag > span');
  }

  get newsLetterSectionSoldProduct(): Element {
    return $(' div.s-row.pdp-content__container--order-2 > div');
  }

  get hideDetailsLink(): Element {
    return $('=Hide details');
  }

  get continueShoppingButton(): Element {
    return $(' div > div.pdp-newsletter__continue-shopping-cta-section > a');
  }

  get addToWishlistButton(): Element {
    return $(
      '#wrap > div > div > div.pdp__mobile--new.pdp__redesign > div > div.pdp-mobile >' +
        'div > div >div.s-row.pdp-header__right > div > div:nth-child(2) > div > div >' +
        'div:nth-child(1) > div > div.s-row > div > div.pdp-product-cta__below-atb-section > div > div > div > button > span > span',
    );
  }

  get allSizes(): ElementArray {
    return $$(
      'div.s-row.pdp-header__right > div > div:nth-child(2) > div > div >' +
        'div:nth-child(1) > div > div.s-row > div > div:nth-child(1) > div:nth-child(2)>div>select#size>option',
    );
  }

  get productSize(): Element {
    return $(
      'div.s-row.pdp-header__right > div > div:nth-child(2) > div > div >' +
        'div:nth-child(1) > div > div.s-row > div > div:nth-child(1) > div:nth-child(2)>div>select#size',
    );
  }

  get proceedToCheckout(): Element {
    return $('div.pdp-product-cta__atb-section > div > div > a > span > span');
  }

  get addToBagNotification(): Element {
    return $('div.pdp-product-cta__below-atb-section > div > span');
  }

  get addToBagNotificationOneSize(): Element {
    return $('div.pdp-product-cta__below-atb-section > div > span');
  }

  get productInfo(): Element {
    return $(
      'div.s-row.pdp-header__right > div > div:nth-child(2) > div > div > div:nth-child(2) >' +
        'div > div > div > div > div:nth-child(2) > div > p.s-text.s-text--uppercase',
    );
  }
}
