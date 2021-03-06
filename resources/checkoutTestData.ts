import { randomData } from '../utils/random_data';
export const checkoutTestData = {
  CARD_NUMBER: '5105105105105100', // '4111111111111111',
  EXPIRY_MONTH: '02',
  EXPIRY_YEAR: '2025',
  CARD_HOLDER_NAME: 'Riddhi Naik',
  SECURITY_CODE: '123',
  TEST_DATA_8: '191451M193019',
  CREDIT_CARD: 'credit',
  ALIPAY: 'alipay',
  PAYPAL: 'paypal',
  COUNTRY: 'Canada',
  STATE: 'Québec',
  CITY_NAME: 'Montreal',
  Paypal_Method_Type: 'paypal',
  PP_Username: 'utest@ssense.com',
  PP_Password: 'utest123',
  CheckoutPageLoadingMessage: 'Checkout Page is not loaded yet',
  CheckoutPageTitle: 'Checkout | SSENSE Canada',
  FIRST_NAME: 'Riddhi',
  LAST_NAME: 'Naik',
  STREET_ADDRESS: '3123  Doctors Drive',
  CITY: 'Los Angeles',
  ZIP_CODE: 'J4R 3J9',
  PHONE_NUMBER: '310-341-3203',
  alipay_payment_method: 'alipay',
  CREDIT_CARD_PAYMENT_METHOD: 'credit',
  billingAddressFields: [
    randomData.BILLING_FIRSTNAME,
    randomData.BILLING_LASTNAME,
    randomData.BILLING_STREETADDR,
    randomData.BILLING_COMPANY_NAME,
    randomData.ADDRESS_COUNTRY,
    randomData.ADDRESS_STATE,
    randomData.BILLING_CITY,
    randomData.BILLING_ZIPCODE,
    randomData.ADDRESS_PHONE,
  ],
  useAsBillingLabelOnCheckout: [
    'Use as billing address',
    'Utiliser cette adresse pour la facturation',
    '請求先住所に設定',
    '设置为账单地址',
  ],
  useAsBillingLabelTextError:
    'FAILED: Text for useAsBilling label is not matching for the selected language',
  useOtherAddressLinkTextOnCheckout: [
    'Use Other Address +',
    "Changer d'adresse +",
    '他の住所を使う +',
    '使用其他地址 +',
  ],
  useAsOtherAddressLinkTextError:
    'FAILED: Text for Use other Address link is not matching for the selected language',
  OrderTotalAlert:
    'Your order total has changed to reflect the import duties of your new destination. Please check your Order Summary for details.',
  CreditCardFrame: 'ccframe',
  GMAIL_URL: 'https://mail.google.com/mail/',
  GMAIL_SIGNIN_TXT: 'Sign in',
  GMAIL_INBOX_URL: 'https://mail.google.com/mail/u/0/#inbox',
  GMAIL_EMAIL: 'autowebdriverio@gmail.com',
  GMAIL_PASSWORD: 'AKtest12345',
  GMAIL_NO_MESSAGE: 'No messages matched your search',
  shippingAddressFields: [
    randomData.SHIPPING_FIRSTNAME,
    randomData.SHIPPING_LASTNAME,
    randomData.SHIPPING_STREETADDR,
    randomData.SHIPPING_COMPANY_NAME,
    randomData.ADDRESS_COUNTRY,
    randomData.ADDRESS_STATE,
    randomData.SHIPPING_CITY,
    randomData.SHIPPING_ZIPCODE,
    randomData.ADDRESS_PHONE,
  ],
  ALIPAY_COUNTRY: 'China',
  ALIPAY_STATE: 'Gansu',
  ALIPAY_CITY_NAME: 'Beijing',
};
