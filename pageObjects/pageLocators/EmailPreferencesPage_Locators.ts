import { Element, ElementArray } from '@wdio/sync';
export class emailPrefrencesPageLocators {
  /**
   * ============================ Locators==============================
   */

  // NewsLetter Preferences
  get newsSubscriptionPrefRadio(): ElementArray {
    return $$("//input[@type='radio' and @name='unsubscribed_newsletter']");
  }

  // Language Selection
  get languageSelect(): Element {
    return $("select[id='email-preferences-language]");
  }

  // Country Selection
  get countrySelect(): Element {
    return $("select[id='email-preferences-country']");
  }

  // Notifications
  get notificationRadio(): ElementArray {
    return $$("//input[@name='unsubscribed_remarketing']");
  }

  get saveChangesBtn(): Element {
    return $(
      '#wrap > div > div > div.span10.content > div > div > form > div.span16.text-center.vspace2 > button',
    );
  }
}
