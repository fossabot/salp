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

function buildConfig(options, projectDir, outputDir) {
    const config = new Config()

    // general
    config.mode(isProduction ? 'production' : 'development')
    config.target('web')

    // entry scripts
    config
        .entry('content')
        .add(path.resolve(appPath, 'content.js'))

    // output
    config.output
        .filename('[name].js')
        .path(outputDir)
        .libraryTarget('window')
        .library('course')

    // alias resolving
    config.resolve.alias
        .set('@internal', internalInjectors)

    // external salp api
    config.externals({
        'salp': 'salp'
    })

    // module
    config.module
        .rule('vue')
            .test(/\.vue$/)
            .use('vue-loader')
                .loader('vue-loader')
                .options({
                    transformAssetUrls: {
                        'SimpleImage': 'src',
                        'AdvancedImage': 'src',
                        'SimpleVideo': 'src',
                        'AppPreview': 'src'
                    }
                })

    config.module
        .rule('content')
            .test(/\.md$/)
            .use('vue-loader')
                .loader('vue-loader')
            .end()
            .use('markdown-loader')
                .loader('@salp/markdown-loader')
                .options({
                    sourceDir: projectDir
                })

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

    config.module
        .rule('assets/images')
            .test( /\.(png|jpg|gif|svg)$/)
            .use('file-loader')
                .loader('file-loader')
                .options({
                    name: 'assets/img/[name].[hash:8].[ext]',
                    publicPath: '/course-files/'
                })

    // plugins
    config
        .plugin('vue-loader')
        .use(VueLoaderPlugin)

    // resolve loaders
    config.resolveLoader.modules
        .add(packageNodeModules)
        .add(packageLoaders)
        .add(path.resolve(projectDir, 'node_modules/'))

    // core courses fixes
    if (projectDir.includes('salp/courses/salp-course')) {
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

module.exports = {
    buildConfig
}
