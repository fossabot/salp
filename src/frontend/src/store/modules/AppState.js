// Transient app state store
import Vue from 'vue'

// module constants/info info
export const namespace = 'AppState'

// types
export const types = {
    SET_CURRENT_COURSE: 'SET_CURRENT_COURSE',
    SET_CONTAINER_STATUS: 'SET_CONTAINER_STATUS',
    SET_CONTAINER_PORTS: 'SET_CONTAINER_PORTS',
    GET_CONTAINER_PORTS_SIMPLE: 'GET_CONTAINER_PORTS_SIMPLE',
    GET_CONTAINER_STATUS: 'GET_CONTAINER_STATUS',
    GET_CONTAINER_STATUS_IS_BLOCKING: 'GET_CONTAINER_STATUS_IS_BLOCKING',
    GET_CONTAINER_UP_COUNT: 'GET_CONTAINER_UP_COUNT',
    GET_ALL_CONTAINERS: 'GET_ALL_CONTAINERS'
}

// module
export default {
    namespaced: true,

    state: {
        currentCourse: null,
        containers: {}
    },

    mutations: {
        [types.SET_CURRENT_COURSE](state, { course }) {
            state.currentCourse = course
        },

        [types.SET_CONTAINER_STATUS](state, { containerName, status }) {
            const container = state.containers[containerName]
            if (!container) {
                Vue.set(state.containers, containerName, {})
            }
            Vue.set(state.containers[containerName], 'status', status)
        },

        [types.SET_CONTAINER_PORT](state, { containerName, containerPort, hostPorts }) {
            const container = state.containers[containerName]
            if (!container) {
                Vue.set(state.containers, containerName, {})
            }
            const ports = state.containers[containerName].ports
            if (!ports) {
                Vue.set(state.containers[containerName], 'ports', {})
            }
            Vue.set(state.containers[containerName].ports, containerPort, hostPorts)
        }
    },

    getters: {
        [types.GET_CONTAINER_STATUS](state) {
            return containerName => {
                const container = state.containers[containerName]
                if (!container) {
                    return 'removed'
                }
                const status = state.containers[containerName].status
                if (!status) {
                    return 'removed'
                }

                return status
            }
        },

        [types.GET_CONTAINER_UP_COUNT](state) {
            return courseName => {
                const courseContainerName = `salp_${courseName}_`
                let containersUp = 0
                for (const containerName in state.containers) {
                    const container = state.containers[containerName]
                    if (containerName.indexOf(courseContainerName) !== -1 && container.status === 'running') {
                        containersUp = containersUp + 1
                    }
                }

                return containersUp
            }
        },

        [types.GET_CONTAINER_STATUS_IS_BLOCKING](state) {
            return courseName => {
                const courseContainerName = `salp_${courseName}_`
                let blockingCount = 0
                for (const containerName in state.containers) {
                    const container = state.containers[containerName]
                    if (containerName.indexOf(courseContainerName) !== -1
                        && !(container.status === 'running' || container.status === 'exited'
                        || container.status === 'removed')) {
                        blockingCount = blockingCount + 1
                    }
                }
                console.log('blocking', blockingCount)

                return blockingCount > 0
            }
        },

        [types.GET_CONTAINER_PORTS_SIMPLE](state) {
            return containerName => {
                const container = state.containers[containerName]
                if (!container) {
                    return []
                }
                const ports = state.containers[containerName].ports
                if (!ports) {
                    return []
                }

                const result = []
                for (const port in ports) {
                    const portsArray = ports[port]
                    for (const portElement of portsArray) {
                        result.push(portElement)
                    }
                }

                return result
            }
        },

        [types.GET_ALL_CONTAINERS](state) {
            return state.containers
        }
    }
}
