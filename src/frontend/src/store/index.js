import modules, { PersistedUserPreferences, PersistedAppState, CoursesStorePlugin, DockerPlugin } from './modules'

export default {
    plugins: [
        PersistedUserPreferences,
        PersistedAppState,
        CoursesStorePlugin,
        DockerPlugin
    ],
    modules
}
