import { Element, ElementArray } from '@wdio/sync';
export class wishListPageLocators {
  get WishListHeading(): Element {
    return $(`header > div > h1`);
  }

  get productNameOnWishlist(): Element {
    return $('div>p.product-name-plp');
  }

  get extractProductURL(): Element {
    return $('div > figure > a');
  }

  get wishlistContainer(): ElementArray {
    return $$('div.browsing-product-list>figure');
  }

  get bothFirstProductPrice(): ElementArray {
    return $$(
      'div.browsing-product-list > figure >div.wishlist-container >p >span.price',
    );
  }

  get addToBagBtn(): Element {
    return $(
      'div.add-to-bag-form.wishlist-cta > form#addBagForm > div > button > span.button-label',
    );
  }

  get wishlistCheckoutBtn(): Element {
    return $(
      'div.browsing-product-list > figure.browsing-product-item > div.wishlist-container >' +
        ' div > div.wishlist-cta-button.span16.vspace1.btn-checkout > a.button',
    );
  }

  get addToBagOnWishlist(): Element {
    return $('#addBagForm > div > button > span.button-label');
  }

  get removeProductLinkOnWishlist(): Element {
    return $(
      '#wishlist-container > div:nth-child(3) > div > div >figure > div > div > form:nth-child(2) > div > div > button > span.button-label',
    );
  }

  get checkoutButtonOnWishlist(): Element {
    return $(
      '#wishlist-container > div:nth-child(3) > div > div > figure > div > div > div > a',
    );
  }

  get movedToBagText(): Element {
    return $(
      '#wishlist-container > div:nth-child(3) > div > div > figure > div > div > form > div > div > button',
    );
  }

  get emptyWishListText(): Element {
    return $(
      'div.span10.offset3.text-center.smartphone-landscape-full-fluid-width > p',
    );
  }

  get wishListImage(): Element {
    return $('div.image-container > picture > img');
  }
}
