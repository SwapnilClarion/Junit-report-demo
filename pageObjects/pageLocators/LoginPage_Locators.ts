import { Element } from '@wdio/sync';

export class loginPageLocators {
  get loginLink(): Element {
    return $('a=login');
  }

  // Locators for login
  get userNameInput(): Element {
    return $('input#login-form-email');
  }

  get userPasswordInput(): Element {
    return $('input#login-form-password');
  }

  get loginButton(): Element {
    return $('#submitLogin');
  }

  get loginHeading(): Element {
    return $('form.login>div>div:nth-child(1) > h1');
  }

  get notificationWishList(): Element {
    return $('div.notification-message-container>span>span>span');
  }

  // Locators for signup
  get registerEmailInput(): Element {
    return $('#register-form-email-address');
  }

  get registerPasswordInput(): Element {
    return $('#password');
  }

  get notificationMsg(): Element {
    return $(
      '#app > div.body-wrapper > div.notification-manager-container > span > div > div > span > span > span',
    );
  }

  get signUpHeading(): Element {
    return $('form.register>div>div:nth-child(1) > h1');
  }

  // Select Category (Genders while signup)
  get mensPromoRadioBtn(): Element {
    return $('#select_gender_men_form');
  }

  get womensPromoRadioBtn(): Element {
    return $('#select_gender_women_form');
  }

  get noThanksPromoRadioBtn(): Element {
    return $('#select_no_thanks_form');
  }

  get createAccBtn(): Element {
    return $('#submitRegister');
  }
}
