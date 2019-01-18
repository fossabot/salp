import modules, { PersistedUserPreferences, PersistedAppState } from './modules'

export default {
    plugins: [
        PersistedUserPreferences,
        PersistedAppState
    ],
    modules
}
