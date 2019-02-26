<template>
    <Card shadow="never" class="docker-controls">
        <div class="controls-container" v-if="dockerReady">
            <div class="top-container">
                <h3>Docker</h3>
                <Button :disabled="disabled" icon="el-icon-refresh"
                    type="danger" :round="true" size="small" @click="handleReset">Reset</Button>
            </div>
            <Containers :course-name="courseName" :containers="course.containers"/>
            <div class="docker-controls__button-container">
                <Button :disabled="disabled" @click="handleButtonClick">{{ buttonText }}</Button>
            </div>
        </div>
        <div class="docker-error" v-if="!dockerReady">
            <h3>Docker</h3>
            <SimpleLink href="/settings">
                <ErrorLog :error="errorMessage"/>
            </SimpleLink>
            <SimpleLink href="/settings">{{ $t('App.pages.settings') }}</SimpleLink>
        </div>
    </Card>
</template>

<script>
import { Card, Button } from 'element-ui'
import { ipcRenderer } from 'electron'
import { namespace, types } from '@/store/modules/AppState.js'
import ErrorLog from '@/components/Elements/ErrorLog.vue'
import SimpleLink from '@/components/ContentElements/SimpleLink.vue'
import Containers from './Containers.vue'

export default {
    name: 'DockerControls',
    props: {
        course: {
            type: Object,
            required: true
        }
    },
    components: {
        Button,
        Card,
        Containers,
        ErrorLog,
        SimpleLink
    },
    computed: {
        containersCount() {
            return Object.keys(this.course.containers).length
        },
        allContainersUp() {
            const containersUp = this.$store.getters[namespace + '/' + types.GET_CONTAINER_UP_COUNT](this.courseName)

            return containersUp === this.containersCount
        },
        buttonText() {
            return this.allContainersUp ? 'Stop' : 'Start'
        },
        disabled() {
            return this.$store.getters[namespace + '/' + types.GET_CONTAINER_STATUS_IS_BLOCKING](this.courseName)
        },
        courseName() {
            return this.course.name.trim().replace(/\s/g, '').toLowerCase()
        },
        dockerReady() {
            return this.$store.getters[namespace + '/' + types.GET_DOCKER_READY]
        },
        errorMessage() {
            return this.$store.getters[namespace + '/' + types.GET_DOCKER_ERROR]
        }
    },
    methods: {
        handleButtonClick() {
            if (this.allContainersUp) {
                ipcRenderer.send('docker:removeContainer', this.course)
            } else {
                ipcRenderer.send('docker:up', this.course)
            }
        },
        handleReset() {
            ipcRenderer.send('docker:removeAll', this.course)
        }
    },
    mounted() {
        ipcRenderer.send('docker:test')
        ipcRenderer.send('docker:checkState', this.course)
    }
}
</script>

<style lang="scss">
.docker-controls {
    padding: 1em 1em;
    max-width: 40em;

    .top-container {
        display: flex;
        justify-content: space-between;
    }

    .docker-controls__button-container {
        margin-top: 1em;
    }
}
</style>
