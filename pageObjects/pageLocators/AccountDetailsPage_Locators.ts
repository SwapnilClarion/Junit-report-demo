import { Element } from '@wdio/sync';
export class accountDetailsPageLocators {
  get firstNameInput(): Element {
    return $('input[id="account-details-first-name"]');
  }

  get lastNameInput(): Element {
    return $('input[id="account-details-last-name"]');
  }

  get emailInput(): Element {
    return $('input[id="account-details-email"]');
  }

  get oldPasswordInput(): Element {
    return $('input[id="account-details-old-password"]');
  }

  get newPasswordInput(): Element {
    return $('input[id="password"] ');
  }

  get saveChangesBtn(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div > form > div.span16.text-center.vspace2 > button',
    );
  }

  get AccountDetailsHeading(): Element {
    return $('#wrap > div > div > div.span10.content > div > div > form > h1');
  }
}
