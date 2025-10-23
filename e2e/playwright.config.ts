/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: '.',
    workers: 1,
    timeout: 480000,
    outputDir: './screenshots',
    use: {
      headless: true,
      viewport: { width: 1800, height: 800 },
      launchOptions: {
        slowMo: 50,
      },
      trace: 'on',
    },
    expect: {
      toMatchSnapshot: { threshold: 0.2 },
    },
  };
  
  module.exports = config;
  