import { logger } from '../config/winstonLogger';
import { Element } from '@wdio/sync';
class GetNotification {
  get notification(): Element {
    return $('div.notification-message-container>span>span>span');
  }

  getNotificationText() {
    let notification;
    browser.pause(2000); // Static wait is needed as it takes time to display notification
    try {
      if (!this.notification.isDisplayed()) {
        notification = 'Notification is not displayed or it is closed';
        logger.info(notification);
      } else {
        this.notification.waitForExist(5000);
        notification = this.notification.getText();
        return notification;
      }
    } catch (error) {
      logger.info(`Error ==> ${error}`);
    }
    return notification;
  }
}
export default new GetNotification();
