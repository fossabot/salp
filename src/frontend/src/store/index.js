import modules, { PersistedUserPreferences, PersistedAppState, CoursesStorePlugin } from './modules'
import docker from './plugins/docker'

export default {
    plugins: [
        PersistedUserPreferences,
        PersistedAppState,
        CoursesStorePlugin,
        docker
    ],
    modules
}
