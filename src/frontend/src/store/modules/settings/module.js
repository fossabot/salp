// create a single settings vuex store module
import { remote } from 'electron'

// settings
const settings = remote.require('./services/settings')

let initialSettings = false

function getSettings() {
    if (initialSettings === false) {
        // cache initial settings to reduce IPC calls
        initialSettings = settings.getAll()
    }

    return initialSettings
}

// helpers
function getSettingsState(namespace, defaults) {
    const fields = Object.keys(defaults)
    let settings = getSettings()
    settings = settings.hasOwnProperty(namespace) ? settings[namespace] : {}

    const obj = {}
    fields.forEach(field => {
        obj[field] = settings.hasOwnProperty(field) ? settings[field] : defaults[field]
    })

    return obj
}

/**
 * Creates actions for the given setters
 * @param {string} namespace prefixed to settings.set key
 * @param {string[]} options name of the actions/options
 */
function generateActions(namespace, options) {
    const actions = {}

    options.forEach(name => {
        actions[name] = function({ commit }, { value }) {
            settings.set(namespace + '.' + name, value)

            commit({
                type: '_SET',
                name,
                value
            })
        }
    })

    return actions
}

export default function createSettingsModule(namespace, defaultState) {
    const state = getSettingsState(namespace, defaultState)

    const mutations = {
        _SET(state, { name, value }) {
            state[name] = value
        }
    }

    const options = Object.keys(defaultState)
    const actions = generateActions(namespace, options)

    return {
        namespaced: true,
        state,
        mutations,
        actions
    }
}
