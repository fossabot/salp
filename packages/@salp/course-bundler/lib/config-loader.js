// resolve course config
const path = require('path')
const fs = require('fs')

const configFileName = 'course.config.js'

function resolveCourseConfig(projectDir) {
    const configFilePath = path.join(projectDir, configFileName)

    if (!fs.existsSync(configFilePath)) {
        throw new Error(`Course build config file "${configFileName}" not found in "${projectDir}"!`)
    }

    return configFilePath
}

function validateConfig(config) {
    const configType = typeof config
    if (configType !== "object") {
        throw new Error(`Course build config must export an object, got "${configType}"`)
    }

    // TODO: (maybe) implement schema validation
}

module.exports = function loadCourseConfig(projectDir) {
    const configFilePath = resolveCourseConfig(projectDir)
    const courseConfig = require(configFilePath)

    validateConfig(courseConfig)

    return courseConfig
}
