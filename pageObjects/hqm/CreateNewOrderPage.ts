import helpers from '../../utils/helpers';
import { Element } from '@wdio/sync';
class CreateNewOrderPage {
  /** -----------------------------Shipping Country Locators --------------------- */
  get labelShippingCountry(): Element {
    return $('#tab_shipping_country > form > div > div.box-header > h2');
  }

  get labelCountry(): Element {
    return $(
      '#tab_shipping_country > form > div > div.box-body > div > div > div:nth-child(1) > label',
    );
  }

  get dropdownChooseCountry(): Element {
    return $(
      '#tab_shipping_country > form > div > div.box-body > div > div > div:nth-child(1) > div > div > button',
    );
  }

  get dropdownShippingCountryCanada(): Element {
    return $(
      '#tab_shipping_country > form > div > div.box-body > div > div > div:nth-child(1) > div > div > div > ul > li:nth-child(39)',
    );
  }

  get dropdownChooseProvince(): Element {
    return $(
      '#shipping-country-state > div > div > button > span.filter-option.pull-left',
    );
  }

  get buttonProceedShippingCountry(): Element {
    return $(
      '#tab_shipping_country > form > div > div.box-footer.clearfix > div > div > button',
    );
  }

  get dropdownShippingProvinceSaskatchewan(): Element {
    return $(
      '#shipping-country-state > div > div > div > ul > li:nth-child(10) > a',
    );
  }

  get dropdownShippingProvinceOntario(): Element {
    return $(
      '#shipping-country-state > div > div > div > ul > li:nth-child(7) > a',
    );
  }

  get dropdownShippingProvinceBritishColumbia(): Element {
    return $(
      '#shipping-country-state > div > div > div > ul > li:nth-child(3) > a',
    );
  }

  get dropdownShippingProvinceQuebec(): Element {
    return $(
      '#shipping-country-state > div > div > div > ul > li:nth-child(9) > a',
    );
  }

  get labelProvince(): Element {
    return $('#shipping-country-state > label');
  }

  get DropdownShippingCountryUnitedStates(): Element {
    return $(
      '#tab_shipping_country > form > div > div.box-body > div > div > div:nth-child(1) > div > div > div > ul > li:nth-child(222)',
    );
  }

  // ------------------
  get DropdownProvinceShippingAddressAlabama(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(2) > a',
    );
  }

  get DropdownProvinceShippingAddressCalifornia(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(6) > a',
    );
  }

  get DropdownProvinceShippingAddressConnecticut(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(8) > a',
    );
  }

  get DropdownProvinceShippingAddressDC(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(9) > a',
    );
  }

  get DropdownProvinceShippingAddressGeorgia(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(12) > a',
    );
  }

  get DropdownProvinceShippingAddressHawaii(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(13) > a',
    );
  }

  get DropdownProvinceShippingAddressIllinois(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(15) > a',
    );
  }

  get DropdownProvinceShippingAddressIowa(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(17) > a',
    );
  }

  get DropdownProvinceShippingAddressKentucky(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(19) > a',
    );
  }

  get DropdownProvinceShippingAddressLouisiana(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(20) > a',
    );
  }

  get DropdownProvinceShippingAddressMaine(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(21) > a',
    );
  }

  get DropdownProvinceShippingAddressMichigan(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(24) > a',
    );
  }

  get DropdownProvinceShippingAddressNebraska(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(29) > a',
    );
  }

  get DropdownProvinceShippingAddressNewYork(): Element {
    return $(
      '#tab_address > form > div:nth-child(1) > div.box-body > div:nth-child(2) > ' +
        'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > select > option:nth-child(34)',
      // 'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(34) > a'
    );
  }

  get DropdownProvinceShippingAddressNorthCarolina(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(35) > a',
    );
  }

  get DropdownProvinceShippingAddressNorthDakota(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(36) > a',
    );
  }

  get DropdownProvinceShippingAddressOhio(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(37) > a',
    );
  }

  get DropdownProvinceShippingAddressOklahoma(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(38) > a',
    );
  }

  get DropdownProvinceShippingAddressSouthCarolina(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(42) > a',
    );
  }

  get DropdownProvinceShippingAddressTennessee(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(44) > a',
    );
  }

  get DropdownProvinceShippingAddressTexas(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(45) > a',
    );
  }

  get DropdownProvinceShippingAddressWestVirginia(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(50) > a',
    );
  }

  get DropdownProvinceShippingAddressWisconsin(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(51) > a',
    );
  }

  get DropdownShippingCountryUnitedKingdom(): Element {
    return $(
      '#tab_shipping_country > form > div > div.box-body > div > div > div:nth-child(1) > div > div > div > ul > li:nth-child(221)',
    );
  }

  get DropdownShippingCountryChina(): Element {
    return $(
      '#tab_shipping_country > form > div > div.box-body > div > div > div:nth-child(1) > div > div > div > ul > li:nth-child(45)',
    );
  }

  get DropdownShippingCountryAustralia(): Element {
    return $(
      '#tab_shipping_country > form > div > div.box-body > div > div > div:nth-child(1) > div > div > div > ul > li:nth-child(14)',
    );
  }

  get DropdownShippingCountryJapan(): Element {
    return $(
      '#tab_shipping_country > form > div > div.box-body > div > div > div:nth-child(1) > div > div > div > ul > li:nth-child(107)',
    );
  }

  /** ---------------------------------------------Shipping Country Methods------------------------------------------- */
  clickDropdownShippingCountryJapan(): void {
    helpers.click(this.DropdownShippingCountryJapan);
  }

  clickDropdownShippingCountryAustralia(): void {
    helpers.click(this.DropdownShippingCountryAustralia);
  }

  clickDropdownShippingCountryChina(): void {
    helpers.click(this.DropdownShippingCountryChina);
  }

  clickDropdownShippingCountryUnitedKingdom(): void {
    helpers.click(this.DropdownShippingCountryUnitedKingdom);
  }

  clickDropdownShippingCountryUnitedStates(): void {
    helpers.click(this.DropdownShippingCountryUnitedStates);
  }

  clickDropdownProvinceShippingAddressAlabama(): void {
    helpers.click(this.DropdownProvinceShippingAddressAlabama);
  }

  clickDropdownProvinceShippingAddressCalifornia(): void {
    helpers.click(this.DropdownProvinceShippingAddressCalifornia);
  }

  clickDropdownProvinceShippingAddressConnecticut(): void {
    helpers.click(this.DropdownProvinceShippingAddressConnecticut);
  }

  clickDropdownProvinceShippingAddressDC(): void {
    helpers.click(this.DropdownProvinceShippingAddressDC);
  }

  clickDropdownProvinceShippingAddressGeorgia(): void {
    helpers.click(this.DropdownProvinceShippingAddressGeorgia);
  }

  clickDropdownProvinceShippingAddressHawaii(): void {
    helpers.click(this.DropdownProvinceShippingAddressHawaii);
  }

  clickDropdownProvinceShippingAddressIllinois(): void {
    helpers.click(this.DropdownProvinceShippingAddressIllinois);
  }

  clickDropdownProvinceShippingAddressIowa(): void {
    helpers.click(this.DropdownProvinceShippingAddressIowa);
  }

  clickDropdownProvinceShippingAddressKentucky(): void {
    helpers.click(this.DropdownProvinceShippingAddressKentucky);
  }

  clickDropdownProvinceShippingAddressLouisiana(): void {
    helpers.click(this.DropdownProvinceShippingAddressLouisiana);
  }

  clickDropdownProvinceShippingAddressMaine(): void {
    helpers.click(this.DropdownProvinceShippingAddressMaine);
  }

  clickDropdownProvinceShippingAddressMichigan(): void {
    helpers.click(this.DropdownProvinceShippingAddressMichigan);
  }

  clickDropdownProvinceShippingAddressNebraska(): void {
    helpers.click(this.DropdownProvinceShippingAddressNebraska);
  }

  clickDropdownProvinceShippingAddressNewYork(): void {
    helpers.click(this.DropdownProvinceShippingAddressNewYork);
  }

  clickDropdownProvinceShippingAddressNorthCarolina(): void {
    helpers.click(this.DropdownProvinceShippingAddressNorthCarolina);
  }

  clickDropdownProvinceShippingAddressNorthDakota(): void {
    helpers.click(this.DropdownProvinceShippingAddressNorthDakota);
  }

  clickDropdownProvinceShippingAddressOhio(): void {
    helpers.click(this.DropdownProvinceShippingAddressOhio);
  }

  clickDropdownProvinceShippingAddressOklahoma(): void {
    helpers.click(this.DropdownProvinceShippingAddressOklahoma);
  }

  clickDropdownProvinceShippingAddressSouthCarolina(): void {
    helpers.click(this.DropdownProvinceShippingAddressSouthCarolina);
  }

  clickDropdownProvinceShippingAddressTennessee(): void {
    helpers.click(this.DropdownProvinceShippingAddressTennessee);
  }

  clickDropdownProvinceShippingAddressTexas(): void {
    helpers.click(this.DropdownProvinceShippingAddressTexas);
  }

  clickDropdownProvinceShippingAddressWestVirginia(): void {
    helpers.click(this.DropdownProvinceShippingAddressWestVirginia);
  }

  clickDropdownProvinceShippingAddressWisconsin(): void {
    helpers.click(this.DropdownProvinceShippingAddressWisconsin);
  }

  //------------------------------
  getLabelShippingCountryTxt(): string {
    const country: string = helpers.getText(this.labelShippingCountry);
    return country;
  }

  clickDropdownChooseCountry(): void {
    helpers.click(this.dropdownChooseCountry);
  }

  clickDropdownShippingCountryCanada(): void {
    helpers.click(this.dropdownShippingCountryCanada);
  }

  clickDropdownChooseProvince(): void {
    helpers.click(this.dropdownChooseProvince);
  }

  clickDropdownShippingProvinceQuebec(): void {
    helpers.click(this.dropdownShippingProvinceQuebec);
  }

  getLabelProvinceTxt(): string {
    const province: string = helpers.getText(this.labelProvince);
    return province;
  }

  clickDropdownShippingProvinceBritishColumbia(): void {
    helpers.click(this.dropdownShippingProvinceBritishColumbia);
  }

  clickDropdownShippingProvinceOntario(): void {
    helpers.click(this.dropdownShippingProvinceOntario);
  }

  clickDropdownShippingProvinceSaskatchewan(): void {
    helpers.click(this.dropdownShippingProvinceSaskatchewan);
  }

  clickbuttonProceedShippingCountry(): void {
    helpers.click(this.buttonProceedShippingCountry);
  }

  /** ---------------------------------------------Product Component Locators------------------------------------------- */

  get labelNoProduct(): Element {
    return $(
      '#tab_products > form > div.box > div.box-body > div > div.no-product.text-center > h2',
    );
  }

  get labelProducts(): Element {
    return $('#tab_products > form > div.box > div.box-header > h2');
  }

  get textMessageNoProduct(): Element {
    return $(
      '#tab_products > form > div.box > div.box-body > div > div.no-product.text-center > h2',
    );
  }

  get buttonAddProduct(): Element {
    return $('#add-product');
  }

  get labelAddProduct(): Element {
    return $('#search-product > div > div > div.modal-header > h4');
  }

  get textSearchProduct(): Element {
    return $(
      '#search-product > div > div > div.modal-body > div.input-group > input',
    );
  }

  get buttonSearch(): Element {
    return $(
      '#search-product > div > div > div.modal-body > div.input-group > span > a',
    );
  }

  get buttonAddToCart(): Element {
    return $('button.btn.btn-sm.btn-primary.btn-add-product');
  }

  get buttonClose(): Element {
    return $('#search-product > div > div > div.modal-footer > a');
  }

  get buttonCloseSymbol(): Element {
    return $('#search-product > div > div > div.modal-header > a');
  }

  get linkPreviousStepProducts(): Element {
    return $('#tab_products > form > div.box > div.box-footer.clearfix > a');
  }

  get buttonProceedProducts(): Element {
    return $(
      '#tab_products > form > div.box > div.box-footer.clearfix > button',
    );
  }

  get linkNavigateShippingCountry(): Element {
    return $('#createOrderTabs > li:nth-child(1) > a');
  }

  get linkNavigateCustomer(): Element {
    return $('#createOrderTabs > li:nth-child(3) > a');
  }

  get SKUtxt(): Element {
    return $('#master_order_product_list > tbody > tr > td.desc-cont > a');
  }

  /** ---------------------------------------------Product Component Methods------------------------------------------- */
  getSKUtxt(): string {
    const skuTxt: string = helpers.getText(this.SKUtxt);
    return skuTxt;
  }

  getLabelNoProductTxt(): string {
    const label: string = helpers.getText(this.labelNoProduct);
    return label;
  }

  getLabelProductsTxt(): string {
    const labels: string = helpers.getText(this.labelProducts);
    return labels;
  }

  getTextMessageNoProduct(): string {
    const txtMsg: string = helpers.getText(this.textMessageNoProduct);
    return txtMsg;
  }

  clickButtonAddProduct(): void {
    helpers.click(this.buttonAddProduct);
  }

  getLabelAddProduct(): string {
    const labels: string = helpers.getText(this.labelAddProduct);
    return labels;
  }

  enterTextSearchProduct(searchTxt: string): void {
    helpers.setValue(this.textSearchProduct, searchTxt);
  }

  clickButtonSearch(): void {
    helpers.click(this.buttonSearch);
  }

  clickButtonAddToCart(): void {
    helpers.click(this.buttonAddToCart);
  }

  clickButtonClose(): void {
    helpers.click(this.buttonClose);
  }

  clickButtonCloseSymbol(): void {
    helpers.click(this.buttonCloseSymbol);
  }

  clicklinkPreviousStepProducts(): void {
    helpers.click(this.linkPreviousStepProducts);
  }

  clickbuttonProceedProducts(): void {
    helpers.click(this.buttonProceedProducts);
  }

  clicklinkNavigateShippingCountry(): void {
    helpers.click(this.linkNavigateShippingCountry);
  }

  clicklinkNavigateCustomer(): void {
    helpers.click(this.linkNavigateCustomer);
  }

  /** -------------------------Customer Component Locators--------------- */
  get LabelCustomerInfo(): Element {
    return $('#tab_customer > form > h2');
  }

  get LabelSearchCustomerAccount(): Element {
    return $(
      '#tab_customer > form > div:nth-child(4) > div.box-body > div > div:nth-child(1) > h3',
    );
  }

  get TextSearchCustomerEmail(): Element {
    return $('#box-email-search > input');
  }

  get LinkEmailAutoComplete(): Element {
    return $('#box-email-search > div');
  }

  get ButtonSearchCustomerEmail(): Element {
    return $('#box-email-search > span > span');
  }

  get LinkPreviousStepCustomer(): Element {
    return $(
      '#tab_customer > form > div:nth-child(4) > div.box-footer.clearfix > a',
    );
  }

  get ButtonProceedCustomer(): Element {
    return $(
      '#tab_customer > form > div:nth-child(7) > div.box-footer.clearfix > button.btn.btn-success.btn-extra-pd.pull-right.btn-proceed',
    );
  }

  get LinkCreateNewCustomer(): Element {
    return $(
      '#tab_customer > form > div:nth-child(7) > div.box-body > div > div:nth-child(1) > div.create_customer_link > button',
    );
  }

  get LabelCreateCustomerAccount(): Element {
    return $('#create_customer_box > h3');
  }

  get TextMessageConfirmation(): Element {
    return $('#create_customer_box > p');
  }

  get LabelEmail(): Element {
    return $('#create_customer_box > div:nth-child(3) > label');
  }

  get TextCustomerEmail(): Element {
    return $('#create_customer_box > div:nth-child(3) > div > input');
  }

  get LabelFirstName(): Element {
    return $('#create_customer_box > div:nth-child(4) > label');
  }

  get TextCustomerFirstName(): Element {
    return $('#create_customer_box > div:nth-child(4) > div > input');
  }

  get LabelLastName(): Element {
    return $('#create_customer_box > div:nth-child(5) > label');
  }

  get TextCustomerLastName(): Element {
    return $('#create_customer_box > div:nth-child(5) > div > input');
  }

  get ButtonCreateNewAccount(): Element {
    return $('#create_new_account');
  }

  get LinkNavigateProducts(): Element {
    return $('#createOrderTabs > li:nth-child(2) > a');
  }

  get LinkNavigateAddress(): Element {
    return $('#createOrderTabs > li:nth-child(4) > a');
  }

  get searchCustomerLabel(): Element {
    return $(
      '#tab_customer > form > div:nth-child(4) > div.box-body > div > div:nth-child(1) > h3',
    );
  }

  get customerName(): Element {
    return $(
      '#tab_customer > form > div.box.box-selectedcustomer > div > div > div > div:nth-child(3) > p:nth-child(2)',
    );
  }

  /** --------------------------------------Customer Component Methods--------------------------------------------- */
  getCustomerName(): string {
    const custName: string = helpers.getText(this.customerName);
    return custName;
  }

  getSearchCustomerLabel(): string {
    const searchLabel: string = helpers.getText(this.searchCustomerLabel);
    return searchLabel;
  }

  getLabelCustomerInfo(): string {
    const label: string = helpers.getText(this.LabelCustomerInfo);
    return label;
  }

  clickLinkNavigateAddress(): void {
    helpers.click(this.LinkNavigateAddress);
  }

  clickLinkNavigateProducts(): void {
    helpers.click(this.LinkNavigateProducts);
  }

  clickButtonCreateNewAccount(): void {
    helpers.click(this.ButtonCreateNewAccount);
  }

  enterTextCustomerLastName(lname: string): void {
    helpers.setValue(this.TextCustomerLastName, lname);
  }

  getLabelLastName(): string {
    const labelLname: string = helpers.getText(this.LabelLastName);
    return labelLname;
  }

  enterTextCustomerFirstName(fname: string): void {
    helpers.setValue(this.TextCustomerFirstName, fname);
  }

  getLabelFirstName(): string {
    const labelFname: string = helpers.getText(this.LabelFirstName);
    return labelFname;
  }

  enterTextCustomerEmail(email: string): void {
    helpers.setValue(this.TextCustomerEmail, email);
  }

  getLabelEmail(): string {
    const labelEmail: string = helpers.getText(this.LabelEmail);
    return labelEmail;
  }

  getTextMessageConfirmation(): string {
    const txtMsg: string = helpers.getText(this.TextMessageConfirmation);
    return txtMsg;
  }

  getLabelCreateCustomerAccount(): string {
    const labelCustomer: string = helpers.getText(
      this.LabelCreateCustomerAccount,
    );
    return labelCustomer;
  }

  clickLinkCreateNewCustomer(): void {
    helpers.click(this.LinkCreateNewCustomer);
  }

  clickButtonProceedCustomer(): void {
    helpers.click(this.ButtonProceedCustomer);
  }

  clickLinkPreviousStepCustomer(): void {
    helpers.click(this.LinkPreviousStepCustomer);
  }

  clickButtonSearchCustomerEmail(): void {
    helpers.click(this.ButtonSearchCustomerEmail);
  }

  clickLinkEmailAutoComplete(): void {
    helpers.click(this.LinkEmailAutoComplete);
  }

  enterTextSearchCustomerEmail(email: string): void {
    helpers.setValue(this.TextSearchCustomerEmail, email);
  }

  getLabelSearchCustomerAccount(): string {
    const labelSearch: string = helpers.getText(
      this.LabelSearchCustomerAccount,
    );
    return labelSearch;
  }

  /** --------------------------- */
  /** ---------------------------Address Component Locators------------------------------ */
  get LabelAddresses(): Element {
    return $('#tab_address > form > div:nth-child(1) > div.box-header > h2');
  }

  get LabelShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div.clearfix.address-title > h3',
    );
  }

  get ButtonNewAddressShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div.clearfix.address-title > div > button',
    );
  }

  get LabelFirstNameShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(2) > label',
    );
  }

  get TextFirstNameShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(2) > div > input',
    );
  }

  get LabelLastNameShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(3) > label',
    );
  }

  // ---------------------
  get TextLastNameShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(3) > div > input',
    );
  }

  get LabelCompanyShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(4) > label',
    );
  }

  get TextCompanyShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(4) > div > input',
    );
  }

  get LabelAddressShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(5) > label',
    );
  }

  get TextAddressShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(5) > div > input',
    );
  }

  // -----------
  get LabelCityShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(6) > label',
    );
  }

  get TextCityShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(6) > div > input',
    );
  }

  get LabelCountryShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(7) > label',
    );
  }

  get DropdownCountryShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(7) > div > div > button > span.filter-option.pull-left',
    );
  }

  get DropdownCountryShippingAddressAustralia(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(7) > div > div > div > ul > li:nth-child(14) > a',
    );
  }

  get DropdownCountryShippingAddressChina(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(7) > div > div > div > ul > li:nth-child(45)',
    );
  }

  get DropdownCountryShippingAddressCanada(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(7) > div > div > div > ul > li:nth-child(39) > a',
    );
  }

  get DropdownCountryShippingAddressJapan(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(7) > div > div > div > ul > li:nth-child(107) > a',
    );
  }

  get DropdownCountryShippingAddressUnitedKingdom(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(7) > div > div > div > ul > li:nth-child(221) > a',
    );
  }

  get DropdownCountryShippingAddressUnitedStates(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(7) > div > div > div > ul > li:nth-child(222) > a',
    );
  }

  get LabelProvinceShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > label',
    );
  }

  // -------------------------
  get DropdownProvinceShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > button > span.filter-option.pull-left',
    );
  }

  get DropdownProvinceShippingAddressQuebec(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(9) > a',
    );
  }

  get DropdownProvinceShippingAddressBritishColumbia(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(3) > a',
    );
  }

  get DropdownProvinceShippingAddressOntario(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(7) > a',
    );
  }

  get DropdownProvinceShippingAddressSaskatchewan(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(8) > div > div > div > ul > li:nth-child(10) > a',
    );
  }

  // -------------------------
  get LabelPostalCodeShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(9) > label',
    );
  }

  get TextPostalCodeShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(9) > div > input',
    );
  }

  get LabelTelephoneShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(10) > label',
    );
  }

  get TextTelephoneShipping(): Element {
    return $(
      'div.col-sm-5.box-shipping.box-address > div:nth-child(10) > div > input',
    );
  }

  get LabelBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div.clearfix.address-title > h3',
    );
  }

  get LabelSameAsShipping(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div.clearfix.address-title > div > label',
    );
  }

  get CheckboxSameAsShipping(): Element {
    return $('#create-same-billing');
  }
  // -----------------------------

  get ButtonNewAddressBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div.clearfix.address-title > div > button',
    );
  }

  get LabelFirstNameBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(2) > label',
    );
  }

  get TextFirstNameBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(2) > div > input',
    );
  }

  get LabelLastNameBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(3) > label',
    );
  }

  get TextLastNameBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(3) > div > input',
    );
  }

  get LabelCompanyBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(4) > label',
    );
  }

  get TextCompanyBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(4) > div > input',
    );
  }

  get LabelAddressBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(5) > label',
    );
  }

  get TextAddressBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(5) > div > input',
    );
  }

  // -----------------------------
  get LabelCityBilling(): Element {
    return $(
      ' div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(6) > label',
    );
  }

  get TextCityBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(6) > div > input',
    );
  }

  get LabelCountryBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(7) > label',
    );
  }

  get DropdownCountryBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(7) > div > div > button > span.filter-option.pull-left',
    );
  }

  get LabelProvinceBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(8) > label',
    );
  }

  get DropdownProvinceBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(8) > div > div > button > span.filter-option.pull-left',
    );
  }

  get LabelPostalCodeBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(9) > label',
    );
  }

  get TextPostalCodeBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(9) > div > input',
    );
  }

  get LabelTelephoneBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(10) > label',
    );
  }

  get TextTelephoneBilling(): Element {
    return $(
      'div.col-sm-5.col-sm-push-1.box-billing.box-address > div:nth-child(10) > div > input',
    );
  }

  get LinkPreviousStepAddress(): Element {
    return $('#tab_address > form > div:nth-child(2) > div > a');
  }

  get ButtonProceedAddress(): Element {
    return $('#tab_address > form > div:nth-child(2) > div > button');
  }

  /** ------------------------------------Shipping Service Component---------------------------------- */
  get LabelShippingServices(): Element {
    return $('#tab_shipping_service > form > div > div.box-header > h2');
  }

  get LabelShippingMethod(): Element {
    return $(
      '#tab_shipping_service > form > div > div.box-body > div > div > div:nth-child(1) > label',
    );
  }

  get DropdownShippingMethod(): Element {
    return $(
      '#tab_shipping_service > form > div > div.box-body > div > div > div:nth-child(1) > div > ' +
        'div > button > span.filter-option.pull-left',
    );
  }

  get LinkPreviousStepShippingService(): Element {
    return $(
      '#tab_shipping_service > form > div > div.box-footer.clearfix > a',
    );
  }

  get ButtonProceedShippingService(): Element {
    return $(
      '#tab_shipping_service > form > div > div.box-footer.clearfix > button',
    );
  }

  /** ------------------------------------Summary Component Locators---------------------------------- */
  get LabelOrderSummary(): Element {
    return $('#tab_summary > div > h2');
  }

  get ButtonProceedToPayment(): Element {
    return $('#tab_summary > div > div:nth-child(7) > div > button');
  }

  /** ------------------------------------Payment Component Locators---------------------------------- */
  get TextCardholdersName(): Element {
    return $(
      '#tab_payment > form > div > div.box-body > div > div > div > div:nth-child(2) > div > input',
    );
  }

  get creditCardNumberField(): Element {
    return $('[name=creditCardNumber]');
  }

  get creditCardCvvField(): Element {
    return $('[name=cvv]');
  }

  get LabelCreditCardNumber(): Element {
    return $(
      '#tab_payment > form > div > div.box-body > div > div > div > div:nth-child(3) > label',
    );
  }

  get TextCreditCardNumber(): Element {
    return $(
      '#tab_payment > form > div > div.box-body > div > div > div > div:nth-child(5) > div > input',
    );
  }

  get LabelCVV(): Element {
    return $(
      '#tab_payment > form > div > div.box-body > div > div > div > div:nth-child(4) > label',
    );
  }

  get TextCVV(): Element {
    return $(
      '#tab_payment > form > div > div.box-body > div > div > div > div:nth-child(6) > div > input',
    );
  }

  get DropdownMonth(): Element {
    return $(
      '#tab_payment > form > div > div.box-body > div > div > div > div:nth-child(7) > div > ' +
        ' div.styled-select.select-m > div > button > span.filter-option.pull-left',
    );
  }

  get DropdownExpiryMonth(): Element {
    return $(
      '#tab_payment > form > div > div.box-body > div > div > div > div:nth-child(7) > div > ' +
        'div.styled-select.select-m > div > div > ul > li:nth-child(10) > a',
    );
  }

  get DropdownYear(): Element {
    return $(
      '#tab_payment > form > div > div.box-body > div > div > div > div:nth-child(7) > div > ' +
        'div.styled-select.select-y > div > button',
    );
  }

  get DropdownExpiryYear(): Element {
    return $(
      '#tab_payment > form > div > div.box-body > div > div > div > div:nth-child(7) > div > ' +
        'div.styled-select.select-y > div > div > ul > li:nth-child(4) > a',
    );
  }

  get ButtonConfirmOrder(): Element {
    return $('#tab_payment > form > div > div.box-footer.clearfix > button');
  }

  get LinkPreviousStepPayment(): Element {
    return $('#tab_payment > form > div > div.box-footer.clearfix > a');
  }

  get LabelPayment(): Element {
    return $('#tab_payment > form > div > div.box-header > h2');
  }

  /** ------------------------------------Confirmation Component Locators---------------------------- */
  get LabelOrderConfirmation(): Element {
    return $('#tab_confirmation > form > div > div.box-header > h2');
  }

  get TextOrderMessage(): Element {
    return $('#order-message');
  }

  get LinkOrderNumber(): Element {
    return $('#order-number > a');
  }

  get ButtonCreateNewOrder(): Element {
    return $(
      '#tab_confirmation > form > div > div.box-footer.clearfix.text-center > button',
    );
  }

  /** ================================================================================================ */
  /** ------------------------------------Confirmation Component Locators---------------------------- */
  getLabelOrderConfirmation(): string {
    const label: string = helpers.getText(this.LabelOrderConfirmation);
    return label;
  }

  enterTextOrderMessage(msg: string): void {
    helpers.setValue(this.TextOrderMessage, msg);
  }

  clickLinkOrderNumber(): void {
    helpers.click(this.LinkOrderNumber);
  }

  clickButtonCreateNewOrder(): void {
    helpers.click(this.ButtonCreateNewOrder);
  }

  /** ------------------------------------Payment Component Methods---------------------------------- */
  getLabelPayment(): string {
    const label: string = helpers.getText(this.LabelPayment);
    return label;
  }

  clickDropdownMonth(): void {
    helpers.click(this.DropdownMonth);
  }

  clickDropdownExpiryMonth(): void {
    helpers.click(this.DropdownExpiryMonth);
  }

  clickDropdownYear(): void {
    helpers.click(this.DropdownYear);
  }

  clickDropdownExpiryYear(): void {
    helpers.click(this.DropdownExpiryYear);
  }

  clickButtonConfirmOrder(): void {
    helpers.click(this.ButtonConfirmOrder);
  }

  clickLinkPreviousStepPayment(): void {
    helpers.click(this.LinkPreviousStepPayment);
  }

  enterTextCardholdersName(name: string): void {
    helpers.setValue(this.TextCardholdersName, name);
  }

  getLabelCreditCardNumber(): string {
    const label: string = helpers.getText(this.LabelCreditCardNumber);
    return label;
  }

  enterTextCreditCardNumber(ccNum: string): void {
    helpers.setValue(this.TextCreditCardNumber, ccNum);
  }

  getLabelCVV(): string {
    const label: string = helpers.getText(this.LabelCVV);
    return label;
  }

  enterTextCVV(cvv: string): void {
    helpers.setValue(this.TextCVV, cvv);
  }

  /** ------------------------------------Summary Component Methods---------------------------------- */
  getLabelOrderSummary(): string {
    const label: string = helpers.getText(this.LabelOrderSummary);
    return label;
  }

  clickButtonProceedToPayment(): void {
    helpers.click(this.ButtonProceedToPayment);
  }

  /** ------------------------------------Shipping Service Component Methods---------------------------------- */
  getLabelShippingServices(): string {
    const label: string = helpers.getText(this.LabelShippingServices);
    return label;
  }

  getLabelShippingMethod(): string {
    const label: string = helpers.getText(this.LabelShippingMethod);
    return label;
  }

  clickDropdownShippingMethod(): void {
    helpers.click(this.DropdownShippingMethod);
  }

  clickLinkPreviousStepShippingService(): void {
    helpers.click(this.LinkPreviousStepShippingService);
  }

  clickButtonProceedShippingService(): void {
    helpers.click(this.ButtonProceedShippingService);
  }

  /** ---------------------------Address Component Methods------------------------------ */
  clickButtonProceedAddress(): void {
    helpers.click(this.ButtonProceedAddress);
  }

  clickLinkPreviousStepAddress(): void {
    helpers.click(this.LinkPreviousStepAddress);
  }

  enterTextTelephoneBilling(phoneno: string): void {
    helpers.setValue(this.TextTelephoneBilling, phoneno);
  }

  getLabelTelephoneBilling(): string {
    const label: string = helpers.getText(this.LabelTelephoneBilling);
    return label;
  }

  enterTextPostalCodeBilling(postalCode: string): void {
    helpers.setValue(this.TextPostalCodeBilling, postalCode);
  }

  getLabelPostalCodeBilling(): string {
    const label: string = helpers.getText(this.LabelPostalCodeBilling);
    return label;
  }

  clickDropdownProvinceBilling(): void {
    helpers.click(this.DropdownProvinceBilling);
  }

  getLabelProvinceBilling(): string {
    const label: string = helpers.getText(this.LabelProvinceBilling);
    return label;
  }

  clickDropdownCountryBilling(): void {
    helpers.click(this.DropdownCountryBilling);
  }

  getLabelCountryBilling(): string {
    const label: string = helpers.getText(this.LabelCountryBilling);
    return label;
  }

  enterTextCityBilling(city: string): void {
    helpers.setValue(this.TextCityBilling, city);
  }

  getLabelCityBilling(): string {
    const label: string = helpers.getText(this.LabelCityBilling);
    return label;
  }

  // ----------------------------
  clickButtonNewAddressBilling(): void {
    helpers.click(this.ButtonNewAddressBilling);
  }

  getLabelFirstNameBilling(): string {
    const label: string = helpers.getText(this.LabelFirstNameBilling);
    return label;
  }

  enterTextFirstNameBilling(fname: string): void {
    helpers.setValue(this.TextFirstNameBilling, fname);
  }

  getLabelLastNameBilling(): string {
    const label: string = helpers.getText(this.LabelLastNameBilling);
    return label;
  }

  enterTextLastNameBilling(lname: string): void {
    helpers.setValue(this.TextLastNameBilling, lname);
  }

  getLabelCompanyBilling(): string {
    const label: string = helpers.getText(this.LabelCompanyBilling);
    return label;
  }

  enterTextCompanyBilling(company: string): void {
    helpers.setValue(this.TextCompanyBilling, company);
  }

  getLabelAddressBilling(): string {
    const label: string = helpers.getText(this.LabelAddressBilling);
    return label;
  }

  enterTextAddressBilling(address: string): void {
    helpers.setValue(this.TextAddressBilling, address);
  }

  // ---------------------------
  getLabelPostalCodeShipping(): string {
    const label: string = helpers.getText(this.LabelPostalCodeShipping);
    return label;
  }

  enterTextPostalCodeShipping(postalCode: string): void {
    helpers.setValue(this.TextPostalCodeShipping, postalCode);
  }

  getLabelTelephoneShipping(): string {
    const label: string = helpers.getText(this.LabelTelephoneShipping);
    return label;
  }

  enterTextTelephoneShipping(phoneno: string): void {
    helpers.setValue(this.TextTelephoneShipping, phoneno);
  }

  getLabelBilling(): string {
    const label: string = helpers.getText(this.LabelBilling);
    return label;
  }

  getLabelSameAsShipping(): string {
    const label: string = helpers.getText(this.LabelSameAsShipping);
    return label;
  }

  clickCheckboxSameAsShipping(): void {
    helpers.click(this.CheckboxSameAsShipping);
  }

  // -------------
  clickDropdownProvinceShipping(): void {
    helpers.click(this.DropdownProvinceShipping);
  }

  clickDropdownProvinceShippingAddressQuebec(): void {
    helpers.click(this.DropdownProvinceShippingAddressQuebec);
  }

  clickDropdownProvinceShippingAddressBritishColumbia(): void {
    helpers.click(this.DropdownProvinceShippingAddressBritishColumbia);
  }

  clickDropdownProvinceShippingAddressOntario(): void {
    helpers.click(this.DropdownProvinceShippingAddressOntario);
  }

  clickDropdownProvinceShippingAddressSaskatchewan(): void {
    helpers.click(this.DropdownProvinceShippingAddressSaskatchewan);
  }

  enterTextLastNameShipping(lname: string): void {
    helpers.setValue(this.TextLastNameShipping, lname);
  }

  getLabelCompanyShippingTxt(): string {
    const label: string = helpers.getText(this.LabelCompanyShipping);
    return label;
  }

  enterTextCompanyShipping(company: string): void {
    helpers.setValue(this.TextCompanyShipping, company);
  }

  getLabelAddressShipping(): string {
    const label: string = helpers.getText(this.LabelAddressShipping);
    return label;
  }

  enterTextAddressShipping(address: string): void {
    helpers.setValue(this.TextAddressShipping, address);
  }

  getLabelCityShipping(): string {
    const label: string = helpers.getText(this.LabelCityShipping);
    return label;
  }

  enterTextCityShipping(city: string): void {
    helpers.setValue(this.TextCityShipping, city);
  }

  getLabelCountryShipping(): string {
    const label: string = helpers.getText(this.LabelCountryShipping);
    return label;
  }

  clickDropdownCountryShipping(): void {
    helpers.click(this.DropdownCountryShipping);
  }

  clickDropdownCountryShippingAddressAustralia(): void {
    helpers.click(this.DropdownCountryShippingAddressAustralia);
  }

  clickDropdownCountryShippingAddressChina(): void {
    helpers.click(this.DropdownCountryShippingAddressChina);
  }

  clickDropdownCountryShippingAddressCanada(): void {
    helpers.click(this.DropdownCountryShippingAddressCanada);
  }

  clickDropdownCountryShippingAddressJapan(): void {
    helpers.click(this.DropdownCountryShippingAddressJapan);
  }

  clickDropdownCountryShippingAddressUnitedKingdom(): void {
    helpers.click(this.DropdownCountryShippingAddressUnitedKingdom);
  }

  clickDropdownCountryShippingAddressUnitedStates(): void {
    helpers.click(this.DropdownCountryShippingAddressUnitedStates);
  }

  getLabelProvinceShipping(): string {
    const label: string = helpers.getText(this.LabelProvinceShipping);
    return label;
  }

  getLabelAddressesTxt(): string {
    const label: string = helpers.getText(this.LabelAddresses);
    return label;
  }

  getLabelShipping(): string {
    const label: string = helpers.getText(this.LabelShipping);
    return label;
  }

  clickButtonNewAddressShipping(): void {
    helpers.click(this.ButtonNewAddressShipping);
  }

  getLabelFirstNameShipping(): string {
    const label: string = helpers.getText(this.LabelFirstNameShipping);
    return label;
  }

  enterTextFirstNameShipping(fname: string): void {
    helpers.setValue(this.TextFirstNameShipping, fname);
  }

  getLabelLastNameShippingtxt(): string {
    const label: string = helpers.getText(this.LabelLastNameShipping);
    return label;
  }

  /** -------------------------------------------- Shipping Modal Locators---------------------- */
  get shippingModalTitle(): Element {
    return $('#change-shipping > div > div > div.modal-header > h4');
  }

  /** -------------------------------------------- Shipping Modal Locators---------------------- */
  getshippingModalTitle(): string {
    const label: string = helpers.getText(this.shippingModalTitle);
    return label;
  }
}

export default new CreateNewOrderPage();
