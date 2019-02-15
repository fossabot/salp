const path = require('path')
const fileExists = require('fs').existsSync

const isTesting = process.env.NODE_ENV === 'test'

const babelConfig = {
    presets: [
        '@vue/app'
    ],
    plugins: []
}

if (!isTesting) {
    babelConfig.plugins.push([
    // Use forked babel plugin for component based includes
    // @url https://github.com/ant-design/babel-plugin-import
    // Note: After removing or adding new files to the theme, the babel-loader cache has to be flushed
        'import',
        {
            'libraryName': 'element-ui',
            'style': name => {
                const component = name.split('/').pop()
                let stylePath = path.resolve(__dirname, `src/theme/element/${component}.scss`)

                if (!fileExists(stylePath)) {
                    stylePath = `element-ui/packages/theme-chalk/src/${component}.scss`
                }

                return stylePath
            }
        }
    ])
} else {
    babelConfig.plugins.push('rewire')
}

module.exports = babelConfig
