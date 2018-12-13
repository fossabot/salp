// Transient app state store

// module constants/info info
export const namespace = 'AppState'

// types
export const types = {
    SET_CURRENT_COURSE: 'SET_CURRENT_COURSE'
}

// module
export default {
    namespaced: true,

    state: {
        currentCourse: null
    },

    mutations: {
        [types.SET_CURRENT_COURSE](state, { course }) {
            state.currentCourse = course
        }
    }
}
