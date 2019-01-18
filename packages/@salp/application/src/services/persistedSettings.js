// This service is responsible to persist settings
// See also: vuex persist plugin
import { app, ipcMain } from 'electron'
import { promises as fs } from 'fs'
import path from 'path'
import { persistedSettingsDir } from '$src/shared/constants.js'

const emptySettingsFileContent = '{}'

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
        const content = await readSettingsFile(name)

        sender.send(`settings:loaded:${name}`, content)
    } catch (e) {
        if (e.code !== 'ENOENT') {
            throw e
        }

        await writeSettingsFile(name, emptySettingsFileContent)
    }
}

async function settingsSaveHandler({ sender }, name, content) {
    await writeSettingsFile(name, content)

    sender.send(`settings:saved:${name}`)
}

app.on('ready', async () => {
    await ensureSettingsDir()

    ipcMain.on('settings:load', settingsLoadHandler)
    ipcMain.on('settings:save', settingsSaveHandler)
})
