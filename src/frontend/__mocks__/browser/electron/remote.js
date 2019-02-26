// Mock electron's remote API
// @url https://electronjs.org/docs/api/remote

const noop = () => !1

export default {
    getCurrentWindow() {
        return {
            setTitle: noop
        }
    },
    require(path) {
        return '__electron_browser_mock__require_path__' + path
    }
}
