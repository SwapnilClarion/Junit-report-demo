class ShippingMethod {
  cleanUpString(txt: string): string {
    return txt.trim().replace(/[\n\r\t]+|\s{2,}/g, ' ');
  }

  matchAll(regex: any, text: any): any {
    const txtString = this.cleanUpString(text);
    const ex: any = regex.exec(txtString);
    return ex === null ? [] : [...ex];
  }

  getShippingMethod(locator: any): any {
    const text = locator.getText();
    const regEx: any = /\b(.+?) (\d+) days?.+?\[ (.+?) \]/gim;
    const shipment: any = this.matchAll(regEx, text.trim());
    return {
      method: shipment[1],
      days: parseInt(shipment[2], 10),
      service: shipment[3],
    };
  }

  getShippingMethodOptions(selector: any): any {
    const shippingOptions = selector;
    const ret = [];
    shippingOptions.forEach((element) => {
      const offer = this.matchAll(
        /(.+?) - (\d+) day.+?(\d+\.\d+)/gim,
        this.cleanUpString(element.getText()),
      );
      ret.push({
        method: offer[1],
        days: parseInt(offer[2], 10),
        price: parseFloat(offer[3]),
      });
    });
    return ret;
  }
}
export default new ShippingMethod();
