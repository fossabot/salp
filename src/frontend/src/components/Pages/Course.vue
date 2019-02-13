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
    computed: {
        course() {
            const getter = this.$store.getters[`${namespace}/${types.GET_COURSE_BY_ID}`]

            return getter(this.courseId) || false
        }
    }
}
</script>

<style lang="scss">
#page-course {
    height: 100%;
}
</style>
