<template>
  <div id="page-course">
      <CourseDetail :course="course"/>
  </div>
</template>

<script>
import CourseDetail from '../Layout/Course/CourseDetail.vue'
import { course } from '@/__mocks__/courses.js'

export default {
    name: 'Course',
    components: {
        CourseDetail
    },
    beforeCreate() {
        this.$emit('pageTitle', this.$t('App.pages.course'))
    },
    data() {
        return {
            course: course
        }
    }
}
</script>
