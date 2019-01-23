<template>
  <div id="page-course">
      <router-view :course="course"/>
  </div>
</template>

<script>
import { course } from '@/__mocks__/courses.js'

export default {
    name: 'Course',
    pageTitleTranslationKey: 'App.pages.course',
    data() {
        return {
            course: course
        }
    }
}
</script>
