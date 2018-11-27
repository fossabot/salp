// https://docs.cypress.io/guides/guides/plugins-guide.html

const webpack = require('@cypress/webpack-preprocessor')

// Resolve project webpack config with custom settings rather than default
function getWebpackConfig() {
  const Service = require('@vue/cli-service/lib/Service')
  // Disable external plugins because they might use ES6 features
  service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd(), { plugins: [] })
  service.init(process.env.VUE_CLI_MODE || process.env.NODE_ENV)
  return service.resolveWebpackConfig()
}

module.exports = (on, config) => {
  on('file:preprocessor', webpack({
    webpackOptions: getWebpackConfig(),
    watchOptions: {}
  }))

  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/renderer/fixtures',
    integrationFolder: 'tests/e2e/renderer/specs',
    screenshotsFolder: 'tests/e2e/renderer/screenshots',
    videosFolder: 'tests/e2e/renderer/videos',
    supportFile: 'tests/e2e/renderer/support/index.js'
  })
}
