// Mock electron's shell API
// @url https://electronjs.org/docs/api/shell

const noop = () => !1

export default {
    openExternal: noop
}
