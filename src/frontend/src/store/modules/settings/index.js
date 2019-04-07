// This store holds all settings data
import general from './general'
import docker from './docker'

// store
export default {
    namespaced: true,
    modules: {
        general,
        docker
    }
}
