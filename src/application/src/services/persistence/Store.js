// storage class which handles actual file loading/saving
const { app } = require('electron')
const fs = require('fs')
const path = require('path')
const { log } = require('../log')
const { persistedSettingsDir } = require('../../constants')

function ensureDir(path) {
    try {
        fs.mkdirSync(path, {
            recursive: true
        })
    } catch (e) {
        if (e.code !== 'EEXIST') {
            throw e
        }
    }
}

class Store {
    constructor(name) {
        this.name = name
        this._data = {}

        const settingsDir = path.join(app.getPath('userData'), persistedSettingsDir)
        this.path = path.join(settingsDir, name + '.json')

        ensureDir(settingsDir)
    }

    load() {
        try {
            const raw = fs.readFileSync(this.path)

            this._data = JSON.parse(raw)
        } catch (e) {
            log.error(`Could not load settings "${this.name}" at path "${this.path}". Reason: ${e}` )
            throw e
        }
    }

    loadOrCreate() {
        try {
            this.load()
        } catch (e) {
            if (e.code !== 'ENOENT') {
                throw e
            }

            this.save()
        }
    }

    save() {
        const raw = JSON.stringify(this._data)

        try {
            fs.writeFileSync(this.path, raw)
        } catch (e) {
            log.error(`Could not save settings "${this.name}" in "${this.path}". Reason: ${e}` )
            throw e
        }
    }

    get(key) {
        return this._data[key]
    }

    set(key, value) {
        this._data[key] = value

        this.save()
    }

    has(key) {
        return this._data.hasOwnProperty(key)
    }

    getAll() {
        return this._data
    }
}

module.exports = Store
