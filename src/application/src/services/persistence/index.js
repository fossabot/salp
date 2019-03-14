// This service will persist settings in a file on the file system
const PersistenceManager = require('./PersistenceManager')

const manager = new PersistenceManager()
manager.create('settings')

module.exports = manager
