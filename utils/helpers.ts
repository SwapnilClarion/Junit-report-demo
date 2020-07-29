import { logger } from '../config/winstonLogger';
import { Element } from '@wdio/sync';
class Helpers {
  click(selector: Element) {
    try {
      if (!selector.isExisting()) {
        selector.waitForExist(5000);
      }
      selector.click();
    } catch (error) {
      logger.info('Error:= ' + error);
    }
  }

  setValue(selector: Element, txtValue: any) {
    try {
      if (!selector.isExisting()) {
        selector.waitForExist(5000);
      }
      selector.setValue(txtValue);
    } catch (error) {
      logger.info('Error:= ' + error);
    }
  }

  /** To Select value from Dropdown Element
   *  byVisibleText,byAttribute,byIndex
   */
  select(selector, txtValue, typeOfSelect) {
    switch (typeOfSelect) {
      case 'byVisibleText':
        try {
          if (!selector.isExisting()) {
            selector.waitForExist(5000);
          }
          selector.selectByVisibleText(txtValue);
        } catch (error) {
          logger.info('Error:= ' + error);
        }
        break;
      case 'byAttribute':
        //   this is to do : Needs to be customized
        // try {
        //     if (!selector.isExisting()) {
        //       selector.waitForExist(3000);
        //       selector.selectByAttribute(attribute, value)
        //     } else {
        //       selector.selectByAttribute(attribute, value)
        //     }
        //   } catch (error) {
        //     logger.info('Error:= ${error}');
        //   }
        break;
      case 'byIndex':
        try {
          if (!selector.isExisting()) {
            selector.waitForExist(5000);
          }
          selector.selectByIndex(txtValue);
        } catch (error) {
          logger.info('Error:= ' + error);
        }
        break;

      default:
        break;
    }
  }

  /** To get text value of a particular Element
   *
   */
  getText(selector) {
    let elementTxt = '';
    try {
      if (!selector.isExisting()) {
        selector.waitForExist(5000);
      }
      elementTxt = selector.getText();
    } catch (error) {
      logger.info('Error:= ' + error);
    }
    return elementTxt;
  }

  /** To get text value of a particular Element
   *
   */
  getAttribute(selector, attribute) {
    let elementTxt = '';
    try {
      if (!selector.isExisting()) {
        selector.waitForExist(5000);
      }
      elementTxt = selector.getAttribute(attribute);
    } catch (error) {
      logger.info(`Error:= ' + error`);
    }
    return elementTxt;
  }

  getProductID(url) {
    const str = url.split('/');
    const prodid = str[str.length - 1];
    return prodid;
  }
}

export default new Helpers();
