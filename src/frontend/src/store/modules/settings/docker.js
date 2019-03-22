// Docker settings in vuex store
import { getSettingsState, generateActions, createNamespacingHelpers } from './utils'

// types
const { namespaceType } = createNamespacingHelpers('settings/general')

export const types = {
    SET_SOCKET: namespaceType('SET_SOCKET'),
    SET_VERIFY_TLS: namespaceType('SET_VERIFY_TLS'),
    SET_CERT_DIR: namespaceType('SET_CERT_DIR'),
    SET_BASE_IP: namespaceType('SET_BASE_IP')
}

// initial state (defaults)
const state = getSettingsState({
    socket: '',
    verify_tls: false,
    cert_dir: '',
    base_ip: '127.0.0.1'
})

const mutations = {
    _SET(state, { name, value }) {
        state[name] = value
    }
}

const actions = generateActions({
    SET_SOCKET: 'socket',
    SET_VERIFY_TLS: 'verify_tls',
    SET_CERT_DIR: 'cert_dir',
    SET_BASE_IP: 'base_ip'
})

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
