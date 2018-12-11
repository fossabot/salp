// Custom Vuex store helpers
// some code copied from vuex module

/**
 * Similar to vuex.mapState but allows two-wat binding of state through setter
 * in computed properties. Especially useful for forms.
 *
 * @see https://vuex.vuejs.org/api/#mapstate
 * @see https://vuejs.org/v2/guide/computed.html#Computed-Setter
 */
const mapStateTwoWay = normalizeNamespace((namespace, mutationType, fields) => {
    let res = {}

    fields.forEach(field => {
        const name = field.val

        res[name] = {
            get() {
                const module = getModuleByNamespace(this.$store, 'mapFields', namespace)
                if (!module) {
                    return
                }

                const state = module.context.state

                return state[name]
            },
            set(value) {
                this.$store.commit({
                    type: namespace + mutationType,
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

const createNamespacedHelpers = (namespace, mutationType) => ({
    mapStateTwoWay: mapStateTwoWay.bind(null, namespace, mutationType)
})

// helper functions
function normalizeMap(map) {
    return Array.isArray(map)
        ? map.map(key => ({ key, val: key }))
        : Object.keys(map).map(key => ({ key: key, val: map[key] }))
}

function normalizeNamespace(fn) {
    return (namespace, mutationType, map) => {
        if (typeof namespace !== 'string') {
            map = namespace
            namespace = ''
        } else if (namespace.charAt(namespace.length - 1) !== '/') {
            namespace += '/'
        }

        return fn(namespace, mutationType, normalizeMap(map))
    }
}

function getModuleByNamespace(store, helper, namespace) {
    const module = store._modulesNamespaceMap[namespace]
    if (process.env.NODE_ENV !== 'production' && !module) {
        console.error((`[vuex] module namespace not found in ${helper}(): ${namespace}`))
    }

    return module
}

export { createNamespacedHelpers }
