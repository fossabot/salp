// This store holds all settings data
import { remote } from 'electron'
const persistenceManager = remote.require('./services/persistence')
const settingsStore = persistenceManager.get('settings')

export const namespace = 'settings'

// types
export const types = {
    SET_USERNAME: 'SET_USERNAME',
    SET_ML: 'SET_ML',
    SET_ALLOW_TRACKING: 'SET_ALLOW_TRACKING',
    SET_SOCKET: 'SET_SOCKET',
    SET_VERIFY_TLS: 'SET_VERIFY_TLS',
    SET_CERT_DIR: 'SET_CERT_DIR',
    SET_BASE_IP: 'SET_BASE_IP',

    SET_SETUP_DONE: 'SET_SETUP_DONE',

    SAVE: 'save',

    GET_USERNAME: 'GET_USERNAME',
    GET_ML: 'GET_ML',
    GET_ALLOW_TRACKING: 'GET_ALLOW_TRACKING',
    GET_SOCKET: 'GET_SOCKET',
    GET_VERIFY_TLS: 'GET_VERIFY_TLS',
    GET_CERT_DIR: 'GET_CERT_DIR',
    GET_BASE_IP: 'GET_BASE_IP',

    GET_SETUP_DONE: 'GET_SETUP_DONE'
}

const namespacedTypes = { ...types }
Object.entries(namespacedTypes).forEach(([key, value]) => {
    namespacedTypes[key] = `${namespace}/${value}`
})

export { namespacedTypes }

// defaults
const defaults = {
    // user preferences
    username: '',
    ml: true,
    allowTracking: false,
    socket: '',
    verifyTls: false,
    certDir: '',
    baseIp: '127.0.0.1',

    // app-state
    setupDone: false
}

// helper functions
function generateSimpleSetters(setters) {
    const fns = {}

    setters.forEach(([prop, setterName]) => {
        fns[setterName] = function(state, payload) {
            settingsStore.set(prop, payload.value)
            state[prop] = payload.value
        }
    })

    return fns
}

function generateSimpleGetters(getters) {
    const fns = {}

    getters.forEach(([prop, getterName]) => {
        fns[getterName] = function(state) {
            return state[prop]
        }
    })

    return fns
}

// store
export default {
    namespaced: 'true',
    state: Object.assign({}, defaults, settingsStore.getAll()),

    mutations: {
        ...generateSimpleSetters([
            ['username', types.SET_USERNAME],
            ['ml', types.SET_ML],
            ['allowTracking', types.SET_ALLOW_TRACKING],
            ['socket', types.SET_SOCKET],
            ['verifyTls', types.SET_VERIFY_TLS],
            ['certDir', types.SET_CERT_DIR],
            ['baseIp', types.SET_BASE_IP],

            ['setupDone', types.SET_SETUP_DONE]
        ])
    },

    actions: {
        [types.SAVE]() {
            settingsStore.save()
        }
    },

    getters: {
        ...generateSimpleGetters([
            ['username', types.GET_USERNAME],
            ['ml', types.GET_ML],
            ['allowTracking', types.GET_ALLOW_TRACKING],
            ['socket', types.GET_SOCKET],
            ['verifyTls', types.GET_VERIFY_TLS],
            ['certDir', types.GET_CERT_DIR],
            ['baseIp', types.GET_BASE_IP],

            ['setupDone', types.GET_SETUP_DONE]
        ])
    }
}
