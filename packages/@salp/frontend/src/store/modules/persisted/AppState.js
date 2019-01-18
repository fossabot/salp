// This store should be used to persist the app's state
import createPersistPlugin from '@/store/plugins/persist'
import { createNamespacedHelpers } from '@/store/utils'

// module constants/info info
export const namespace = 'persisted/AppState'

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
    namespace,
    {
        getterType: types.GET,
        mutationType: types.SET
    }
)

export { PersistedAppState }

// store
export default {
    namespaced: true,
    ...persistedStore,

    state: {
        lastRoute: '/'
    }
}

// helpers
export const createHelpers = createNamespacedHelpers.bind(null, namespace, types.SET)
