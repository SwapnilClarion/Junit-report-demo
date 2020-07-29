import { Element, ElementArray } from '@wdio/sync';

export class navigationPageLocators {
  get logoutLink(): Element {
    return $('a=Logout');
  }

  get logoutSuccess(): Element {
    return $('span=Successfully logged out.');
  }

  get accountLink(): Element {
    return $('a=Account');
  }

  get searchLink(): Element {
    return $('a=search');
  }

  get searchInput(): Element {
    return $("input[name='search']");
  }

  get womenGenderLink(): Element {
    return $('div.search > div:nth-child(2) > div > ul > li:nth-child(2)');
  }

  get menGenderLink(): Element {
    return $('.genders=Men');
  }

  get menOuterLink(): Element {
    return $('a#men-link');
  }

  get womenOuterLink(): Element {
    return $('a#women-link');
  }

  get englishLink(): Element {
    return $('a=English');
  }

  get loginLink(): Element {
    return $('a=login');
  }

  get wishlistLink(): Element {
    return $('a=wishlist');
  }

  get shoppingbaglink(): Element {
    return $("//a[contains(text(),'shopping bag')]");
  }

  get langMenu(): Element {
    return $(
      "//ul[@class='nav hidden-tablet-landscape']/li//div[@class='popover-center']",
    );
  }

  get languagesList(): ElementArray {
    return $$('#language-menu-popover > ul > li');
  }

  // Left navigations
  get shoeCategoryLink(): Element {
    return $('#category-list > li:nth-child(5) > a');
  }

  get accessoryCategoryLink(): Element {
    return $('#category-list > li:nth-child(2) > a');
  }

  get socksCategoryLink(): Element {
    return $('#category-list > li:nth-child(2) > ul > li:nth-child(11) > a');
  }

  get socsHeading(): Element {
    return $('#listing-title');
  }

  get accessoryHeading(): Element {
    return $('//div/h1[contains(text(),"Accessories")]');
  }

  get accountActivate(): Element {
    return $('//h1[text()="Activate your account"]');
  }

  get feedbackUIMail(): Element {
    return $('//p[contains(text(),"@")]');
  }

  // Right navigations locators
  get priceLowToHigh(): Element {
    return $(
      '#wrap > div > div.span2.browsing-column.browsing-right-column.hidden-tablet-landscape >' +
        'div > nav:nth-child(2) > div > div > ul > li:nth-child(3) > a',
    );
  }

  // Languages
  get currentLanguage(): Element {
    return $(
      '#app > div.body-wrapper > header > div.container-fluid > div > nav.span7.header-nav.header-nav-right' +
        '> ul.nav.hidden-tablet-landscape > li:nth-child(1) > a.popover-hover-link',
    );
  }

  get languageLink(): Element {
    return $(
      'div.container-fluid > div > nav:nth-child(3) > ul:nth-child(1) > li:nth-child(1) > a',
    );
  }

  get loginLinkLang(): Element {
    return $('#login-link');
  }

  // Sale
  get saleLink(): Element {
    return $('a#sale-link');
  }

  //
  get orderHistoryLink(): Element {
    return $('a#account-menu-order-history-link');
  }

  // Address
  get addressLink(): Element {
    return $('#account-menu-addresses-link');
  }

  get ssenseLogo(): Element {
    return $(
      '#app > div.body-wrapper > header > div.container-fluid > div > div > a > img',
    );
  }

  get currentActiveLink(): ElementArray {
    return $$(
      'nav.span7.header-nav.header-nav-left>ul>li>a.router-link-active',
    );
  }

  get firstDesignerslink(): Element {
    return $('#designer-list > li:nth-child(2) > a > span');
  }
}
