const path = require('path')
const fileExists = require('fs').existsSync

const isTesting = process.env.NODE_ENV === 'test'
const isE2ETesting = process.env.npm_lifecycle_event && process.env.npm_lifecycle_event === 'test:e2e'

const babelConfig = {
    presets: [
        '@vue/app'
    ],
    plugins: [
        'lodash'
    ]
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

if (isE2ETesting) {
    babelConfig.plugins.push('@babel/plugin-transform-spread')
    babelConfig.presets[0] = [
        '@vue/app',
        {
            targets: {
                'Electron': '1.8'
            }
        }
    ]
}

module.exports = babelConfig
