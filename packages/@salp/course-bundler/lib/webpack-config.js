// create base config
const path = require('path')
const Config = require('webpack-chain')
const VueLoaderPlugin = require.resolve('vue-loader/lib/plugin')
const CodeInjectionWebpackResolverPlugin = require.resolve('./plugins/code-injection-resolver-plugin.js')
const CopyWebpackPlugin = require.resolve('copy-webpack-plugin')
const ChaptersInjector = require('./injectors/chapters-injector')
const ContentScriptInjector = require('./injectors/content-script-injector')
const BackgroundScriptInjector = require('./injectors/background-script-injector')

const isProduction = process.env.NODE_ENV === 'production'

const packageNodeModules = path.resolve(__dirname, '../node_modules/')
const packageLoaders = path.resolve(__dirname, 'loaders/')

const appPath = path.resolve(__dirname, 'app')

function buildDefaultConfig(options, projectDir, outputDir) {
    const ctx = {
        cwd: projectDir,
        options
    }

    const config = new Config()

    // general
    config.mode(isProduction ? 'production' : 'development')

    // output
    config.output
        .filename('[name].js')
        .path(outputDir)
        .libraryTarget('commonjs2')
        .library('course')

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

    // plugins
    config
        .plugin('vue-loader')
        .use(VueLoaderPlugin)

    config.resolve
        .plugin('injection-plugin')
        .use(CodeInjectionWebpackResolverPlugin, [ctx, '@internal'])

    // resolve loaders
    config.resolveLoader.modules
        .add(packageNodeModules)
        .add(packageLoaders)
        .add(path.resolve(projectDir, 'node_modules/'))

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

    if (options.contentScript) {
        config
            .entry('content-script')
            .add(options.contentScript)
    }

    // plugins
    config.resolve
        .plugin('injection-plugin')
        .tap(args => [...args, [ChaptersInjector, ContentScriptInjector]])

    // user adjustments
    if (options.chainContentWebpack) {
        options.chainContentWebpack(config)
    }

    return config
}

function buildBackgroundConfig(options, projectDir, outputDir) {
    const config = buildDefaultConfig(options, projectDir, outputDir)

    config.target('node')

    // entry scripts
    config
        .entry('background')
        .add(path.resolve(appPath, 'background.js'))

    // plugins
    config.resolve
        .plugin('injection-plugin')
        .tap(args => [...args, [BackgroundScriptInjector]])

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
    if (options.chainBackgroundWebpack) {
        options.chainBackgroundWebpack(config)
    }

    return config
}

module.exports = {
    buildDefaultConfig,
    buildContentConfig,
    buildBackgroundConfig
}
