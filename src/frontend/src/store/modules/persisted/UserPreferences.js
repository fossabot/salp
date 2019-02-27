// This store saves all user preferences
import createPersistPlugin from '@/store/plugins/persist'
import { createNamespacedHelpers } from '@/store/utils'

// module constants/info info
export const namespace = 'persisted/UserPreferences'

// types
export const types = {
    GET: 'GET_OPTION',
    SET: 'SET_OPTION'
}

// module
const {
    plugin: PersistedUserPreferences,
    store: persistedStore
} = createPersistPlugin(
    'userpreferences',
    namespace,
    {
        getterType: types.GET,
        mutationType: types.SET
    }
)

export { PersistedUserPreferences }

// defaults
const defaults = {
    username: '',
    path: '~/',
    ml: true,
    allowTracking: false,
    socket: '',
    verifyTls: false,
    certDir: '',
    baseIp: '127.0.0.1',
    setupDone: false
}

// store
export default {
    namespaced: true,
    ...persistedStore,

    state: defaults
}

// helpers
export const createHelpers = createNamespacedHelpers.bind(null, namespace, types.SET)
