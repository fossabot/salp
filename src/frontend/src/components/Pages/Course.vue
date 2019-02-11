<template>
  <div id="page-course">
      <router-view v-if="course" :course="course"/>
  </div>
</template>

<script>
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
            // TODO: get courses from state
            const courses = await this.$courses.loadCourses()
            const course = courses.find(c => c.info.id === this.courseId)
            this.course = course ? course.info : {}
        }
    }
}
</script>
