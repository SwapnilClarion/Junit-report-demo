import helpers from '../../utils/helpers';
import { Element } from '@wdio/sync';
class LoginPage {
  // Header Component Locators
  get loginHeader(): Element {
    return $('body > header > nav');
  }

  get linkHomePage(): Element {
    return $('body > header > nav > a > img');
  }

  // Login Component Locators
  get loginForm(): Element {
    return $('#login-box');
  }

  get labelErrorMessage(): Element {
    return $('#login-box');
  }

  get buttonCloseErrorMessage(): Element {
    return $('#login-box > div.alert.alert-danger.alert-dismissable > button');
  }

  get labelSignIn(): Element {
    return $('#login-box > div.header');
  }

  get textUserName(): Element {
    return $('#username');
  }

  get textPassword(): Element {
    return $('#password');
  }

  get buttonConnexion(): Element {
    return $('#connexion_btn');
  }

  /** -------------Locator Methods---------------- */
  getLabelSignIn(): string {
    const label: string = helpers.getText(this.labelSignIn);
    return label;
  }

  enterUsername(username: string): void {
    helpers.setValue(this.textUserName, username);
  }

  enterPassword(password: string): void {
    helpers.setValue(this.textPassword, password);
  }

  clickConnectionBtn(): void {
    helpers.click(this.buttonConnexion);
  }
}

export default new LoginPage();
