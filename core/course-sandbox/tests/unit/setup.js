// Additional setup for environment specific configuration
import { config } from '@vue/test-utils'
import chai from 'chai'
import SinonChai from 'sinon-chai'
import VueTestChai from 'vue-test-chai'

chai.use(SinonChai)
chai.use(VueTestChai)

config.stubs = {
    ...config.stubs,

    'Icon': true,
    'webview': true
}

config.mocks = {
    $t: () => 'Mock string returned for $t function, defined in unit tests\' setup.js'
}
