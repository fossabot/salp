// This store holds all settings data
import { remote } from 'electron'
import general from './general'
import docker from './docker'

const persistenceManager = remote.require('./services/persistence')
const settingsStore = persistenceManager.get('settings')

// types
export const types = {
    SAVE: 'SAVE'
}

// store
const actions = {
    [types.SAVE]() {
        settingsStore.save()
    }
}

export default {
    namespaced: true,
    modules: {
        general,
        docker
    },

    actions
}
