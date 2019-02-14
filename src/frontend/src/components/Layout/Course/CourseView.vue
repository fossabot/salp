<template>
    <div id="course-view">
        <webview id="course-frame"
                 ref="course-frame"
                 :src="courseUrl"
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

export default {
    name: 'CourseView',
    props: {
        course: Object
    },
    computed: {
        courseUrl() {
            return `course://${this.course.id}/index.html`
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
