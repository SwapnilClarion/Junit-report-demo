import { logger } from '../config/winstonLogger';
import productDescriptionPage from '../pageObjects/ProductDescriptionPage';
import checkoutPage from '../pageObjects/CheckoutPage';
import notification from './GetNotification';
class ShoppingCartMethods {
  addShoppingCartLimitProducts(cartLimit: number) {
    for (let index = 1; index <= cartLimit; index += 1) {
      productDescriptionPage.addToBag();
      browser.waitUntil((): any => {
        return notification.getNotificationText();
      }, 5000);
      checkoutPage.closeAllNotification();
      // Static wait is to handle stale element exception
      // which cannot be handled with dynamic wait
      browser.pause(1000);
      logger.info('Product added ==> ' + index);
    }
  }
}
export default new ShoppingCartMethods();
