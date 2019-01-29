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

if (isTesting) {
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
