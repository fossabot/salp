// provides functions to interact with links
const { shell } = require('electron')

// save an internal reference to the original function
const _fns = {
    openExternal: shell.openExternal
}

function openExternalLink(link) {
    // check if provided link is valid
    const url = new URL(link)

    _fns.openExternal(url.toString())
}

module.exports = { openExternalLink }
