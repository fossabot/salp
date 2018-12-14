// Additional setup for environment specific configuration
import { config } from '@vue/test-utils'

config.stubs = {
    ...config.stubs,

    'Icon': true,
    'webview': true,
    'router-view': true
}
