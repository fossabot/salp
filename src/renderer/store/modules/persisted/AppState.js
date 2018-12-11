// This store should be used to persist the app's state
import createPersistPlugin from '@/store/plugins/persist'

// types
export const types = {
    GET: 'GET_STATEPROP',
    SET: 'SET_STATEPROP'
}

// module
const {
    plugin: PersistedAppState,
    store: persistedStore
} = createPersistPlugin(
    'appstate',
    'persisted/AppState',
    {
        getterType: types.GET,
        mutationType: types.SET
    }
)

export { PersistedAppState }

export default {
    namespaced: true,
    ...persistedStore,

    state: {
        lastRoute: '/'
    }
}
