module.exports = {
  'Demo test to get idea details page'(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .fullscreenWindow()
      .assert.titleContains('frontend - frontend')
      .useXpath()
      .click("//div[text()='Edmonton']")
      .useCss()
      .assert.urlContains('yeg/idea-dashboard')
      .assert.visible('input[name=searchTerm]')
      .click('input[name=searchTerm]')
      .setValue('input[name=searchTerm]', 'Machine')
      .pause(5000)
      .click('i[role=button]')
      .useXpath()
      .waitForElementVisible(
        "//div[text()='Machine Learning: Exploring Libary Book Data']",
      )
      .click("//div[text()='Machine Learning: Exploring Libary Book Data']")
      .assert.urlContains(
        'yeg/ideas/Machine-Learning:-Exploring-Libary-Book-Data',
      )
      .end();
  },
};
