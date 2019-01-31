const path = require('path')
const webpack = require('webpack')
const loadConfig = require('./config-loader')
const { buildContentConfig, buildBackgroundConfig } = require('./webpack-config')

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

    return [
        buildContentConfig(config, projectDir, outputDir),
        buildBackgroundConfig(config, projectDir, outputDir)
    ]
}

module.exports = function courseBundler(projectDir, outputDir) {
    const config = getWebpackConfig(projectDir, outputDir).map(c => c.toConfig())

    const compiler = webpack(config)
    compiler.run((err, stats) => {
        if (err) {
            throw new Error('Error building course. Reason: ' + err.message)
        }

        console.log(stats.toString())
    })
}

module.exports.inspect = function inspectConfig(projectDir, outputDir) {
    const config = getWebpackConfig(projectDir, outputDir).map(c => c.toString())

    console.log(config)
}
