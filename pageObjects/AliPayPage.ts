import { aliPayLocators } from './pageLocators/AliPayPage_Locators';
import helpers from '../utils/helpers';
import { randomData } from '../utils/random_data';

export class AliPay extends aliPayLocators {
  enterUsername(username: string): void {
    helpers.setValue(this.usernameInput, username);
  }

  enterPassword(password: string): void {
    helpers.setValue(this.passwordInput, password);
  }

  clickLoginBtn(): void {
    helpers.click(this.loginBtn);
  }

  selectPaymentFrom(index: number): void {
    helpers.select(this.PaymentFrom, index, 'byIndex');
  }

  clickMakePaymentBtn(): void {
    helpers.click(this.makePaymentBtn);
  }

  clickBackToSsense(): void {
    helpers.click(this.backToSsenseBtn);
  }
  // --------------------------------------------Functions------------------------------//

  /** *
   * This function is used for to carry out payment process using Alipay.
   */
  alipayPayment(): void {
    this.enterUsername(randomData.ALIPAY_USERNAME);
    this.enterPassword(randomData.ALIPAY_PASSWORD);

    this.clickLoginBtn();

    this.selectPaymentFrom(0);

    this.clickMakePaymentBtn();

    this.clickBackToSsense();
  }
}

export default new AliPay();
