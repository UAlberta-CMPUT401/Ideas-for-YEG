module.exports = {
  'Demo test search for idea'(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.titleContains('frontend - frontend')
      .useXpath()
      .click("//div[text()='Edmonton']")
      .useCss()
      .assert.urlContains('YEG/idea-dashboard')
      .assert.visible('input[name=searchTerm]')
      .click('input[name=searchTerm]')
      .setValue('input[name=searchTerm]', 'Library')
      .click('i[role=button]')
      .useXpath()
      .waitForElementVisible(
        "//div[text()='Machine Learning: Exploring Libary Book Data']",
      )
      .end();
  },
};
