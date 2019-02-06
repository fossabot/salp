// Transient app state store

// module constants/info info
export const namespace = 'AppState'

// types
export const types = {
    SET_CURRENT_COURSE: 'SET_CURRENT_COURSE',
    SET_LOADED_COURSES: 'SET_LOADED_COURSES',
    GET_LOADED_COURSE: 'GET_LOADED_COURSES',
    GET_LOADED_COURSES_IDS: 'GET_LOADED_COURSES_IDS'
}

// module
export default {
    namespaced: true,

    state: {
        currentCourse: null,
        loadedCourses: []
    },

    mutations: {
        [types.SET_CURRENT_COURSE](state, { course }) {
            state.currentCourse = course
        },
        [types.SET_LOADED_COURSES](state, { courses }) {
            state.loadedCourses = courses
        }
    },

    getters: {
        [types.GET_LOADED_COURSE](state) {
            return state.loadedCourses
        },
        [types.GET_LOADED_COURSES_IDS](state) {
            return state.loadedCourses.map(c => c.id)
        }
    }
}
