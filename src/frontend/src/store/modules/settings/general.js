// general settings in vuex store
import createSettingsModule from './module'

// types
export const GENERAL_NAMESPACE = 'settings/general'
export const USERNAME = 'username'
export const ALLOW_TRACKING = 'allow_tracking'
export const MACHINE_LEARNING = 'machine_learning'
export const SETUP_DONE = 'setup_done'

// store
export default createSettingsModule({
    [USERNAME]: '',
    [ALLOW_TRACKING]: false,
    [MACHINE_LEARNING]: false,
    [SETUP_DONE]: false
})
