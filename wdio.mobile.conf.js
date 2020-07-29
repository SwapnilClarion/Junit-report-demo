require('dotenv').config();
require('ts-node/register');
const suites = require('./config/suites.config').config;
const reporters = require('./config/reporters.config').config;
const globalTestData = require('./resources/globalTestData');
const fileNameObj = require('./methods/MakeScreenShots');
let screenshotName = '';
exports.config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',
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
        mobileEmulation: { deviceName: 'iPhone 6' },
        args: [
          '--headless',
          // '--disable-dev-shm-usage', // Force Chrome to use the /tmp directory instead. This may slow down the execution though.
          '--disable-gpu',
          '--no-sandbox',
          '--window-size=1920,1080',
        ],
      },
    },
  ],
  // ===================
  // Test Configurations
  // ===================
  logLevel: 'warn',

  bail: 0,

  baseUrl: process.env.BASE_URL,

  waitforTimeout: 10000,

  connectionRetryTimeout: 90000,

  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  //   =================
  // Reporters
  // =================
  ...reporters,

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
  before: function (capabilities, specs) {
    // require('ts-node').register({ files: true });
  },
  // 
  beforeSuite: function (suite) {
    browser.maximizeWindow();
    browser.deleteAllCookies();
    browser.url(this.baseUrl);
  },

  afterTest: function (
    test,
    context,
    { error, result, duration, passed, retries },
  ) {
    if (!passed) {
      screenshotName=fileNameObj.getScreenShotNameAsTestFileName(globalTestData.globalTestData.FILE_PATH,this.baseUrl)
      browser.takeScreenshot();
    }
  },

  after: function (result, capabilities, specs) {
    browser.saveScreenshot(`./screenshots/${screenshotName}.png`);
  },
};
