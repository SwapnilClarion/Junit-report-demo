import loginPage from '../../../pageObjects/hqm/LoginPage';
import loginMethod from '../../../methods/hqm/LoginMethod';
import homePage from '../../../pageObjects/hqm/HomePage';
import createNewOrderPage from '../../../pageObjects/hqm/CreateNewOrderPage';
import { createNewOrderPageAssertionData } from '../../../expectedResults/hqm/createNewOrderPageAssertionData';
import { loginPageAssertionData } from '../../../expectedResults/hqm/loginPageAssertionData';
import { homePageAssertionData } from '../../../expectedResults/hqm/homePageAssertionData';
import createNewOrderMethod from '../../../methods/hqm/createNewOrderMethod';
import { createNewOrderPageDataProvider } from '../../../resources/hqm/createNewOrderPageDataProvider';
import { randomData } from '../../../utils/random_data';
import { hqmTestData } from '../../../utils/hqmTestData';
import masterOrderPage from '../../../pageObjects/hqm/MasterOrderPage';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import shippingMethod from '../../../methods/hqm/shippingMethod';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Master Order Checkout USD - HQM - Order shipment flow', () => {
  it('Should login with valid credentials', () => {
    logger.info('URL === > ' + browser.getUrl());
    const title: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Title == ' + title);
    expect(title).to.be.equal(createNewOrderPageAssertionData.pageTitle);
    const labelSignIn: any = browser.waitUntil((): any => {
      return loginPage.getLabelSignIn();
    }, 5000);

    logger.info('SignIn Label = ' + labelSignIn);
    expect(labelSignIn).to.be.equal(loginPageAssertionData.labelSignIn);
    loginMethod.login();
  });
  it('Should click on create new order link in customer account section', () => {
    const customerLabel: any = browser.waitUntil((): any => {
      return homePage.getLabelCustomerSupportTxt();
    }, 5000);

    logger.info('Label Customer Support = ' + customerLabel);
    expect(customerLabel).to.be.equal(
      homePageAssertionData.labelCustomerSupport,
    );
    homePage.clickCreateNewOrder();
  });
  it('Should select shipping country and province from dropdown list', () => {
    const countryLabel: any = browser.waitUntil((): any => {
      return createNewOrderPage.getLabelShippingCountryTxt();
    }, 5000);

    logger.info(' Shipping Country Label =  ' + countryLabel);
    expect(countryLabel).to.be.equal(
      createNewOrderPageAssertionData.labelShippingCountry,
    );
    createNewOrderMethod.selectShippingCountry(
      createNewOrderPageDataProvider.shippingAddressNewYork.country,
      null,
    );
  });
  it('Should search a product with sku and add to cart', () => {
    const labelProducts: any = browser.waitUntil((): any => {
      return createNewOrderPage.getLabelProductsTxt();
    }, 5000);
    logger.info('LabelProducts = ' + labelProducts);
    expect(labelProducts).to.be.equal(
      createNewOrderPageAssertionData.labelProducts,
    );
    createNewOrderMethod.addProductToCart(
      createNewOrderPageDataProvider.product.sku,
    );
  });
  it('Should create new customer account', () => {
    const labelCustomer: any = browser.waitUntil((): any => {
      return createNewOrderPage.getLabelCustomerInfo();
    }, 5000);

    logger.info('Customer Info = ' + labelCustomer);
    expect(labelCustomer).to.be.equal(
      createNewOrderPageAssertionData.labelCustomerInfo,
    );
    createNewOrderMethod.createNewCustomer(
      randomData.GUEST_EMAIL,
      createNewOrderPageDataProvider.customerAccount.firstName,
      createNewOrderPageDataProvider.customerAccount.lastName,
    );
  });
  it('Should fill the shipping address', () => {
    const labelAddr: any = browser.waitUntil((): any => {
      return createNewOrderPage.getLabelAddressesTxt();
    }, 5000);
    logger.info('Labe Address = ' + labelAddr);
    expect(labelAddr).to.be.equal(
      createNewOrderPageAssertionData.labelAddresses,
    );
    createNewOrderMethod.fillShippingAddress(
      createNewOrderPageDataProvider.shippingAddressNewYork.company,
      createNewOrderPageDataProvider.shippingAddressNewYork.address,
      createNewOrderPageDataProvider.shippingAddressNewYork.city,
      createNewOrderPageDataProvider.shippingAddressNewYork.country,
      createNewOrderPageDataProvider.shippingAddressNewYork.province,
      createNewOrderPageDataProvider.shippingAddressNewYork.postalCode,
      createNewOrderPageDataProvider.shippingAddressNewYork.telephone,
    );
  });
  it('Should select shipping services method', () => {
    const labelShipping: any = browser.waitUntil((): any => {
      return createNewOrderPage.getLabelShippingServices();
    }, 5000);

    logger.info(' Shipping Service Label = ' + labelShipping);
    expect(labelShipping).to.be.equal(
      createNewOrderPageAssertionData.labelShippingServices,
    );
    createNewOrderMethod.selectShippingService();
  });
  it('Should click proceed payment button', () => {
    const labelOrderSummary: any = browser.waitUntil((): any => {
      return createNewOrderPage.getLabelOrderSummary();
    }, 5000);

    logger.info('Label Order Summary = ' + labelOrderSummary);
    expect(labelOrderSummary).to.be.equal(
      createNewOrderPageAssertionData.labelOrderSummary,
    );
    createNewOrderMethod.clickProceedPayment();
  });
  it('Should fill the payment information', () => {
    const title: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Title = ' + title);
    expect(title).to.be.equal(createNewOrderPageAssertionData.createOrderTitle);
    const labelPayment = browser.waitUntil((): any => {
      return createNewOrderPage.getLabelPayment();
    }, 5000);

    expect(labelPayment).to.be.equal(
      createNewOrderPageAssertionData.labelPayment,
    );
    createNewOrderMethod.fillPaymentInfo(
      createNewOrderPageDataProvider.payment.cardholdersName,
      createNewOrderPageDataProvider.payment.creditcardNumber,
      createNewOrderPageDataProvider.payment.cvv,
    );
  });
  it('Should click on transaction order number', () => {
    const Title: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Page Title = ' + Title);
    expect(Title).to.be.equal(createNewOrderPageAssertionData.createOrderTitle);
    const labelOrderConf: any = browser.waitUntil((): any => {
      return createNewOrderPage.getLabelOrderConfirmation();
    }, 5000);
    createNewOrderMethod.clickTransactionOrderNumber();
    expect(labelOrderConf).to.be.equal(
      createNewOrderPageAssertionData.labelOrderConfirmation,
    );
  });

  it('Should display shipping information', () => {
    const Title: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    expect(Title).to.be.equal(createNewOrderPageAssertionData.masterOrderTitle);

    const shippingPrice: any = browser.waitUntil((): any => {
      return masterOrderPage.getTextFieldShippingAmount();
    }, 5000);

    const shippingCurrency: any = browser.waitUntil((): any => {
      return masterOrderPage.getLabelShippingCurrency();
    }, 5000);

    const shipping: any = shippingMethod.getShippingMethod(
      masterOrderPage.LabelShipping,
    );
    logger.info('Shipping Methods == > ' + shipping.method);
    logger.info('Shipping Days == > ' + shipping.days);
    logger.info('Shipping Service == > ' + shipping.service);
    logger.info('Shipping Price == > ' + shippingPrice);

    expect(shippingCurrency).to.be.equal(hqmTestData.UScurrency);
    expect(shipping.method).to.be.length.gt(0);
    expect(shipping.days).to.be.gte(1);
    expect(shipping.service).to.be.length.gt(0);
    expect(parseFloat(shippingPrice)).to.be.gte(0);
  });

  it('Should display shipping options to edit', () => {
    const Title: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info(Title);
    createNewOrderMethod.openShippingServicesModal();
    const modalTitle: any = browser.waitUntil((): any => {
      return createNewOrderPage.getshippingModalTitle();
    }, 5000);
    logger.info('Modal Title == > ' + modalTitle);
    const shippingOptions: any = shippingMethod.getShippingMethodOptions(
      masterOrderPage.DropdownSelectShippingService,
    );
    logger.info(' ShippingOptions === > ' + shippingOptions.length);
    for (let index = 0; index < shippingOptions.length; index += 1) {
      logger.info(
        ' ShippingOptions Method === >' + shippingOptions[index].method,
      );
      logger.info('ShippingOptions Days === >' + shippingOptions[index].days);
      logger.info('ShippingOptions Price === >' + shippingOptions[index].price);
    }

    expect(shippingOptions).to.be.length.gt(0);

    for (let index = 0; index < shippingOptions.length; index += 1) {
      expect(shippingOptions[index].method).to.be.length.gt(0);
      expect(shippingOptions[index].days).to.be.gte(1);
      expect(shippingOptions[index].price).to.be.gte(0);
    }
  });
});
