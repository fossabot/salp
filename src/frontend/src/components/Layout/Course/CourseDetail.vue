<template>
    <div class="course-detail__container">
        <CourseCardFull v-bind="course"/>

        <SectionHeader>{{ $t('Layout.Course.detail.sections.containers') }}</SectionHeader>
        <DockerControls :name="course.name" :images="course.dockerConfig.images"/>

        <SectionHeader>{{ $t('App.headlines.toc') }}</SectionHeader>
        <TableOfContents :toc="toc"/>
    </div>
</template>

<script>
import SectionHeader from '../Content/SectionHeader.vue'
import CourseCardFull from './CourseCardFull.vue'
import TableOfContents from '../Content/TableOfContents.vue'
import DockerControls from '../Docker/DockerControls.vue'

export default {
    name: 'CourseDetail',
    props: {
        course: Object
    },
    components: {
        SectionHeader,

        CourseCardFull,
        TableOfContents,
        DockerControls
    },
    computed: {
        toc() {
            const tocObj = {}
            this.course.chapters.forEach(c => {
                tocObj[c] = {
                    title: c,
                    route: { path: 'content/chapter/' + c }
                }
            })

            return tocObj
        }
    }
}
</script>
