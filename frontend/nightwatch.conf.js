const chromedriver = require('chromedriver');

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['test/nw'],

  webdriver: {
    start_process: true,
    server_path: chromedriver.path,
    port: 9515,
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:1337',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['--headless', '--no-sandbox', '--disable-gpu'],
        },
      },
    },

    selenium: {
      start_process: true,
      server_path: require('selenium-server').path,
      host: '127.0.0.1',
      port: 4444,
      cli_args: {
        'webdriver.chrome.driver': require('chromedriver').path,
        'webdriver.gecko.driver': require('geckodriver').path,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['--headless', '--no-sandbox', '--disable-gpu'],
        },
      },
    },
  },
};
