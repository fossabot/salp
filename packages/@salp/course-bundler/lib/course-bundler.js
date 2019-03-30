const path = require('path')
const webpack = require('webpack')
const loadConfig = require('./config-loader')
const { buildConfig } = require('./webpack-config')

function determineOutputDir(cwd, given, options) {
    let outputDir

    if (typeof given === 'string' && given) {
        outputDir = given
    }

    if (!outputDir && options.output) {
        outputDir = options.output
    }

    if (!outputDir) {
        outputDir = 'dist/'
    }

    if (!path.isAbsolute(outputDir)) {
        outputDir = path.resolve(cwd, outputDir)
    }

    return outputDir
}

function getWebpackConfig(projectDir, outputDir) {
    const config = loadConfig(projectDir)
    outputDir = determineOutputDir(projectDir, outputDir, config)

    return buildConfig(config, projectDir, outputDir)
}

module.exports = function courseBundler(projectDir, outputDir) {
    const config = getWebpackConfig(projectDir, outputDir)

    const compiler = webpack(config.toConfig())
    compiler.run((err, stats) => {
        if (err) {
            throw new Error('Error building course. Reason: ' + err.message)
        }

        /* eslint-disable-next-line no-console */
        console.log(stats.toString())
    })
}

module.exports.inspect = function inspectConfig(projectDir, outputDir) {
    const config = getWebpackConfig(projectDir, outputDir).toString()

    /* eslint-disable-next-line no-console */
    console.log(config.toString())
}
