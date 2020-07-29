import gmailPage from '../pageObjects/GmailPage';
import { checkoutTestData } from '../resources/checkoutTestData';
import { logger } from '../config/winstonLogger';

class GmailCheckMethod {
  loginAndSearch(orderId: string) {
    gmailPage.loginToGmail(
      checkoutTestData.GMAIL_EMAIL,
      checkoutTestData.GMAIL_PASSWORD,
    );
    browser.pause(30000);
    browser.refresh();
    gmailPage.enterSearchInput(orderId);
    browser.keys('Enter');
  }

  openMatchedEmail(orderId: string): string {
    if (gmailPage.emptyMessageTable.isExisting()) {
      const emptyMessage: boolean = browser.waitUntil(() => {
        return gmailPage.emptyMessageTable.getText() !== null;
      });
      logger.info('Empty Message Status ===> ' + emptyMessage);
      if (emptyMessage) {
        logger.info(
          'Email is Not available Err Msg ===>' +
            gmailPage.emptyMessageTable.getText(),
        );
        browser.refresh();
        gmailPage.enterSearchInput(orderId);
        gmailPage.clickSearchBtn();
        gmailPage.clickOnMatchedMail();
      }
    } else {
      logger.info('Email is Available ====');
      gmailPage.clickOnMatchedMail();
    }
    const emailOrderId: string = gmailPage.getActualOrderId();
    return emailOrderId;
  }
}
export default new GmailCheckMethod();
