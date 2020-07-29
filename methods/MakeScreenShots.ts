import path from 'path';
import defaultConfig from './../config/default';
class MakeScreenShots {
  getScreenShotNameAsTestFileName(filename: string, domainUrl: string): string {
    const event = new Date();
    let componentName: string;
    Object.keys(defaultConfig.interfaces).forEach((domain) => {
      if (
        defaultConfig.interfaces[domain].host.substring(
          0,
          defaultConfig.interfaces[domain].host.indexOf('com') + 3,
        ) === domainUrl.substring(0, domainUrl.indexOf('com') + 3)
      ) {
        componentName = domain;
      }
    });
    return `${componentName}_${
      path.parse(path.basename(filename)).name
    }_${event
      .toISOString()
      .substring(0, 10)
      .replace(
        /-/g,
        '',
      )}_${event.getHours()}${event.getMinutes()}${event.getSeconds()}`;
  }
}
module.exports = new MakeScreenShots();
