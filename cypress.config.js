const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    supportFile: false
  },
  fixturesFolder: false,
  screenshotOnRunFailure: false,
  video: false
})
