// about window/page
import './theme/about.scss'
import { remote, shell } from 'electron'
const about = remote.require('./services/about.js')

function handleExternalLinkClick(event) {
    event.preventDefault()

    const href = event.target.href
    if (href === 'salp://thirdparty-licenses') {
        about.openThirdPartyNotices()
    } else {
        shell.openExternal(href)
    }
}

const app = document.querySelector('#app')

app.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        handleExternalLinkClick(event)
    }
})
