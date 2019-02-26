import modules, { PersistedUserPreferences, PersistedAppState, CoursesStorePlugin } from './modules'

export default {
    plugins: [
        PersistedUserPreferences,
        PersistedAppState,
        CoursesStorePlugin
    ],
    modules
}
