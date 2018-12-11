// This store saves all user preferences
import createPersistPlugin from '@/store/plugins/persist'

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
    'persisted/UserPreferences',
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
    ml: true
}

// store
export default {
    namespaced: true,
    ...persistedStore,

    state: defaults
}
