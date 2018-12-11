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
        loadAction = 'PersistPlugin_LOAD',
        saveAction = 'PersistPlugin_SAVE'
    } = {}
) {
    function getNamespacedType(type) {
        return `${namespace}/${type}`
    }

    function plugin(store) {
        ipcRenderer.once(`settings:loaded:${name}`, (_, data) => {
            store.dispatch({
                type: getNamespacedType(loadAction),
                content: data
            })
        })

        // Initially load all persisted settings
        ipcRenderer.send('settings:load', name)

        let updateSettings
        if (immediate) {
            updateSettings = debounce(store.dispatch.bind(store, getNamespacedType(saveAction)), userInputDebounceTimer)
        }

        store.subscribe((mutation) => {
            if (immediate && mutation.type === getNamespacedType(mutationType) && !mutation.preventPersistance) {
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
        [mutationType](state, payload) {
            state[payload.name] = payload.value
        }
    }

    const actions = {
        [loadAction]({ commit }, { content }) {
            const data = JSON.parse(content) || {}

            Object.keys(data).forEach(key => {
                commit({
                    type: mutationType,
                    name: key,
                    value: data[key],
                    preventPersistance: true
                })
            })
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
