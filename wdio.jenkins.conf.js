const suites = require('./config/suites.config').config;
require('ts-node/register');
require('dotenv').config();
const globalTestData = require('./resources/globalTestData');
const fileNameObj = require('./methods/MakeScreenShots');
let screenshotName ='';
exports.config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',
  //
  // Override default path ('/wd/hub') for chromedriver service.
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
      maxInstances: 5,
      browserName: 'chrome',
    },
  ],
  // ===================
  // Test Configurations
  // ===================

  logLevel: 'info',
  bail: 0,
  baseUrl: process.env.BASE_URL,
  waitforTimeout: 10000,

  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  //   =================
  // Reporters
  // =================
  ...reporters,

  mochaOpts: {
    ui: 'bdd',
    require: 'ts-node/register',
    compilers: [
        'tsconfig-paths/register'
    ],
    timeout: 120000,
  },
  // =====
  // Hooks
  // =====

  beforeSuite: function (suite) {
    browser.maximizeWindow();
    browser.deleteAllCookies();
    browser.url(this.baseUrl);
    const countryCookies = browser.getCookies(['country','gdprCountry','forcedCountry']);
    console.log('==================================================');
    console.log(" Cookie Info  ");
    for (let index = 0; index < countryCookies.length; index+=1) {
      const cookie = countryCookies[index];
      console.log(cookie.name +' : ' + cookie.value);
    }
    console.log('==================================================');
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
