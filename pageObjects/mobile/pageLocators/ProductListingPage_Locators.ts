import { Element } from '@wdio/sync';
export class productListingPageLocators {
  get mobileFirstProduct(): Element {
    return $(
      '#wrap > div > div.span12.browsing-column.browsing-center-column.tablet-landscape-full-fluid-width > section >' +
        'div.browsing-product-content > div.browsing-product-list > figure:nth-child(1) > a',
    );
  }

  get mobileSecondProduct(): Element {
    return $(
      '#wrap > div > div.span12.browsing-column.browsing-center-column.tablet-landscape-full-fluid-width > section >' +
        'div.browsing-product-content > div.browsing-product-list > figure:nth-child(2) > a',
    );
  }

  get firstProductHeading(): Element {
    return $(
      'div.browsing-product-list > figure:nth-child(1) > ' +
        'a > div.browsing-product-description.text-center.vspace1 > p.bold',
    );
  }

  get brandPlpPageHeading(): Element {
    return $('#listing-title');
  }

  get mobileFourthProduct(): Element {
    return $(
      'div.browsing-product-content > div.browsing-product-list > figure:nth-child(4)>a',
    );
  }

  // One Size product
  get oneSizeProduct(): Element {
    return $(
      'div.browsing-product-content > div.browsing-product-list > figure:nth-child(3) > a',
    );
  }
}
