import { gmailPageLocators } from './pageLocators/GmailPage_Locators';
import helpers from '../utils/helpers';
import { logger } from '../config/winstonLogger';
export class GmailPage extends gmailPageLocators {
  loginToGmail(email: string, pass: string): void {
    helpers.setValue(this.userEmail, email);
    helpers.click(this.emailNextBtn);
    const emailTxt = browser.waitUntil((): any => {
      return this.getEmailIdTxt();
    }, 5000);
    logger.info('Email Id on Password ====> ' + emailTxt);
    helpers.setValue(this.userPassword, pass);
    helpers.click(this.passwordNextBtn);
  }

  getEmailIdTxt(): string {
    const emailLabel = helpers.getText(this.emailIdTxt);
    return emailLabel;
  }

  enterSearchInput(orderID: string): void {
    helpers.setValue(this.searchbox, orderID);
  }

  clickOnMatchedMail(): void {
    helpers.click(this.matchedMail);
  }

  getActualOrderId(): string {
    const oid = this.actualOrderID.getText();
    return oid;
  }

  clickSearchBtn(): void {
    helpers.click(this.searchBtn);
  }
}

export default new GmailPage();
