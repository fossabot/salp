// general settings in vuex store
import { createNamespacingHelpers, getSettingsState, generateActions } from './utils'

// types
const { namespaceType } = createNamespacingHelpers('settings/general')

export const types = {
    SET_USERNAME: namespaceType('SET_USERNAME'),
    SET_ALLOW_TRACKING: namespaceType('SET_ALLOW_TRACKING'),
    SET_MACHINE_LEARNING: namespaceType('SET_MACHINE_LEARNING'),
    SET_SETUP_DONE: namespaceType('SET_SETUP_DONE')
}

// initial state (defaults)
const state = getSettingsState({
    username: '',
    allow_tracking: false,
    machine_learning: false,
    setup_done: false
})

const mutations = {
    _SET(state, { name, value }) {
        state[name] = value
    }
}

const actions = generateActions({
    SET_USERNAME: 'username',
    SET_ALLOW_TRACKING: 'allow_tracking',
    SET_MACHINE_LEARNING: 'machine_learning',
    SET_SETUP_DONE: 'setup_done'
})

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
