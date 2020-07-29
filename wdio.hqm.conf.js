require('dotenv').config();
require('ts-node/register');
const suites = require('./config/suites_hqm.config').config;
const reporters = require('./config/reporters.config').config;
const globalTestData = require('./resources/globalTestData');
const fileNameObj = require('./methods/MakeScreenShots');
let screenshotName = '';
exports.config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',
  path: '/wd/hub',
  // ==================
  // Specify Test Files
  // ==================
  specs: ['./test/specs/**/*.ts'],
  // ==============
  // Suites config file
  // ==============
  ...suites,
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  // ============
  // Capabilities
  // ============
  maxInstances: 10,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--headless',
          // '--disable-dev-shm-usage', // Force Chrome to use the /tmp directory instead. This may slow down the execution though.
          '--disable-gpu',
          '--no-sandbox',
          '--window-size=1920,1080',
          '--verbose',
        ],
      },
    },
  ],
  // ===================
  // Test Configurations
  // ===================
  logLevel: 'warn',

  bail: 0,

  baseUrl: process.env.HQM_BASE_URL,

  waitforTimeout: 10000,

  connectionRetryTimeout: 90000,

  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  //   =================
  // Reporters
  // =================
  reporters: [
    [
      'junit',
      {
        outputDir: 'screenshots',
        suiteNameFormat: '/[^a-z0-9]+/',
        outputFileFormat: function (options) {
          // optional
          return `results-${options.cid}.xml`;
        },
      },
    ],
  ],
  // Options to be passed to Mocha.
  mochaOpts: {
    ui: 'bdd',
    require: 'ts-node/register',
    compilers: ['tsconfig-paths/register'],
    timeout: 120000,
  },
  // =====
  // Hooks
  // =====
  /* eslint-disable no-unused-vars, func-names */
  beforeSuite: function (suite) {
    browser.maximizeWindow();
    browser.deleteAllCookies();
    browser.url(this.baseUrl);
    const countryCookies = browser.getCookies([
      'country',
      'gdprCountry',
      'forcedCountry',
    ]);
    console.log('==================================================');
    console.log(' Cookie Info  ');
    for (let index = 0; index < countryCookies.length; index += 1) {
      const cookie = countryCookies[index];
      console.log(cookie.name + ' : ' + cookie.value);
    }
    console.log('==================================================');
  },

  /* eslint-disable no-unused-vars, func-names */
  afterTest: function (
    test,
    context,
    { error, result, duration, passed, retries },
  ) {
    if (!passed) {
      screenshotName = fileNameObj.getScreenShotNameAsTestFileName(
        globalTestData.globalTestData.FILE_PATH,
        this.baseUrl,
      );
      browser.takeScreenshot();
    }
  },

  /* eslint-disable no-unused-vars, func-names */
  after: function (result, capabilities, specs) {
    browser.saveScreenshot(`./screenshots/${screenshotName}.png`);
  },
};
