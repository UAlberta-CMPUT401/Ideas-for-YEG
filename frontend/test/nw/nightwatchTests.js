module.exports = {
  'Demo test to search for idea'(browser) {
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
      .assert.visible('input[name=searchTerm]')
      .click('input[name=searchTerm]')
      .setValue('input[name=searchTerm]', 'Library')
      .click('i[role=button]')
      .useXpath()
      .pause(5000)
      .waitForElementVisible(
        "//div[text()='Machine Learning: Exploring Libary Book Data']",
      )
      .end();
  },
};
