import modules, { PersistedUserPreferences, PersistedAppState } from './modules'
import docker from './plugins/docker'

export default {
    plugins: [
        PersistedUserPreferences,
        PersistedAppState,
        docker
    ],
    modules
}
