module.exports = {
  'Demo test to follow and unfollow an idea'(browser) {
    browser
      .url('http://localhost:3000/login')
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
      .useCss()
      .assert.visible('button[id=follow]')
      .click('button[id=follow]')
      .assert.visible('button[id=following]')
      .click('button[id=following]')
      .end();
  },
};
