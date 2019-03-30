// collect all licenses and write them into a file
const { promisify } = require('util')
const path = require('path')
const fs = require('fs')
const checker = require('license-checker')
const template = require('lodash.template')

const licenseChecker = promisify(checker.init)

function preparePackages(packages) {
    return Object.values(packages)
        .filter(pkg => !pkg.name.includes('@salp'))
        .map(pkg => {
            if (pkg.licenseFile && !pkg.licenseFile.match(/LICENSE/i)) {
                pkg.licenseText = false
            }

            return pkg
        })
}

function compileTemplate(dependencies) {
    // template taken from:
    // https://github.com/Microsoft/license-checker-webpack-plugin/blob/master/src/defaultOutputTemplate.ejs
    const filePath = path.resolve(__dirname, 'licenses.ejs')
    const compiled = template(fs.readFileSync(filePath))

    return compiled({
        dependencies
    })
}

async function run(outputFile) {
    let packages = await licenseChecker({
        start: process.cwd(),
        customFormat: {
            'name': '',
            'publisher': '',
            'version': '',
            'licenses': '',
            'licenseText': '',
            'repository': ''
        }
    })

    packages = preparePackages(packages)
    const output = compileTemplate(packages)

    fs.writeFileSync(outputFile, output)
}

module.exports = run
