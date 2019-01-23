<template>
    <div class="course-detail__container">
        <CourseCardFull v-bind="course"/>

        <SectionHeader>{{ $t('App.headlines.toc') }}</SectionHeader>
        <TableOfContents :toc="toc"/>

        <SectionHeader>{{ $t('Layout.Course.detail.sections.personalProgress') }}</SectionHeader>
        <ProgressBar :progress="course.progress"/>
    </div>
</template>

<script>
import SectionHeader from '../Content/SectionHeader.vue'
import CourseCardFull from './CourseCardFull.vue'
import TableOfContents from '../Content/TableOfContents.vue'
import ProgressBar from '../../Elements/ProgressBar.vue'
import { courseContents } from '@/__mocks__/courses.js'

export default {
    name: 'CourseDetail',
    props: {
        course: Object
    },
    components: {
        SectionHeader,

        CourseCardFull,
        TableOfContents,
        ProgressBar
    },
    data() {
        return {
            toc: courseContents
        }
    }
}
</script>
