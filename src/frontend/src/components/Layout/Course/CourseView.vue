<template>
    <div id="course-view">
        <webview id="course-frame"
                 ref="course-frame"
                 :src="courseUrl"
                 :preload="sandboxApiScript"
                 :enableremotemodule="enableRemoteModule"
                 v-once
                 @did-start-loading="handleWebviewDidStartLoading"
                 @did-stop-loading="handleWebviewDidStopLoading"
                 @dom-ready="handleWebviewDomReady"
                 @did-finish-load="handleWebviewDidFinishLoad"
                 @did-fail-load="handleWebviewDidFailLoad">
        </webview>
    </div>
</template>

<script>
import { isProduction } from '@/constants'
import { remote } from 'electron'

const sandboxApiScript = remote.require('./sandbox-api/index.js')

export default {
    name: 'CourseView',
    props: {
        course: Object
    },
    computed: {
        courseUrl() {
            return `course://${this.course.id}/`
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
    methods: {
        handleWebviewDidStartLoading(event) {
            // TODO: implement
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
        }
    }
}
</script>

<style lang="scss">
#course-view,
#course-frame {
    height: 100%;
}
</style>
