require('dotenv').config();
require('ts-node/register');
const suites = require('./config/suites.config').config;
const reporters = require('./config/reporters.config').config;
const globalTestData = require('./resources/globalTestData');
const fileNameObj = require('./methods/MakeScreenShots');
let screenshotName ='';
exports.config = {
  runner: 'local',
  // =================
  // Service Providers
  // =================
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_ACCESSKEY,
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

      // os: process.env.OS,
      // os_version: process.env.OS_VERSION,
      // browser: process.env.BROWSER,
      // browser_version: process.env.BROWSER_VERSION,
      // resolution: process.env.RESOLUTION,

      os : "OS X",
      os_version : "Catalina",
      browserName : "Chrome",
      browser_version : "80.0",
      resolution : "1920x1080",
      project : "E2E tests",
      build : "Build1"+Date.now(),
      geoLocation : "ca",
      console : "warnings",       
      networkLogs: true,
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

  services: ['browserstack'],

  framework: 'mocha',
  //   =================
  // Reporters
  // =================
  ...reporters,
  // Options to be passed to Mocha.
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
  before: function (capabilities, specs) {
    // require('ts-node').register({ files: true });
    browser.url(this.baseUrl);
    browser.setCookies({
      name: 'x-px-access-token',
      value: 'rkRJRxQkMySmsl8ci3hwkUaoQ0KxWWXMcViK5qgWCQ2epWez0FkZXPPBu5kva7R4',
    });
    browser.refresh();
  },
  beforeSuite: function (suite) {
    browser.maximizeWindow();
    //browser.deleteAllCookies();
    //browser.url(this.baseUrl);
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
      browser.takeScreenshot();
    }
  },

  after: function (result, capabilities, specs) {
    browser.saveScreenshot(`./screenshots/${screenshotName}.png`);
  },
};
