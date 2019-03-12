<template>
  <div id="page-home">
    <CoursesOverview/>
  </div>
</template>

<script>
import CoursesOverview from '../Course/CoursesOverview.vue'

export default {
    name: 'Home',
    pageTitleTranslationKey: 'App.pages.home',
    components: {
        CoursesOverview
    }
}
</script>
