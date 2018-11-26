<template>
  <div id="page-home">
    <CoursesOverview :groups="courseGroups"/>
  </div>
</template>

<script>
import CoursesOverview from '../Layout/Course/CoursesOverview.vue'
import { groups } from '@/__mocks__/courses.js'

export default {
  name: 'Home',
  components: {
    CoursesOverview
  },
  beforeCreate() {
    this.$emit('pageTitle', this.$t('App.pages.home'))
  },
  data() {
    return {
      courseGroups: groups.call(this, this.$t)
    }
  }
}
</script>
