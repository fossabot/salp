const path = require('path')
const fileExists = require('fs').existsSync

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    'lodash',
    [
      // Use forked babel plugin for component based includes
      // @url https://github.com/ant-design/babel-plugin-import
      // Note: After removing or adding new files to the theme, the babel-loader cache has to be flushed
      'import',
      {
        'libraryName': 'element-ui',
        'style': name => {
          const component = name.split('/').pop()
          let stylePath = path.resolve(__dirname, `src/renderer/theme/element/${component}.scss`)

          if (!fileExists(stylePath)) {
            stylePath = `element-ui/packages/theme-chalk/src/${component}.scss`
          }

          return stylePath
        }
      }
    ]
  ],
  env: {
    'test': {
      plugins: [
        'rewire'
      ]
    }
  }
}
