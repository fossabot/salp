<template>
    <webview id="course-view"
             ref="course-frame"
             :src="courseUrl"
             :preload="sandboxApiScript"
             :enableremotemodule="enableRemoteModule"
             v-once
             @did-start-loading="handleWebviewDidStartLoading"
             @did-stop-loading="handleWebviewDidStopLoading"
             @dom-ready="handleWebviewDomReady"
             @did-finish-load="handleWebviewDidFinishLoad"
             @did-fail-load="handleWebviewDidFailLoad"
             @ipc-message="handleWebviewIPCMessage">
    </webview>
</template>

<script>
import { isProduction } from '@/constants'
import { remote } from 'electron'
import SandboxAPI from '@/sandbox-api'

const sandboxApiScript = remote.require('./sandbox-api/index.js')

export default {
    name: 'CourseView',
    props: {
        course: Object
    },
    computed: {
        courseUrl() {
            const sandboxRoute = this.$route.params.pathMatch

            return `course://${this.course.id}/${sandboxRoute}`
        },
        sandboxApiScript() {
            // sandboxApiScript path is already absolute (leading "/")
            return 'file://' + sandboxApiScript
        },
        enableRemoteModule() {
            // @see https://github.com/electron/electron/issues/17021
            return !isProduction
        }
    },
    destroyed() {
        if (this.$sandboxAPI) {
            this.$sandboxAPI.destroy()
        }
    },
    methods: {
        handleWebviewDidStartLoading(event) {
            // initially create sandbox API instance on first load
            if (!this.$sandboxAPI) {
                this.$sandboxAPI = new SandboxAPI(event.target, this, this.$matomo)
            }
        },
        handleWebviewDidStopLoading(event) {
            // TODO: implement
        },
        handleWebviewDomReady(event) {
            // TODO: implement

            if (!isProduction) {
                event.target.openDevTools()
            }
        },
        handleWebviewDidFinishLoad(event) {
            // TODO: implement
        },
        handleWebviewDidFailLoad(event) {
            // TODO: implement
        },
        handleWebviewIPCMessage(event) {
            this.$sandboxAPI.handleSandboxIPCMessage(event)
        }
    }
}
</script>

<style lang="scss">
#course-view {
    height: 100%;
}
</style>
