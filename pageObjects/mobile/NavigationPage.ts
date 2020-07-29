import { navigationPageLocators } from './pageLocators/NavigationPage_Locators';
import helpers from '../../utils/helpers';
import { logger } from '../../config/winstonLogger';
export class NavigationPage extends navigationPageLocators {
  clickMobileMainMenu(): void {
    helpers.click(this.mainMenu);
  }

  clickMobileMenLink(): void {
    helpers.click(this.mobileMenLink);
  }

  clickMobileTrending(): void {
    helpers.click(this.mobileTrending);
  }

  clickMobileAccountLink(): void {
    helpers.click(this.mobileAccountLink);
  }

  /**
   * This function selects the appropriate locators , as the locators are different
   * for different languages.
   */
  clickLanguageLink(): void {
    if (this.languageLnk.isExisting() && this.languageLnk.isDisplayed()) {
      helpers.click(this.languageLnk);
    } else if (
      this.changeLanguageLnkSecondLocator.isExisting() &&
      this.changeLanguageLnkSecondLocator.isDisplayed()
    ) {
      helpers.click(this.changeLanguageLnkSecondLocator);
    } else if (
      this.changeLanguageLnkThirdLocator.isExisting() &&
      this.changeLanguageLnkThirdLocator.isDisplayed()
    ) {
      helpers.click(this.changeLanguageLnkThirdLocator);
    } else {
      logger.warn('-----Incorrect/Invalid Locators----');
    }
  }

  getCurrentActiveLangTxt(): string {
    return helpers.getText(this.currentActiveLanguage);
  }

  clickNavigationBackBtn(): void {
    helpers.click(this.navigationbackBtn);
  }

  clickSaleNavLink(): void {
    helpers.click(this.saleLink);
  }

  clickAllMenSaleLnk(): void {
    helpers.click(this.allMenSaleLnk);
  }

  clickEnglishLnk(): void {
    helpers.click(this.englishLnk);
  }

  clickFrenchLnk(): void {
    helpers.click(this.frenchLnk);
  }

  clickJapaneseLnk(): void {
    helpers.click(this.japaneseLnk);
  }

  clickChineseLnk(): void {
    helpers.click(this.chineseLnk);
  }

  /**
   * Change language to specified index of language  array
   * @param index
   */
  selectLanguage(langArrayData: any[], index: number): any {
    this.clickMobileMainMenu();
    switch (langArrayData[index].trim()) {
      case 'English':
        this.clickLanguageLink();
        this.clickEnglishLnk();
        break;
      case 'Français':
        this.clickLanguageLink();
        this.clickFrenchLnk();
        break;
      case '日本語':
        this.clickLanguageLink();
        this.clickJapaneseLnk();
        break;
      case '中文':
        this.clickLanguageLink();
        this.clickChineseLnk();
        break;
      default:
        logger.info('Incorrect Language');
        break;
    }
    logger.info('Selected Language  : ' + langArrayData[index].trim());
  }

  /**
   * Get all the languages and returns the language array
   * @param currentLang
   * @returns langArray
   */
  getLanguages(currentLang: string): any {
    const langArray = [currentLang];
    this.clickMobileMainMenu();
    this.clickLanguageLink();
    // Static wait required to get the locators properly loaded into DOM
    browser.pause(2000);
    const langlist = this.availableLanguages;
    for (let index = 1; index <= langlist.length - 1; index += 1) {
      const lang: any = langlist[index].getText().trim();
      if (!langArray.includes(lang)) {
        langArray.push(lang);
      }
    }
    // Static wait required to return to main navigation
    browser.pause(1000);
    this.clickNavigationBackBtn();
    this.clickMobileMainMenu();
    return langArray;
  }
}
export default new NavigationPage();
