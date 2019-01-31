<template>
    <Card shadow="never" class="docker-controls">
        <h3>Docker</h3>
        <Containers :course-name="courseName" :containers="course.containers"/>
        <div class="docker-controls__button-container">
            <Button @click="handleButtonClick">{{ buttonText }}</Button>
            <Button @click="handleRemove">Remove</Button>
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
    data() {
        return {
        }
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
            if (this.allContainersUp) {
                return 'Down'
            }

            return 'Up'
        },
        courseName() {
            return this.course.name.trim().replace(/\s/g, '').toLowerCase()
        }
    },
    methods: {
        handleButtonClick() {
            if (this.allContainersUp) {
                ipcRenderer.send('docker:down', this.course)
            } else {
                ipcRenderer.send('docker:up', this.course)
            }
        },
        handleRemove() {
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

    .docker-controls__button-container {
        margin-top: 1em;
    }
}
</style>
