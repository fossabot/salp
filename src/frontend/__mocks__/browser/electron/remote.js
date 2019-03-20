// Mock electron's remote API
// @url https://electronjs.org/docs/api/remote
import persistenceService from './services/persistence'

const noop = () => !1

export default {
    getCurrentWindow() {
        return {
            setTitle: noop
        }
    },
    require(path) {
        if (path === './services/persistence') {
            return persistenceService
        }

        return '__electron_browser_mock__require_path__' + path
    }
}
