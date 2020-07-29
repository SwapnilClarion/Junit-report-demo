import { navigationPageLocators } from './pageLocators/NavigationPage_Locators';
import helpers from '../utils/helpers';
import { logger } from '../config/winstonLogger';
import { navigationTestData } from '../resources/navigationTestData';
export class NavigationPage extends navigationPageLocators {
  getValueOfSuccessMsg(): string {
    const successMsg = helpers.getText(this.logoutSuccess);
    return successMsg;
  }

  getValueofLoginLink(): string {
    const lLink = helpers.getText(this.loginLink);
    return lLink;
  }

  clickOnAccountLink(): void {
    helpers.click(this.accountLink);
  }

  clickOnLogoutLink(): void {
    helpers.click(this.logoutLink);
  }

  clickOnSearchLink(): void {
    helpers.click(this.searchLink);
  }

  clickOnWomenGenderLink(): void {
    helpers.click(this.womenGenderLink);
  }

  clickOnmenGenderLink(): void {
    helpers.click(this.menGenderLink);
  }

  clickOnMenOuterLink(): void {
    helpers.click(this.menOuterLink);
  }

  clickOnWomenOuterLink(): void {
    helpers.click(this.womenOuterLink);
  }

  clickOnEnglishLink(): void {
    helpers.click(this.englishLink);
  }

  clickOnLoginLink(): void {
    helpers.click(this.loginLink);
  }

  clickOnWishlistLink(): void {
    helpers.click(this.wishlistLink);
  }

  clickOnshoppingbaglink(): void {
    helpers.click(this.shoppingbaglink);
  }

  moveToLangMenu(): void {
    (<any>this.langMenu).moveTo();
  }

  clickShoeCategoryLink(): void {
    helpers.click(this.shoeCategoryLink);
  }

  clickAccessoryCategoryLink(): void {
    helpers.click(this.accessoryCategoryLink);
  }

  clickSocksCategoryLink(): void {
    helpers.click(this.socksCategoryLink);
  }

  clickPriceLowToHighLink(): void {
    helpers.click(this.priceLowToHigh);
  }

  getValueofAccountActivate(): string {
    const accountAct = helpers.getText(this.accountActivate);
    return accountAct;
  }

  getValueofFeedbackUIMail(): string {
    const feedbackMail = helpers.getText(this.feedbackUIMail);
    return feedbackMail;
  }

  clickLanguageLink(): void {
    helpers.click(this.languageLink);
  }

  selectLanguage(index: number): void {
    const langArray = navigationTestData.langArray;
    const languageXpath = '//a[text()=' + langArray[index] + ']';
    this.clickLanguageLink();
    helpers.click($(languageXpath));
    const selectedLang = (<any>$(languageXpath)).getText();
    logger.info('The selected language is :' + selectedLang.trim());
  }

  getLanguages(): any {
    const langArray = [this.getCurrentLanguage()];
    this.clickLanguageLink();
    const langlist = this.languagesList;
    for (let index = 1; index <= langlist.length; index += 1) {
      const lang = langlist[index - 1].$('a').getText().trim();
      if (!langArray.includes(lang)) {
        langArray.push(lang);
      }
    }
    return langArray;
  }

  getCurrentLanguage(): string {
    const lang = helpers.getText(this.currentLanguage);
    return lang;
  }

  clickOnLoginLinkLang(): void {
    helpers.click(this.loginLinkLang);
  }

  // Sale Section
  // Clicks on Sale Link
  clickSaleLink(): void {
    helpers.click(this.saleLink);
  }

  isSaleLinkExist(): boolean {
    if (
      (<any>this.saleLink).isExisting() &&
      (<any>this.saleLink).isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  /**
   * Clicks on order history link under accounts tab
   */

  clickOrderHistoryLink(): void {
    helpers.click(this.orderHistoryLink);
  }

  clickAddressLink(): void {
    helpers.click(this.addressLink);
  }

  clickSsenseLogo(): void {
    helpers.click(this.ssenseLogo);
  }

  /**
   * Return the array of link texts of current active links.
   */
  getCurrentLnkTxt(): any {
    const lnkTxt: any = this.currentActiveLink;
    const linkTexts: any = [];
    for (let index = 0; index < lnkTxt.length; index += 1) {
      const element: any = lnkTxt[index];
      linkTexts.push(element.getText().trim());
    }
    return linkTexts;
  }

  clickOnFirstDesignerslink(): void {
    helpers.click(this.firstDesignerslink);
  }

  enterSearchInput(searchTxt: string): void {
    helpers.setValue(this.searchInput, searchTxt);
  }
}
export default new NavigationPage();
