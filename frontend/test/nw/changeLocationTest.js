module.exports = {
  'Demo test to change locations'(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .fullscreenWindow()
      .assert.titleContains('frontend - frontend')
      .useXpath()
      .pause(5000)
      .click("//div[text()='Edmonton']")
      .useCss()
      .assert.urlContains('yeg/idea-dashboard')
      .useXpath()
      .click("//*[contains(text(), 'Change Location')]")
      .pause(5000)
      .click("//div[text()='Calgary']")
      .useCss()
      .assert.urlContains('yyc/idea-dashboard')
      .end();
  },
};
