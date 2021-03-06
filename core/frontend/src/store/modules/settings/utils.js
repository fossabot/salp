// Custom Vuex store settings helpers
// Use the provided helpers to access settings in your component
// some code copied from vuex module
import { mapState } from 'vuex'

/**
 * Same as vuex.mapState but with a different name to clarify its context
 *
 * @see https://vuex.vuejs.org/api/#mapstate
 */
export const getSettings = mapState

/**
 * Similar to vuex.mapState but allows two-way binding of state through setter
 * in computed properties. Especially useful for forms.
 *
 * @see https://vuex.vuejs.org/api/#mapstate
 * @see https://vuejs.org/v2/guide/computed.html#Computed-Setter
 */
const mapSettings = normalizeNamespace((namespace, fields) => {
    let res = {}

    fields.forEach(({ key: alias, val: name }) => {
        res[alias] = {
            get() {
                const module = getModuleByNamespace(this.$store, 'mapFields', namespace)
                if (!module) {
                    return
                }

                const state = module.context.state

                return state[name]
            },
            set(value) {
                this.$store.dispatch({
                    type: namespace + name,
                    name,
                    value
                })
            },
            // mark vuex getter for devtools
            vuex: true
        }
    })

    return res
})

export { mapSettings }

const createNamespacedHelpers = (namespace) => ({
    mapSettings: mapSettings.bind(null, namespace),
    getSettings: getSettings.bind(null, namespace)
})

// helper functions
function normalizeMap(map) {
    return Array.isArray(map)
        ? map.map(key => ({ key, val: key }))
        : Object.keys(map).map(key => ({ key: key, val: map[key] }))
}

function normalizeNamespace(fn) {
    return (...args) => {
        let [namespace, map] = args

        if (args.length !== 2) {
            map = namespace
            namespace = ''
        } else if (namespace.charAt(namespace.length - 1) !== '/') {
            namespace += '/'
        }

        return fn(namespace, normalizeMap(map))
    }
}

function getModuleByNamespace(store, helper, namespace) {
    const module = store._modulesNamespaceMap[namespace]
    if (process.env.NODE_ENV !== 'production' && !module) {
        /* eslint-disable-next-line no-console */
        console.error((`[vuex] module namespace not found in ${helper}(): ${namespace}`))
    }

    return module
}

export { createNamespacedHelpers }
