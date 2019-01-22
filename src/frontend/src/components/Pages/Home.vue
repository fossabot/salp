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
    pageTitleTranslationKey: 'App.pages.home',
    components: {
        CoursesOverview
    },
    data() {
        return {
            courseGroups: groups.call(this, this.$t)
        }
    }
}
</script>
