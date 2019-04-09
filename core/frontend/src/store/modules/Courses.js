// holds all loaded courses, provides function to add course
import { ipcRenderer } from 'electron'

// module constants/info info
export const namespace = 'Courses'

// types
export const types = {
    SET_COURSES: 'SET_COURSES',
    LOAD_COURSES: 'LOAD_COURSES',
    INSTALL_COURSE: 'INSTALL_COURSE',
    REMOVE_COURSE: 'REMOVE_COURSE',
    GET_COURSES: 'GET_COURSES',
    GET_COURSES_COUNT: 'GET_COURSES_COUNT',
    GET_COURSE_BY_ID: 'GET_COURSE_BY_ID'
}

// module
export default {
    namespaced: true,

    state: {
        courses: []
    },

    mutations: {
        [types.SET_COURSES](state, { courses }) {
            state.courses = courses
        }
    },

    actions: {
        async [types.LOAD_COURSES]({ commit }) {
            commit({
                type: types.SET_COURSES,
                courses: await loadCourses()
            })
        },
        [types.INSTALL_COURSE]() {
            throw new Error('Not implemented yet!')
        },
        [types.REMOVE_COURSE]() {
            throw new Error('Not implemented yet!')
        }
    },

    getters: {
        [types.GET_COURSES](state) {
            return state.courses
        },
        [types.GET_COURSE_BY_ID](state) {
            return (id) => state.courses.find(c => c.id === id)
        }
    }
}

// plugin
export function CoursesStorePlugin(store) {
    // when the store is initialized, load all courses
    store.dispatch(`${namespace}/${types.LOAD_COURSES}`)
}

// logic
async function loadCourses() {
    const loaded = new Promise((resolve, reject) => {
        ipcRenderer.once('courses:loaded', (_, error, courses) => {
            if (error) {
                reject(error)
            }

            resolve(courses)
        })
    })

    ipcRenderer.send('courses:load')

    return loaded
}
