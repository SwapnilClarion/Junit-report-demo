import { shoppingBagPageLocators } from './pageLocators/ShoppingBagPage_Locators';
import helpers from '../utils/helpers';
import { logger } from '../config/winstonLogger';
import { shoppingBagTestData } from '../resources/shoppingBagTestData';
export class ShoppingBag extends shoppingBagPageLocators {
  clickForgotPasswordLnk(): void {
    helpers.click(this.forgotPasswordLnk);
  }

  clickAcceptEmailCheckoutBtn(): void {
    helpers.click(this.emailCheckoutBtn);
  }

  enterUserEmail(email: string): void {
    helpers.setValue(this.userEmailInput, email);
  }

  enterUserPassword(password: string): void {
    helpers.setValue(this.userPasswordInput, password);
  }

  clickLoginBtn(): void {
    helpers.click(this.submitLoginBtn);
  }

  // clickProductRemoveIcon() {
  //   helpers.click(this.productRemoveIcon);
  // }

  clickProceedToCheckoutOnShoppingBag(): void {
    helpers.click(this.proceedToCheckoutOnShoppingBag);
  }

  clickProceedToCheckoutBtn(): void {
    this.proceedToCheckoutBtn.click();
  }

  checkProceedBtn(): boolean {
    if (
      this.proceedToCheckoutBtn.isClickable() &&
      this.proceedToCheckoutBtn.isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  checkEmailEditable(): boolean {
    if (
      !this.userEmailInput.isEnabled() ||
      !this.userEmailInput.getAttribute('readonly')
    ) {
      return true;
    }
    return false;
  }

  checkEmailFieldEmpty(): boolean {
    const emailField: any = this.userEmailInput.getValue();
    if (emailField === '' || emailField === 0) {
      return true;
    }
    return false;
  }

  getNumberOfShoppingBagProduct(): number {
    const actualProduct = helpers.getText(this.numberShoppingBagProduct);
    const patt = /\((\d+)\)/;
    const num = actualProduct.match(patt)[1];
    return parseFloat(num);
  }

  clickMoveToWishListLink(): void {
    helpers.click(this.moveToWishlistLink);
  }

  getShoppingBagHeading(): string {
    return helpers.getText(this.shoppingBagHeading);
  }

  extractProductUrlShoppingBag(): string {
    return helpers.getAttribute(this.extractProductUrl, 'href');
  }

  getEmptyShoppingBagText(): string {
    return helpers.getText(this.emptyShoppingBagText);
  }

  // Shopping Carts

  getProductID(): any {
    const productIdArr = [];
    for (let index = 0; index < this.productsList.length; index += 1) {
      let arr: any = '';
      arr = this.productsList[index]
        .$('a:nth-child(4)')
        .getAttribute('href')
        .split('/');
      productIdArr.push(arr[arr.length - 1]);
    }
    return productIdArr;
  }

  clickRemoveItemBtn(): void {
    logger.info('Items Count ====> ' + this.removeItemBtn.length);
    for (let index = this.removeItemBtn.length; index > 0; index -= 1) {
      const i = 0;
      helpers.click(this.removeItemBtn[i]);
    }
  }

  checkPopulatedEmailId(): string {
    const populatedEmail = this.userEmailInput.getValue();
    return populatedEmail;
  }

  getDisplayedEmail(): string {
    const getEmail = this.userEmailInputDisabled.getValue();
    return getEmail;
  }

  checkEmailNonEditable(): boolean {
    if (this.userEmailInputDisabled.getAttribute('disabled')) {
      return true;
    }
    return false;
  }

  checkDisplayedEmail(): string {
    const checkEmail = this.userEmailInput.getValue();
    return checkEmail;
  }

  clickForgotYourPasswordButton(): void {
    this.forgotPassLnk.click();
  }

  notYourEmailLink(): boolean {
    if (this.notYourEmail.isClickable() && this.notYourEmail.isDisplayed()) {
      return true;
    }
    return false;
  }

  clickNotYourEmailLink(): void {
    helpers.click(this.notYourEmail);
  }

  forgotYourPasswordLink(): boolean {
    if (this.forgotPassLnk.isClickable() && this.forgotPassLnk.isDisplayed()) {
      return true;
    }
    return false;
  }

  checkPasswordEditable(): boolean {
    if (
      !this.userPasswordInput.isEnabled() ||
      !this.userPasswordInput.getAttribute('readonly')
    ) {
      return true;
    }
    return false;
  }

  checkForgotPasswordEmail(): boolean {
    if (
      !this.forgotpasswordemail.isEnabled() ||
      !this.forgotpasswordemail.getAttribute('readonly') ||
      this.forgotpasswordemail === null
      // ||this.forgotpasswordemail === 0
    ) {
      return true;
    }
    return false;
  }

  alreadymemberLink(): boolean {
    if (this.alreadyMember.isClickable() && this.alreadyMember.isDisplayed()) {
      return true;
    }
    return false;
  }

  resetPasswordLink(): boolean {
    if (this.resetPassword.isClickable() && this.resetPassword.isDisplayed()) {
      return true;
    }
    return false;
  }

  checkForgotYourPasswordTextField(): boolean {
    if (
      this.forgotpasswordtext.isExisting() &&
      this.forgotpasswordtext.isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  checkPasswordText(): boolean {
    if (this.passwordInput.isExisting() && this.passwordInput.isDisplayed()) {
      return true;
    }
    return false;
  }

  clickNotYourAccLink(): void {
    this.notYourAccount.click();
  }

  clickDisplayedEmail(): string {
    const displayedEmail = helpers.getText(this.displayedEmail);
    return displayedEmail;
  }

  notYourAccountLink(): boolean {
    if (
      this.notYourAccount.isClickable() &&
      this.notYourAccount.isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  isProceedToCheckoutOnShoppingBag(): boolean {
    if (
      this.proceedToCheckoutOnShoppingBag.isClickable() &&
      this.proceedToCheckoutOnShoppingBag.isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  /**
   * This function will return all the product's prices that are in the shopping bag,
   * It returns an array of prices.
   */
  getAllProductPrices(): any {
    const prices = [];
    const bothPrices = this.firstProductPrices;
    for (let index = 0; index < bothPrices.length; index += 1) {
      const element = bothPrices[index];
      const pr = element.getText().trim().substr(1).split(' ');
      prices.push(parseFloat(parseFloat(pr[0]).toFixed(2)));
    }
    return prices;
  }

  getFirstPriceText(): string {
    return helpers.getText(this.checkPriceFirstProduct);
  }

  getSecondPriceText(): string {
    return helpers.getText(this.checkPriceSecondProduct);
  }

  getOrderTotalPriceText(): string {
    return helpers.getText(this.orderTotalPrice);
  }

  clickFooterCountry(): void {
    browser.refresh();
    return helpers.click(this.footerCountry);
  }

  /**
   * This function will return all Non-sale product's prices that are in the shopping bag,
   * It returns an array of prices.
   */
  getProductPrices(): any {
    const prices: any = [];
    const bothPrices: any = this.allProductPrices;
    for (let index = 0; index < bothPrices.length; index += 1) {
      const element: any = bothPrices[index];
      const pr: string = element.getText().trim().substr(1).split(' ');
      prices.push(parseFloat(parseFloat(pr[0]).toFixed(2)));
    }
    return prices;
  }

  // switch case between country
  selectCountry(countryName: string): void {
    this.clickFooterCountry();
    this.clickEnterCountry(countryName);
    // static wait is required while switching in between country
    browser.pause(2000);
    switch (countryName) {
      case 'canada':
        this.clickCountryLink();
        break;
      case 'United States':
        if (!this.countryLink.isDisplayed()) {
          browser.navigateTo(shoppingBagTestData.US_ShoppingBagLink);
        }
        this.clickCountryLink();
        break;
      case 'australia':
        if (!this.countryLink.isDisplayed()) {
          browser.navigateTo(shoppingBagTestData.AUS_ShoppingBagLink);
        }
        this.clickCountryLink();
        break;
      case 'hong kong':
        if (!this.countryLink.isDisplayed()) {
          browser.navigateTo(shoppingBagTestData.HK_ShoppingBagLink);
        }
        this.clickCountryLink();
        break;
      case 'france':
        if (!this.countryLink.isDisplayed()) {
          browser.navigateTo(shoppingBagTestData.FR_ShoppingBagLink);
        }
        this.clickCountryLink();
        break;
      default:
        break;
    }
  }

  clickCountryLink(): void {
    helpers.click(this.countryLink);
  }

  clickEnterCountry(countryvalue: string): void {
    helpers.setValue(this.enterCountry, countryvalue);
  }

  clickShoppingBag(): void {
    return helpers.click(this.numberShoppingBagProduct);
  }

  checkBrandName(): boolean {
    if (this.brandName.isClickable() && this.brandName.isDisplayed()) {
      return true;
    }
    return false;
  }

  clickBrandName(): any {
    helpers.click(this.brandName);
  }

  getDisplayedName(): string {
    return helpers.getText(this.brandName);
  }

  getDisplayedProductDescription(): string {
    return helpers.getText(this.productDescription);
  }

  getDisplayedProductSize(): string {
    return helpers.getText(this.productSize);
  }

  getDisplayedProductCode(): string {
    return helpers.getText(this.productCode);
  }

  clickDisplayedProductCode(): any {
    helpers.click(this.productCode);
  }
}
export default new ShoppingBag();
