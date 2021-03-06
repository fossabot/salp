// Transient app state store
import Vue from 'vue'
export { default as DockerPlugin } from '@/store/plugins/docker'

// module constants/info info
export const namespace = 'AppState'

// types
export const types = {
    SET_CURRENT_COURSE: 'SET_CURRENT_COURSE',
    SET_LOADED_COURSES: 'SET_LOADED_COURSES',
    GET_LOADED_COURSE: 'GET_LOADED_COURSES',
    GET_LOADED_COURSES_IDS: 'GET_LOADED_COURSES_IDS',
    SET_CONTAINER_STATUS: 'SET_CONTAINER_STATUS',
    SET_CONTAINER_PORTS: 'SET_CONTAINER_PORTS',
    SET_DOCKER_READY: 'SET_DOCKER_READY',
    SET_DOCKER_ERROR: 'SET_DOCKER_ERROR',
    SET_DOCKER_PULL_PROGRESS: 'SET_DOCKER_PULL_PROGRESS',
    GET_DOCKER_PULL_PROGRESS: 'GET_DOCKER_PULL_PROGRESS',
    GET_DOCKER_ERROR: 'GET_DOCKER_ERROR',
    GET_DOCKER_READY: 'GET_DOCKER_READY',
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
        loadedCourses: [],
        containers: {},
        dockerReady: false,
        dockerError: '',
        pullProgress: {
            current: 0,
            total: 0
        }
    },

    mutations: {
        [types.SET_CURRENT_COURSE](state, { course }) {
            state.currentCourse = course
        },
        [types.SET_LOADED_COURSES](state, { courses }) {
            state.loadedCourses = courses
        },

        [types.SET_DOCKER_READY](state, { ready }) {
            state.dockerReady = ready
        },

        [types.SET_DOCKER_ERROR](state, { message }) {
            state.dockerError = message
        },

        [types.SET_DOCKER_PULL_PROGRESS](state, { current, total }) {
            state.pullProgress.current = current
            state.pullProgress.total = total
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
        [types.GET_LOADED_COURSE](state) {
            return state.loadedCourses
        },

        [types.GET_LOADED_COURSES_IDS](state) {
            return state.loadedCourses.map(c => c.id)
        },

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
        },

        [types.GET_DOCKER_READY](state) {
            return state.dockerReady
        },

        [types.GET_DOCKER_ERROR](state) {
            return state.dockerError
        },

        [types.GET_DOCKER_PULL_PROGRESS](state) {
            return state.pullProgress
        }
    }
}
