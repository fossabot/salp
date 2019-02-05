<template>
    <Card shadow="never" class="docker-controls">
        <div class="top-container">
            <h3>Docker</h3>
            <Button :disabled="disabled" icon="el-icon-refresh"
                type="danger" :round="true" size="small" @click="handleReset">Reset</Button>
        </div>
        <Containers :course-name="courseName" :containers="course.containers"/>
        <div class="docker-controls__button-container">
            <Button :disabled="disabled" @click="handleButtonClick">{{ buttonText }}</Button>
        </div>
    </Card>
</template>

<script>
import { Card, Button } from 'element-ui'
import { ipcRenderer } from 'electron'
import { namespace, types } from '@/store/modules/AppState.js'
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
        Containers
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
