// Mock electron's ipcRenderer API
// @url https://electronjs.org/docs/api/ipc-renderer

const noop = () => !1

export default {
    on: noop,
    once: noop,
    send: noop
}
