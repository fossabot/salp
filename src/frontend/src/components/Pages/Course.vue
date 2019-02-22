<template>
  <div id="page-course">
      <router-view v-if="course" :course="course" @pageTitle="handlePageTitleChange"/>
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
    },
    methods: {
        handlePageTitleChange(title) {
            this.$emit('pageTitle', title + ' - ' + this.course.name)
        }
    }
}
</script>

<style lang="scss">
#page-course {
    height: 100%;
}
</style>
