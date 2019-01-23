<template>
    <Row class="course-list" :gutter="20">
        <ElCol v-for="(item, index) in courses" :key="index" :span="6">
            <CourseCard v-bind="item"/>
        </ElCol>
    </Row>
</template>

<script>
import { Row, Col } from 'element-ui'
import CourseCard from './CourseCard.vue'

export default {
    name: 'CourseList',
    props: {
        courses: Array
    },
    components: {
        Row,
        /* eslint-disable-next-line vue/no-unused-components */
        [Col.name]: Col,

        CourseCard
    }
}
</script>

<style lang="scss">
.course-list {
    .el-col {
        margin-bottom: 20px;
    }

    .el-col-6:nth-last-child(-n + 3) {
        margin-bottom: 0;
    }
}
</style>
