<template>
    <div id="window-about" v-once>
        <img id="logo" src="./logo.png" alt="salp logo"/>
        <hgroup class="info">
            <h1 id="title">Security Awareness Learning Platform</h1>
            <h2 id="app-version" class="versions">Version 1.0.0</h2>
        </hgroup>
        <table id="lib-versions" class="versions">
            <tbody>
            <tr>
                <td>Electron</td>
                <td>{{ electronVersion }}</td>
            </tr>
            <tr>
                <td>Node</td>
                <td>{{ nodeVersion }}</td>
            </tr>
            <tr>
                <td>Chromium</td>
                <td>{{ chromeVersion }}</td>
            </tr>
            <tr>
                <td colspan="2"><a href="salp://thirdparty-licenses" id="thirdparty-licenses" @click.prevent="openThirdPartyNotices">Show thrid-party licenses</a></td>
            </tr>
            </tbody>
        </table>
        <ul id="links">
            <li><a href="https://github.com/salp-app/salp" @click.prevent="handleExternalLinkClick">Homepage</a></li>
            <li><a href="https://github.com/salp-app/salp" @click.prevent="handleExternalLinkClick">Project page</a></li>
            <li><a href="https://github.com/salp-app/salp/issues" @click.prevent="handleExternalLinkClick">Issue tracker</a></li>
        </ul>
    </div>
</template>

<script>
import { remote, shell } from 'electron'
const about = remote.require('./services/about.js')

export default {
    name: 'About',
    computed: {
        electronVersion() {
            return window.process.versions.electron
        },
        nodeVersion() {
            return window.process.versions.node
        },
        chromeVersion() {
            return window.process.versions.chrome
        }
    },
    methods: {
        handleExternalLinkClick(event) {
            shell.openExternal(event.target.href)
        },
        openThirdPartyNotices() {
            about.openThirdPartyNotices()
        }
    }
}
</script>

<style lang="scss">
#window-about {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > * {
        margin: 0.5rem 0;
    }
}

#logo {
    width: 128px;
}

.info {
    text-align: center;
}

#title,
#app-version {
    margin: 0;
}

#title {
    font-size: 22px;
    line-height: 22px;
    padding: 0 4rem;
}

.versions,
#thirdparty-licenses {
    color: #989898;
}

#app-version {
    font-size: 1rem;
}

#lib-versions tr td:first-child {
    padding-right: 1em;
}

#links {
    padding: 0;
    list-style: none;
}

#links li {
    display: inline-block;
    margin-right: 0.5em;
}

#links li:last-child {
    margin-right: 0;
}

#thirdparty-licenses {
    font-size: 0.85em;
}
</style>
