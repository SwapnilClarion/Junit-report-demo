exports.config = {
  reporters: [
    [
      'allure',
      {
        outputDir: './reports/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],
};
