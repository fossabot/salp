import UserPreferences from './UserPreferences'
import AppState from './AppState'

export { PersistedUserPreferences } from './UserPreferences'
export { PersistedAppState } from './AppState'

export default {
    namespaced: true,

    modules: {
        UserPreferences,
        AppState
    }
}
