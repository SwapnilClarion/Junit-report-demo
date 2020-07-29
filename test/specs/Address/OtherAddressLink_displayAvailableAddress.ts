import addressPage from '../../../pageObjects/AddressesPage';
import navigationPage from '../../../pageObjects/NavigationPage';
import productDescriptionPage from '../../../pageObjects/ProductDescriptionPage';
import productListingPage from '../../../pageObjects/ProductListingPage';
import checkoutPage from '../../../pageObjects/CheckoutPage';
import loginPage from '../../../pageObjects/LoginPage';
import signupMethod from '../../../methods/Login_SignUpMethods';
import accountDetailsPage from '../../../pageObjects/AccountDetailsPage';
import shoppingBagPage from '../../../pageObjects/ShoppingBagPage';
import notification from '../../../methods/GetNotification';
import assert from 'assert';
import { expect } from 'chai';
import { logger } from '../../../config/winstonLogger';
import { randomData } from '../../../utils/random_data';
import { loginSignUpTestData } from '../../../resources/loginSignUpTestData';
import { addressTestData } from '../../../resources/addressTestData';
import { checkoutTestData } from '../../../resources/checkoutTestData';
import { globalTestData } from '../../../resources/globalTestData';
globalTestData.FILE_PATH = __filename;
describe('Validate on clicking Use Other Addresses link on checkout should display availale addresse list ', () => {
  let enteredAddressFields: any = [];
  let savedAddressFields: any = [];
  let langArray: any = [];
  let shippingAddressFieldsOnCheckout: any = [];
  let billingAddressFieldsOnCheckout: any = [];
  it('Should validate that user is not logged in', () => {
    logger.info('=======================================================');

    navigationPage.clickOnLoginLink();
    const actualLoginHeading = browser.waitUntil(() => {
      return loginPage.getLoginHeading();
    }, 5000);
    assert.equal(
      actualLoginHeading,
      loginSignUpTestData.Login_page_heading,
      loginSignUpTestData.Login_Page_Heading_Error,
    );
  });

  it('Should perform registration and access Address page', () => {
    const userEmail = randomData.GUEST_EMAIL;
    signupMethod.signup(
      userEmail,
      randomData.USER_PASSWORD,
      loginSignUpTestData.NO_THANKS_PROMO,
    );

    browser.waitUntil(() => {
      return accountDetailsPage.AccountDetailsHeading.isDisplayed();
    }, 5000);

    navigationPage.clickOnAccountLink();
    navigationPage.clickAddressLink();
    const actualAddressHeading = browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    logger.info('Landed on Address page');

    assert.equal(
      actualAddressHeading,
      addressTestData.ActualAddressHeading,
      addressTestData.AddressHeadingError,
    );
    logger.info('Address Heading is: ' + actualAddressHeading);

    langArray = browser.waitUntil(() => {
      return navigationPage.getLanguages();
    }, 5000);
  });

  it('Should create new address with valid fields', () => {
    addressPage.clickAddNewAddress();
    browser.waitUntil((): any => {
      return addressPage.getAddressFormHeading();
    }, 5000);
    enteredAddressFields = addressPage.getAddressFields();

    logger.info('Entered Address fields are: ' + enteredAddressFields);
    addressPage.createNewAddress(enteredAddressFields);
    addressPage.clickSaveAddressButton();
    browser.waitUntil((): any => {
      return addressPage.getAddressHeading();
    }, 5000);
    logger.info('Created new address successfully');

    savedAddressFields = addressPage.getSavedAddressFields();
    logger.info('Saved Addresse fields are: ' + savedAddressFields);
  });

  it('Should navigate to product listing page select first product and add it to bag', () => {
    navigationPage.clickOnMenOuterLink();
    productListingPage.clickFirstProduct();
    browser.waitUntil(() => {
      return productDescriptionPage.isAddToBagButtonExist();
    }, 5000);
    productDescriptionPage.addToBag();

    browser.waitUntil((): any => {
      return notification.getNotificationText();
    }, 5000);
    checkoutPage.closeAllNotification();
  });
  it('should click on proceed to checkout button', () => {
    productDescriptionPage.clickCheckoutBtn();
    shoppingBagPage.clickProceedToCheckoutOnShoppingBag();
    browser.waitUntil((): any => {
      return checkoutPage.getCheckoutPageHeading();
    }, 5000);
  });
  it('should redirect on checkout page validate available address list and label for use as billing ', () => {
    for (let index = 0; index < langArray.length; index += 1) {
      if (index > 0) {
        browser.back();
        navigationPage.selectLanguage(index);
        shoppingBagPage.clickProceedToCheckoutOnShoppingBag();
      }
      browser.waitUntil((): any => {
        return checkoutPage.getCheckoutPageHeading();
      }, 5000);
      checkoutPage.closeAllNotification();

      // Validate address fields on use other address(Shipping) dropdown matching with address page
      checkoutPage.clickOnUseOtherAddressLink();
      shippingAddressFieldsOnCheckout = checkoutPage.getAddressUseOtherAddDropdownShipping();

      logger.info(
        'Address fields on other Address dropdown(Shipping) on checkout are:' +
          shippingAddressFieldsOnCheckout.sort(),
      );
      logger.info('Saved Addresse fields are: ' + savedAddressFields.sort());

      for (let i = 0; i <= savedAddressFields.length - 1; i += 1) {
        for (let j = i; j <= i; j += 1) {
          if (!savedAddressFields[i] === shippingAddressFieldsOnCheckout[j]) {
            logger.info(
              'Shipping Section: Address fields on other address fields dropdown are not matching with saved address fields',
            );
            logger.info(shippingAddressFieldsOnCheckout[i]);
            logger.info(savedAddressFields[j]);
          }
        }
      }
      logger.info(
        'Shipping Section: Address fields on Use other address dropdown are matching with address fields on address list',
      );

      checkoutPage.closeUseOtherAddressDropdown();

      // Validate use As Billing checkbox label for the selected language
      const useAsBillingCheckBox = checkoutPage.isUseAsBillingCheckboxDisplayed();
      expect(useAsBillingCheckBox).to.equal(true);
      const actualUseAsBillingLabelText = checkoutPage.getUseAsBillingLabelText();
      logger.info(
        'Use As Billing Checkbox label for selected language is: ' +
          actualUseAsBillingLabelText,
      );
      assert.equal(
        actualUseAsBillingLabelText,
        checkoutTestData.useAsBillingLabelOnCheckout[index],
        checkoutTestData.useAsBillingLabelTextError,
      );
      // Validate use Other Address link text for the selected language
      const actualUseOtherAddressLinkText = checkoutPage.getUseOtherAddressLinkText();
      logger.info(
        'Use other address link text for selected language is: ' +
          actualUseOtherAddressLinkText,
      );
      logger.info('===========================================');
      assert.equal(
        actualUseOtherAddressLinkText,
        checkoutTestData.useOtherAddressLinkTextOnCheckout[index],
        checkoutTestData.useAsOtherAddressLinkTextError,
      );

      // Validate Billing Address section remain hidden when use As Billing is checkbox is unchecked
      expect(checkoutPage.isBillingAddressSectionDisplayed()).to.equal(false);
      checkoutPage.clickOnUseAsBillingCheckbox();
      expect(checkoutPage.isBillingAddressSectionDisplayed()).to.equal(true);

      // Validate address fields on use other address(Billing) dropdown matching with address page
      checkoutPage.clickOtherAddressForBilling();
      // static wait require to wait until other dropdown open so that content can be captured
      browser.pause(1000);
      billingAddressFieldsOnCheckout = checkoutPage.getAddressUseOtherAddDropdownBilling();

      logger.info(
        'Address fields on other Address dropdown(Billing) on checkout are:' +
          billingAddressFieldsOnCheckout.sort(),
      );
      logger.info('Saved Addresse fields are: ' + savedAddressFields.sort());

      for (let i = 0; i <= savedAddressFields.length - 1; i += 1) {
        for (let j = i; j <= i; j += 1) {
          if (!savedAddressFields[i] === billingAddressFieldsOnCheckout[j]) {
            logger.info(
              'Billing Section - Address fields on other address fields dropdown are not matching with saved address fields',
            );
            logger.info(billingAddressFieldsOnCheckout[i]);
            logger.info(savedAddressFields[j]);
          }
        }
      }
      logger.info(
        'Billing Section - Address fields on Use other address dropdown are matching with address fields on address list',
      );

      checkoutPage.closeUseOtherAddressDropdown();
    }
  });
});
