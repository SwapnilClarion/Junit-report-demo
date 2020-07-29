import { paypalPageLocators } from './pageLocators/PaypalPage_Locators';
import helpers from '../utils/helpers';
import { checkoutTestData } from '../resources/checkoutTestData';
export class PaypalPage extends paypalPageLocators {
  clickLoginBtn(): void {
    helpers.click(this.loginBtn);
  }

  enterLoginEmail(): void {
    helpers.setValue(this.loginEmailInput, checkoutTestData.PP_Username);
  }

  clickNextBtn(): void {
    helpers.click(this.payPalNextBtn);
  }

  enterLoginPassword(): void {
    helpers.setValue(this.loginPasswordInput, checkoutTestData.PP_Password);
  }

  clickRememberMeChkBox(): void {
    helpers.click(this.loginRemeberMeCheckBox);
  }

  clickPayPalLoginBtn(): void {
    helpers.click(this.loginLoginBtn);
  }

  clickForgotLink(): void {
    helpers.click(this.loginForgotLnk);
  }

  clickCancelAndReturnBtn(): void {
    helpers.click(this.loginCancelAndReturnLnk);
  }

  /**
   * ----------------------------------------------Paypal Checkout Page Methods-----------------------------------------
   */
  clickPayWithVisaRadioBtn(): void {
    helpers.click(this.checkoutPayWithVisaRadioBtn);
  }

  clickPayWithCreditUnionRadioBtn(): void {
    helpers.click(this.checkoutPayWithCreditUnionRadioBtn);
  }

  clickContinueBtn(): void {
    helpers.click(this.checkoutPaymentContinueBtn);
  }

  clickCancelAndReturnBtn1(): void {
    helpers.click(this.checkoutCancelAndReturnLnk1);
  }

  // clickCancelAndReturnBtn2() {
  //    helpers.click(this.checkoutCancelAndReturnLnk2);
  // }
}

export default new PaypalPage();
