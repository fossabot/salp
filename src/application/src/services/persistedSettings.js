// This service is responsible to persist settings
// See also: vuex persist plugin
const { app, ipcMain } = require('electron')
const { promises: fs } = require('fs')
const path = require('path')
const { persistedSettingsDir } = require('../constants')

const emptySettingsFileContent = '{}'

const settings = {}

const settingsDir = path.resolve(app.getPath('userData'), persistedSettingsDir)

async function ensureSettingsDir() {
    try {
        await fs.mkdir(settingsDir)
    } catch (e) {
        if (e.code !== 'EEXIST') {
            throw e
        }
    }
}

function getSettingsFileName(name) {
    return path.resolve(settingsDir, `${name}.json`)
}

async function writeSettingsFile(name, content) {
    return fs.writeFile(getSettingsFileName(name), content)
}

async function readSettingsFile(name) {
    return fs.readFile(getSettingsFileName(name))
}

async function settingsLoadHandler({ sender }, name) {
    try {
        const data = await readSettingsFile(name)

        const content = JSON.parse(data) || {}

        settings[name] = content

        sender.send(`settings:loaded:${name}`, content)
    } catch (e) {
        if (e.code !== 'ENOENT') {
            throw e
        }

        await writeSettingsFile(name, emptySettingsFileContent)
    }
}

async function settingsSaveHandler({ sender }, name, content) {
    const data = JSON.stringify(content)
    await writeSettingsFile(name, data)

    settings[name] = content

    sender.send(`settings:saved:${name}`)
}

app.on('ready', async () => {
    await ensureSettingsDir()

    ipcMain.on('settings:load', settingsLoadHandler)
    ipcMain.on('settings:save', settingsSaveHandler)
})

function getSettings(name) {
    return settings.userpreferences[name]
}

module.exports = { getSettings }
