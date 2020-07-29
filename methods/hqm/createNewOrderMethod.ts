import createNewOrderPage from '../../pageObjects/hqm/CreateNewOrderPage';
import masterOrderPage from '../../pageObjects/hqm/MasterOrderPage';
import { logger } from '../../config/winstonLogger';
class CreateNewOrderMethod {
  selectShippingCountry(country: string, province: string): void {
    createNewOrderPage.clickDropdownChooseCountry();

    switch (country) {
      case 'Canada':
        createNewOrderPage.clickDropdownShippingCountryCanada();
        createNewOrderPage.clickDropdownChooseProvince();
        switch (province) {
          case 'BritishColumbia': {
            createNewOrderPage.clickDropdownShippingProvinceBritishColumbia();
            break;
          }
          case 'Ontario': {
            createNewOrderPage.clickDropdownShippingProvinceOntario();
            break;
          }
          case 'Quebec': {
            createNewOrderPage.clickDropdownShippingProvinceQuebec();
            break;
          }
          case 'Saskatchewan': {
            createNewOrderPage.clickDropdownShippingProvinceSaskatchewan();
            break;
          }
          default:
            break;
        }
        break;
      case 'UnitedStates': {
        createNewOrderPage.clickDropdownShippingCountryUnitedStates();
        break;
      }
      case 'China': {
        createNewOrderPage.clickDropdownShippingCountryChina();
        break;
      }
      case 'UnitedKingdom': {
        createNewOrderPage.clickDropdownShippingCountryUnitedKingdom();
        break;
      }
      case 'Australia': {
        createNewOrderPage.clickDropdownShippingCountryAustralia();
        break;
      }
      case 'Japan': {
        createNewOrderPage.clickDropdownShippingCountryJapan();
        break;
      }
      default:
        break;
    }
    createNewOrderPage.clickbuttonProceedShippingCountry();
  }

  addProductToCart(sku: string): void {
    createNewOrderPage.clickButtonAddProduct();
    const pageTitle: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info(pageTitle);
    // Due to Slowness of HQM this static wait is required
    browser.pause(2000);
    createNewOrderPage.enterTextSearchProduct(sku);
    createNewOrderPage.clickButtonSearch();
    createNewOrderPage.buttonAddToCart.click();
    const skuTxt: any = browser.waitUntil((): any => {
      return createNewOrderPage.getSKUtxt();
    }, 5000);
    logger.info('SKU == ' + skuTxt);
    // Due to Slowness of HQM this static wait is required
    browser.pause(2000);
    createNewOrderPage.clickbuttonProceedProducts();
  }

  createNewCustomer(email: string, firstName: string, lastName: string): void {
    createNewOrderPage.clickLinkCreateNewCustomer();
    // Due to Slowness of HQM this static wait is required
    browser.pause(2000);
    createNewOrderPage.enterTextCustomerEmail(email);
    createNewOrderPage.enterTextCustomerFirstName(firstName);
    createNewOrderPage.enterTextCustomerLastName(lastName);
    createNewOrderPage.clickButtonCreateNewAccount();
    const custName: any = browser.waitUntil((): any => {
      return createNewOrderPage.getCustomerName();
    }, 5000);
    logger.info('Customer Name = ' + custName);
    createNewOrderPage.clickButtonProceedCustomer();
  }

  fillShippingAddress(
    company: string,
    address: string,
    city: string,
    country: string,
    province: string,
    postalCode: string,
    telephone: string,
  ): void {
    const Title: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info(Title);
    logger.info('Country  ====> ' + country);
    logger.info('Province  ====> ' + province);
    createNewOrderPage.enterTextCompanyShipping(company);
    createNewOrderPage.enterTextAddressShipping(address);
    createNewOrderPage.enterTextCompanyShipping(company);
    createNewOrderPage.enterTextAddressShipping(address);
    createNewOrderPage.enterTextCityShipping(city);
    createNewOrderPage.clickDropdownCountryShipping();
    switch (country) {
      case 'Canada': {
        createNewOrderPage.clickDropdownCountryShippingAddressCanada();
        createNewOrderPage.clickDropdownProvinceShipping();
        switch (province) {
          case 'BritishColumbia': {
            createNewOrderPage.clickDropdownProvinceShippingAddressBritishColumbia();
            break;
          }
          case 'Ontario': {
            createNewOrderPage.clickDropdownProvinceShippingAddressOntario();
            break;
          }
          case 'Quebec': {
            createNewOrderPage.clickDropdownProvinceShippingAddressQuebec();
            break;
          }
          case 'Saskatchewan': {
            createNewOrderPage.clickDropdownProvinceShippingAddressSaskatchewan();
            break;
          }
          default:
        }
        break;
      }
      case 'UnitedStates': {
        createNewOrderPage.clickDropdownCountryShippingAddressUnitedStates();
        createNewOrderPage.clickDropdownChooseProvince();
        switch (province) {
          case 'Alabama': {
            createNewOrderPage.clickDropdownProvinceShippingAddressAlabama();
            break;
          }
          case 'California': {
            createNewOrderPage.clickDropdownProvinceShippingAddressCalifornia();
            break;
          }
          case 'Connecticut': {
            createNewOrderPage.clickDropdownProvinceShippingAddressConnecticut();
            break;
          }
          case 'DC': {
            createNewOrderPage.clickDropdownProvinceShippingAddressDC();
            break;
          }
          case 'Georgia': {
            createNewOrderPage.clickDropdownProvinceShippingAddressGeorgia();
            break;
          }
          case 'Hawaii': {
            createNewOrderPage.clickDropdownProvinceShippingAddressHawaii();
            break;
          }
          case 'Illinois': {
            createNewOrderPage.clickDropdownProvinceShippingAddressIllinois();
            break;
          }
          case 'Iowa': {
            createNewOrderPage.clickDropdownProvinceShippingAddressIowa();
            break;
          }
          case 'Kentucky': {
            createNewOrderPage.clickDropdownProvinceShippingAddressKentucky();
            break;
          }
          case 'Louisiana': {
            createNewOrderPage.clickDropdownProvinceShippingAddressLouisiana();
            break;
          }
          case 'Maine': {
            createNewOrderPage.clickDropdownProvinceShippingAddressMaine();
            break;
          }
          case 'Michigan': {
            createNewOrderPage.clickDropdownProvinceShippingAddressMichigan();
            break;
          }
          case 'Nebraska': {
            createNewOrderPage.clickDropdownProvinceShippingAddressNebraska();
            break;
          }
          case 'New York': {
            createNewOrderPage.clickDropdownProvinceShippingAddressNewYork();
            break;
          }
          case 'North Carolina': {
            createNewOrderPage.clickDropdownProvinceShippingAddressNorthCarolina();
            break;
          }
          case 'North Dakota': {
            createNewOrderPage.clickDropdownProvinceShippingAddressNorthDakota();
            break;
          }
          case 'Ohio': {
            createNewOrderPage.clickDropdownProvinceShippingAddressOhio();
            break;
          }
          case 'Oklahoma': {
            createNewOrderPage.clickDropdownProvinceShippingAddressOklahoma();
            break;
          }
          case 'South Carolina': {
            createNewOrderPage.clickDropdownProvinceShippingAddressSouthCarolina();
            break;
          }
          case 'Tennessee': {
            createNewOrderPage.clickDropdownProvinceShippingAddressTennessee();
            break;
          }
          case 'Texas': {
            createNewOrderPage.clickDropdownProvinceShippingAddressTexas();
            break;
          }
          case 'West Virginia': {
            createNewOrderPage.clickDropdownProvinceShippingAddressWestVirginia();
            break;
          }
          case 'Wisconsin': {
            createNewOrderPage.clickDropdownProvinceShippingAddressWisconsin();
            break;
          }
          default:
        }
        break;
      }
      case 'China': {
        createNewOrderPage.clickDropdownCountryShippingAddressChina();
        break;
      }
      case 'UnitedKingdom': {
        createNewOrderPage.clickDropdownCountryShippingAddressUnitedKingdom();
        break;
      }
      case 'Australia': {
        createNewOrderPage.clickDropdownCountryShippingAddressAustralia();
        break;
      }
      case 'Japan': {
        createNewOrderPage.clickDropdownCountryShippingAddressJapan();
        break;
      }
      default:
    }
    createNewOrderPage.enterTextPostalCodeShipping(postalCode);
    createNewOrderPage.enterTextTelephoneShipping(telephone);
    createNewOrderPage.clickCheckboxSameAsShipping();
    createNewOrderPage.clickButtonProceedAddress();
  }

  selectShippingService(): void {
    createNewOrderPage.clickButtonProceedShippingService();
  }

  clickProceedPayment(): void {
    createNewOrderPage.clickButtonProceedToPayment();
  }

  fillPaymentInfo(
    cardholdersName: string,
    creditCardNumber: string,
    cvv: string,
  ): void {
    createNewOrderPage.enterTextCardholdersName(cardholdersName);
    if (
      !createNewOrderPage.creditCardNumberField.isEnabled() &&
      !createNewOrderPage.creditCardCvvField.isEnabled()
    ) {
      logger.info('Field is Disabled ------------------');
      browser.execute(
        'document.querySelector("[name=creditCardNumber]").removeAttribute("disabled")',
      );
      logger.info(' Field is Enabled ------------------');
      createNewOrderPage.enterTextCreditCardNumber(creditCardNumber);
      browser.execute(
        'document.querySelector("[name=cvv]").removeAttribute("disabled")',
      );
      logger.info('CVV Field is Enabled ------------------');
      createNewOrderPage.enterTextCVV(cvv);
    }
    createNewOrderPage.clickDropdownMonth();
    createNewOrderPage.clickDropdownExpiryMonth();
    createNewOrderPage.clickDropdownYear();
    createNewOrderPage.clickDropdownExpiryYear();
    createNewOrderPage.clickButtonConfirmOrder();
  }

  clickTransactionOrderNumber(): void {
    const Title: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Title ==> ' + Title);
    createNewOrderPage.clickLinkOrderNumber();
  }

  openShippingServicesModal(): void {
    const Title: any = browser.waitUntil((): any => {
      return browser.getTitle();
    }, 5000);
    logger.info('Title ==> ' + Title);
    masterOrderPage.clickButtonEditShipping();
  }
}
export default new CreateNewOrderMethod();
