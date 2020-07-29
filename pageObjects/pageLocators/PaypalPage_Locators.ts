import { Element } from '@wdio/sync';
export class paypalPageLocators {
  /** *
   *  ------------------------------------Paypal Locators------------------------------------
   */

  get loginBtn(): Element {
    return $(
      '#loginSection > div > div.span11.alignRight.baslLoginButtonContainer > a',
    );
  }

  /** *
   *  ------------------------------------Pay with Paypal Login Page Locators------------------------------------
   */
  get loginEmailInput(): Element {
    return $('#email');
  }

  get loginPasswordInput(): Element {
    return $('#password');
  }

  get payPalNextBtn(): Element {
    return $('button[id="btnNext"]');
  }

  get loginRemeberMeCheckBox(): Element {
    return $('#keepMeLoggedIn');
  }

  get loginLoginBtn(): Element {
    return $('#btnLogin');
  }

  get loginForgotLnk(): Element {
    return $('#content > div.forgotLink > a');
  }

  get loginCancelAndReturnLnk(): Element {
    return $('#cancelLink');
  }

  /**
   * ----------------------------------------------Paypal Checkout Page Locators-----------------------------------------
   */
  get checkoutPayWithVisaRadioBtn(): Element {
    return $('#CC-MFVMLB2BJ7AR4-funding-option');
  }

  get checkoutPayWithCreditUnionRadioBtn(): Element {
    return $('#BA-E636Z6SZTHBK4-funding-option');
  }

  get checkoutPaymentContinueBtn(): Element {
    return $("button[name='payment-submit-btn']");
  }

  get checkoutCancelAndReturnLnk1(): Element {
    return $('#root > div > div > main > div.CancelLink_container_27tB8 > a');
  }
  /**
   * ----------------------------------------------Methods-----------------------------------------
   */
}
