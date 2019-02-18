// sandbox API
// this script will be executed user scripts are loaded in the sandbox
// the execution context is a special process which has access to node APIs
// @see https://electronjs.org/docs/api/webview-tag#preload
const links = require('./links')

// if called from nodejs, return path to this script
if (module && module.exports) {
    module.exports = __filename
}

process.once('loaded', () => {
    global.__API__ = 'salp/course-sandbox'
    global.salp = {
        links
    }
})
