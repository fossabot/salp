// Additional setup for environment specific configuration
import { config } from '@vue/test-utils'

config.stubs = {
    ...config.stubs,

    'Icon': true,
    'webview': true,
    'router-view': true
}

config.mocks = {
    $t: () => 'Mock string returned for $t function, defined in unit tests\' setup.js'
}
