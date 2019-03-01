// create base config
const path = require('path')
const Config = require('webpack-chain')
const VueLoaderPlugin = require.resolve('vue-loader/lib/plugin')
const CopyWebpackPlugin = require.resolve('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const packageNodeModules = path.resolve(__dirname, '../node_modules/')
const packageLoaders = path.resolve(__dirname, 'loaders/')

const appPath = path.resolve(__dirname, 'app')

const internalInjectors = path.resolve(__dirname, 'injectors/')

function buildDefaultConfig(options, projectDir, outputDir) {
    const config = new Config()

    // general
    config.mode(isProduction ? 'production' : 'development')

    // output
    config.output
        .filename('[name].js')
        .path(outputDir)
        .libraryTarget('commonjs2')
        .library('course')

    // alias resolving
    config.resolve.alias
        .set('@internal', internalInjectors)

    // module
    config.module
        .rule('vue')
            .test(/\.vue$/)
            .use('vue-loader')
                .loader('vue-loader')

    config.module
        .rule('content')
            .test(/\.md$/)
            .use('vue-loader')
                .loader('vue-loader')
                .end()
            .use('markdown-loader')
                .loader('@salp/markdown-loader')

    config.module
        .rule('manifest-file')
            .test(/manifest\.js$/)
            .use('file-loader')
                .loader('file-loader')
                .options({ name: 'manifest.json' })

    config.module
        .rule('dynamic-injection')
            .test(/injectors\/.+\.js$/)
            .use('val-loader')
                .loader('val-loader')
                .options({
                    ...options
                })

    /*config.module
        .rule('manifest')
            .test(/manifest$/)
            .use('extract-manifest')
                .loader(ExtractTextPlugin.extract({
                    use: 'val-loader'
                }))*/

    // plugins
    config
        .plugin('vue-loader')
        .use(VueLoaderPlugin)

    /*config
        .plugin('extract-manifest')
        .use(ExtractTextPlugin, [])*/

    // resolve loaders
    config.resolveLoader.modules
        .add(packageNodeModules)
        .add(packageLoaders)
        .add(path.resolve(projectDir, 'node_modules/'))

    // core courses fixes
    if (projectDir.includes('salp/packages/salp-course')) {
        config.plugin('copy-package-info')
            .use(CopyWebpackPlugin, [[
                {
                    from: path.resolve(projectDir, 'package.json'),
                    to: outputDir
                }
            ]])
    }

    // user adjustments
    if (options.chainWebpack) {
        options.chainWebpack(config)
    }

    return config
}

function buildContentConfig(options, projectDir, outputDir) {
    const config = buildDefaultConfig(options, projectDir, outputDir)

    config.target('web')

    // entry scripts
    config
        .entry('content')
        .add(path.resolve(appPath, 'content.js'))

    // output
    config.output
        .libraryTarget('window')

    // external salp api
    config.externals({
        'salp': 'salp'
    })

    // user adjustments
    if (options.chainUserWebpack) {
        options.chainUserWebpack(config)
    }

    return config
}

module.exports = {
    buildDefaultConfig,
    buildContentConfig
}