const persisted = require('./persistedSettings.js')
const dockerService = require('./dockerService.js')

persisted()

module.exports = { persisted, dockerService }
