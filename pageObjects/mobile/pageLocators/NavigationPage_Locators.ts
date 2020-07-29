import { Element, ElementArray } from '@wdio/sync';

export class navigationPageLocators {
  get mainMenu(): Element {
    return $(
      'div.container-fluid > div > nav.span7.header-nav.header-nav-left >ul.nav.mobile-navigation.display-block-tablet-landscape >' +
        'li.side-menu-toggle > a > i',
    );
  }

  get mobileMenLink(): Element {
    return $('#mobile-navigation > ul > li:nth-child(1) > span > a');
  }

  get mobileTrending(): Element {
    return $('#mobile-navigation > ul > li:nth-child(3) > span > a');
  }

  get mobileAccountLink(): Element {
    return $('#mobile-account-link');
  }

  get languageLnk(): Element {
    return $('#mobile-navigation > ul > li:nth-child(12) > span > a');
  }

  get availableLanguages(): ElementArray {
    return $$('#mobile-navigation > ul > li >span >a.menu-item');
  }

  get currentActiveLanguage(): Element {
    return $('#mobile-navigation > ul  > li >span.currently-selected>a');
  }

  get navigationbackBtn(): Element {
    return $('#mobile-navigation > ul > li:nth-child(1) > a');
  }

  get saleLink(): Element {
    return $('#mobile-navigation > ul > li:nth-child(5) > span > a');
  }

  get allMenSaleLnk(): Element {
    return $('#mobile-navigation > ul > li:nth-child(2) > span > a');
  }

  get changeLanguageLnkSecondLocator(): Element {
    return $('#mobile-navigation > ul > li:nth-child(11) > span > a');
  }

  get changeLanguageLnkThirdLocator(): Element {
    return $('#mobile-navigation > ul > li:nth-child(10) > span > a');
  }

  get englishLnk(): Element {
    return $(
      '//*[@id="mobile-navigation"]/ul/li/span//a[contains(.,"English")]',
    );
  }

  get frenchLnk(): Element {
    return $(
      '//*[@id="mobile-navigation"]/ul/li/span//a[contains(.,"Français")]',
    );
  }

  get japaneseLnk(): Element {
    return $(
      '//*[@id="mobile-navigation"]/ul/li/span//a[contains(.,"日本語")]',
    );
  }

  get chineseLnk(): Element {
    return $('//*[@id="mobile-navigation"]/ul/li/span//a[contains(.,"中文")]');
  }
}
