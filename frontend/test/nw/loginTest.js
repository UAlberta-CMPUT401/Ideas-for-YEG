module.exports = {
  'Demo test to log in'(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .fullscreenWindow()
      .assert.titleContains('frontend - frontend')
      .useXpath()
      .click("//*[contains(text(), 'Login')]")
      .useCss()
      .assert.urlContains('/login')
      .assert.visible('input[name=Identifier]')
      .click('input[name=Identifier]')
      .setValue('input[name=Identifier]', 'relhajj')
      .assert.visible('input[name=Password]')
      .click('input[name=Password]')
      .setValue('input[name=Password]', '12345678')
      .assert.visible('button[id=loginBtn]')
      .useXpath()
      .click("//*//*[contains(text(), 'Log In')]")
      .pause(5000)
      .waitForElementVisible("//div[text()='Edmonton']")
      .click("//div[text()='Edmonton']")
      .end();
  },
};
