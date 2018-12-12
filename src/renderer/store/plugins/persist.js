// Plugin to persist stores
import { ipcRenderer } from 'electron'
import { debounce } from 'lodash'
import { userInputDebounceTimer } from '$src/shared/constants'

export default function createPersistPlugin(
    name,
    namespace,
    {
        immediate = true,
        getterType = 'GET_PROP',
        mutationType = 'SET_PROP',
        mutationTypeAll = `${mutationType}_ALL`,
        loadAction = 'PersistPlugin_LOAD',
        saveAction = 'PersistPlugin_SAVE'
    } = {}
) {
    function getNamespacedType(type) {
        return `${namespace}/${type}`
    }

    async function plugin(store) {
        // Initially load all persisted settings
        await store.dispatch(getNamespacedType(loadAction))

        let updateSettings
        if (immediate) {
            updateSettings = debounce(store.dispatch.bind(store, getNamespacedType(saveAction)), userInputDebounceTimer)
        }

        store.subscribe((mutation) => {
            if (immediate && mutation.type === getNamespacedType(mutationType) && !mutation.payload.preventPersistance) {
                updateSettings()
            }
        })
    }

    const getters = {
        [getterType](state) {
            return name => state[name]
        }
    }

    const mutations = {
        [mutationType](state, { name, value }) {
            state[name] = value
        },
        [mutationTypeAll](state, { props }) {
            Object.entries(props)
                .forEach(([ name, value ]) => {
                    state[name] = value
                })
        }
    }

    const actions = {
        async [loadAction]({ commit }) {
            ipcRenderer.once(`settings:loaded:${name}`, (_, content) => {
                const data = JSON.parse(content) || {}

                commit({
                    type: mutationTypeAll,
                    props: data
                })

                return true
            })

            ipcRenderer.send('settings:load', name)
        },
        [saveAction]({ state }) {
            const settings = Object.assign({}, state)
            const content = JSON.stringify(settings)

            ipcRenderer.send('settings:save', name, content)
        }
    }

    return {
        plugin,
        store: {
            getters,
            mutations,
            actions
        }
    }
}
