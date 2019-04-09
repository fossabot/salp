// Mock electron's remote API
// @url https://electronjs.org/docs/api/remote
import settings from './services/settings'

const noop = () => !1

export default {
    getCurrentWindow() {
        return {
            setTitle: noop
        }
    },
    require(path) {
        if (path === './services/settings') {
            return settings
        }

        return '__electron_browser_mock__require_path__' + path
    }
}
