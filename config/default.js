module.exports = {
  appId: 'ssense-e2e',
  interfaces: {
    hqm: {
      host: 'https://hqm-qa.ssense.com/core/auth/login',
      user: 'admin',
      password: 'admin',
    },
    hq: {
      host: 'https://hq-qa.ssense.com',
      user: 'jarin.manuvel',
      password: 'admin',
    },
    website: {
      host: 'https://qa.ssense.com/',
      user: 'admin',
      password: 'admin',
    },
  },
};
