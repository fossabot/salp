<template>
  <div id="page-home">
    <CoursesOverview :groups="courseGroups"/>
  </div>
</template>

<script>
import CoursesOverview from '../Layout/Course/CoursesOverview.vue'

export default {
  name: 'Home',
  components: {
    CoursesOverview
  },
  data() {
    let course = {
        name: 'SQL injections',
        description: 'This course will introduce you to SQL injections which are commonly found in web applications and can lead to desastrous data loss.',
        author: 'John Doe',
        version: '1.0',
        lessions: 6,
        tests: 3,
        tags: ['SQL', 'active attack', 'web applications']
    }

    const progresses = [100, 72, 50, 23, 0];

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    let getCourses = num => {
      return new Array(num)
        .fill(course)
        .map(c => { 
          return {
            ...c,
            progress: progresses[getRandomInt(5)]
          };
        })
    }

    let groups = {
      recent: {
        title: this.$t('Layout.Course.overview.categories.recent'),
        icon: 'el-icon-fa-history',
        items: getCourses(4)
      },
      favourites: {
        title: this.$t('Layout.Course.overview.categories.favourites'),
        icon: 'el-icon-fa-star',
        items: getCourses(3),
        showCount: true
      },
      recommended: {
        title: 'Recommended',
        collapsed: true
      },
      installed: {
        title: this.$t('Layout.Course.overview.categories.installed'),
        items: getCourses(11),
        collapsable: false,
        showCount: true
      }
    }

    return {
      courseGroups: groups
    }
  }
}
</script>
