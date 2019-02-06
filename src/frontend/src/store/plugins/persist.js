// Plugin to persist stores
import { ipcRenderer } from 'electron'
import { debounce } from 'lodash'
import { userInputDebounceTimer } from '@/constants'

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
        return namespace ? `${namespace}/${type}` : type
    }

    async function plugin(store) {
        // Initially load all persisted settings
        await store.dispatch(getNamespacedType(loadAction))

        if (immediate) {
            const updateSettings = debounce(store.dispatch.bind(store, getNamespacedType(saveAction)), userInputDebounceTimer)

            store.subscribe((mutation) => {
                if (mutation.type === getNamespacedType(mutationType) && !mutation.payload.$skipSave) {
                    updateSettings()
                }
            })
        }
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
                commit({
                    type: mutationTypeAll,
                    props: content
                })

                return true
            })

            ipcRenderer.send('settings:load', name)
        },
        [saveAction]({ state }) {
            const content = Object.assign({}, state)

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
