<template>
  <div id="page-course">
      <router-view v-if="course" :course="course"/>
  </div>
</template>

<script>
import { namespace, types } from '@/store/modules/Courses'

export default {
    name: 'Course',
    pageTitleTranslationKey: 'App.pages.course',
    props: {
        courseId: String
    },
    data() {
        return {
            course: null
        }
    },
    created() {
        this.loadCourse()
    },
    watch: {
        '$route': 'loadCourse'
    },
    methods: {
        async loadCourse() {
            const getter = this.$store.getters[`${namespace}/${types.GET_COURSE_BY_ID}`]
            const course = getter(this.courseId) || {}
            this.course = course.info || {}
        }
    }
}
</script>
