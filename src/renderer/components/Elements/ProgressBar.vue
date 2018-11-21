<template>
    <div class="progress-bar__container">
        <Progress :percentage="progress" :status="progressStatus"/>
    </div>
</template>

<script>
import { Progress } from 'element-ui'

export default {
    name: 'ProgressBar',
    props: {
        progress: Number
    },
    components: {
        Progress
    },
    computed: {
        progressStatus() {
            return this.progress == 100 ? 'success' : ''
        }
    }
}
</script>

<style lang="scss">
.progress-bar__container {
    .el-progress-bar {
        padding-right: 3em;
        margin-right: -42px;
    }
}
</style>
