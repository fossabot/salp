// Mock electron's remote API
// @url https://electronjs.org/docs/api/remote

const noop = () => !1

export default {
    getCurrentWindow() {
        return {
            setTitle: noop
        }
    }
}
