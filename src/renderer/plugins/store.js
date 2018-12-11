import Vue from 'vue'
import Vuex from 'vuex'
import modules, { PersistedUserPreferences, PersistedAppState } from '@/store/modules'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [
        PersistedUserPreferences,
        PersistedAppState
    ],
    modules
})
