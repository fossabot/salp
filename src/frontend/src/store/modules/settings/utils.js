// settings store utils
import { remote } from 'electron'

const persistenceManager = remote.require('./services/persistence')
const settingsStore = persistenceManager.get('settings')

let initialSettings = false

function getSettings() {
    if (initialSettings === false) {
        // cache initial settings to reduce IPC calls
        initialSettings = settingsStore.getAll()
    }

    return initialSettings
}

// util functions
export function getSettingsState(defaults) {
    const fields = Object.keys(defaults)
    const settings = getSettings()

    const obj = {}
    fields.forEach(field => {
        obj[field] = settings.hasOwnProperty(field) ? settings[field] : defaults[field]
    })

    return obj
}

/**
 * Creates actions for the given setters
 * @param {{}} mappings keys are the action names, values the option field name
 */
export function generateActions(mappings) {
    const actions = {}

    Object.entries(mappings).forEach(([action, name]) => {
        actions[action] = function({ commit }, { value }) {
            commit({
                type: '_SET',
                name,
                value
            })

            settingsStore.set(name, value)
        }
    })

    return actions
}

export function createNamespacingHelpers(namespace) {
    function namespaceType(typeName) {
        return `${namespace}/${typeName}`
    }

    return { namespaceType }
}
