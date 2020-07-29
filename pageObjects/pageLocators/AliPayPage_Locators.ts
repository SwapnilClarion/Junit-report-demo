import { Element } from '@wdio/sync';
export class aliPayLocators {
  get usernameInput(): Element {
    return $("input[name='username']");
  }

  get passwordInput(): Element {
    return $("input[name='password']");
  }

  get loginBtn(): Element {
    return $(
      '#col-transaction-payment > div > div.panel-body > div:nth-child(2) > div:nth-child(2) > button',
    );
  }

  get PaymentFrom(): Element {
    return $(
      '#col-transaction-payment > div > div.panel-body > div:nth-child(1) > div.form-row > div.col.col-input > select',
    );
  }

  get makePaymentBtn(): Element {
    return $(
      '#col-transaction-payment > div > div.panel-body > div:nth-child(2) > div:nth-child(2) > button',
    );
  }

  get backToSsenseBtn(): Element {
    return $(
      '#sim-container > div > div.container > div > div:nth-child(3) > button',
    );
  }

  get walletMethodHeading(): Element {
    return $('#headerw > div.top-section > h1');
  }
}
