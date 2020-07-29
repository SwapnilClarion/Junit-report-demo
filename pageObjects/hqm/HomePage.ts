import helpers from '../../utils/helpers';
import { Element } from '@wdio/sync';
class HomePage {
  // Customer Support Component Locators
  /** ------------------------------------------------------------------------------------ */
  get labelCustomerSupport(): Element {
    return $(
      'body > div.wrapper.row-offcanvas.row-offcanvas-left > div > div.row > div:nth-child(4) > ' +
        'div > div.box-header > h2',
    );
  }

  get linkMasterOrder(): Element {
    return $(
      'body > div.wrapper.row-offcanvas.row-offcanvas-left > div > div.row > div:nth-child(4) > ' +
        'div > div.box-body > ul > div:nth-child(1) > a',
    );
  }

  get linkCreateNewOrder(): Element {
    return $(
      'body > div.wrapper.row-offcanvas.row-offcanvas-left > div > div.row > div:nth-child(4) > div > ' +
        'div.box-body > ul > div:nth-child(2) > a',
    );
  }

  get linkPriceChecker(): Element {
    return $(
      'body > div.wrapper.row-offcanvas.row-offcanvas-left > div > div.row > div:nth-child(4) > div > ' +
        'div.box-body > ul > div:nth-child(3) > a',
    );
  }

  /** ------------------------------------------------------------------------------------ */
  /** ----------------------------------Customer Support-------------------------------------------------- */
  getLabelCustomerSupportTxt(): string {
    const labelCustomerSupport: string = helpers.getText(
      this.labelCustomerSupport,
    );
    return labelCustomerSupport;
  }

  clickMasterOrder(): void {
    helpers.click(this.linkMasterOrder);
  }

  clickCreateNewOrder(): void {
    helpers.click(this.linkCreateNewOrder);
  }

  clickPriceChecker(): void {
    helpers.click(this.linkPriceChecker);
  }
  /** ---------------------------------------------------------------------------------- */
}

export default new HomePage();
