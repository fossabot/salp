// Additional setup for environment specific configuration
import { config } from '@vue/test-utils'
import chai from 'chai'
import SinonChai from 'sinon-chai'
import $store from '@/__mocks__/store/empty'

chai.use(SinonChai)

config.stubs = {
    ...config.stubs,

    'Icon': true,
    'webview': true,
    'router-view': true
}

config.mocks = {
    $store,
    $t: () => 'Mock string returned for $t function, defined in unit tests\' setup.js'
}