import { Element, ElementArray } from '@wdio/sync';
export class shoppingBagPageLocators {
  get userEmailInput(): Element {
    return $('#authentication-form-email');
  }

  get userPasswordInput(): Element {
    return $('input[name="password"]');
  }

  get submitLoginBtn(): Element {
    return $('button[id="submitLogin"]');
  }

  get productRemoveIcon(): ElementArray {
    return $$("//i[@class='fa fa-small-close']");
  }

  get forgotPasswordLnk(): Element {
    return $(
      "//div[@class='span16 vspace1 smartphone-landscape-full-fluid-width']/a",
    );
  }

  get emailCheckoutBtn(): Element {
    return $('#submitLogin');
  }

  get proceedToCheckoutOnShoppingBag(): Element {
    return $(
      '#wrap > div > div > div.span8.tablet-portrait-full-fluid-width.hidden-tablet-portrait > div > div.span16.vspace3.text-center > a',
    );
  }

  get proceedToCheckoutBtn(): Element {
    return $('#submitLogin');
  }

  get numberShoppingBagProduct(): Element {
    return $('#header-shopping-bag');
  }

  get moveToWishlistLink(): Element {
    return $('div.span7.shopping-item-description > a.move-wishlist-item');
  }

  get shoppingBagHeading(): Element {
    return $(
      'div.span8.shopping-list-container.tablet-portrait-full-fluid-width > div >' +
        'div:nth-child(1) > h4',
    );
  }

  get extractProductUrl(): Element {
    return $('div.span7.shopping-item-description > a:nth-child(2)');
  }

  get emptyShoppingBagText(): Element {
    return $('#wrap > div > div > div > div:nth-child(1)');
  }

  get shopForMenBtn(): Element {
    return $(
      '#wrap > div > div > div > div.vspace2 > a.button.button-primary.smartphone-landscape-full-width.men',
    );
  }

  // Shopping Carts
  get productsList(): ElementArray {
    return $$(
      '#wrap > div > div > div.span8.shopping-list-container.tablet-portrait-full-fluid-width >' +
        'div > div:nth-child(2) > div > ul > li.list-item > div > div.span7.shopping-item-description',
    );
  }

  get removeItemBtn(): ElementArray {
    return $$('span.remove-icon.hidden-tablet-between >i.fa.fa-small-close');
  }

  // --------------------
  get notYourEmail(): Element {
    return $('//a[@class="underlined not-my-email underlinespace graycolor"]');
  }

  get alreadyMember(): Element {
    return $('div > div:nth-child(4) > a');
  }

  get resetPassword(): Element {
    return $(
      'div > div.span16.text-center.vspace2 > button > span.button-label',
    );
  }

  get passwordInput(): Element {
    return $('#password');
  }

  get userEmailInputDisabled(): Element {
    return $('#login-form-email');
  }

  get forgotpasswordtext(): Element {
    return $('div > h1');
  }

  get forgotpasswordemail(): Element {
    return $('#forgot-password-email');
  }

  get forgotPassLnk(): Element {
    return $(
      '//*[@id="wrap"]/div/div/div[2]/div/div/div/div/div/div/div/form/div/div[6]/a',
    );
  }

  get firstProductPrices(): ElementArray {
    return $$(
      'div.table > ul > li.list-item > ' +
        'div.row-fluid.row-table.shopping-item > div.span4.text-right.price-column > span.price',
    );
  }

  get allProductPrices(): ElementArray {
    return $$('//span[@class="price"]');
  }

  get notYourAccount(): Element {
    return $('//a[@class="underlined logout"]');
  }

  get displayedEmail(): Element {
    return $('//div[@class="email"]');
  }

  get checkPriceFirstProduct(): Element {
    return $('(//span[@class="price"])[1]');
  }

  get checkPriceSecondProduct(): Element {
    return $('(//span[@class="price"])[2]');
  }

  get orderTotalPrice(): Element {
    return $(
      '//*[@id="wrap"]/div/div/div[1]/div/div[2]/div/div[2]/div/div[1]/span[3]',
    );
  }

  get footerCountry(): Element {
    return $('#footer-country');
  }

  get countryLink(): Element {
    return $('#footer-country-select > div > ul > li:nth-child(1) > a');
  }

  get enterCountry(): Element {
    return $('//input[@placeholder="SEARCH COUNTRY/REGION"]');
  }

  get brandName(): Element {
    return $('a.underline > b');
  }

  get productDescription(): Element {
    return $('div > div.span7.shopping-item-description > a:nth-child(2)');
  }

  get productSize(): Element {
    return $('div > div.span7.shopping-item-description > a:nth-child(3)');
  }

  get productCode(): Element {
    return $(
      '//*[@id="wrap"]/div/div/div[1]/div/div[2]/div/ul/li/div/div[2]/a[4]',
    );
  }
}
