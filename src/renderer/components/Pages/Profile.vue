<template>
  <div id="page-profile">
    <div class="profile-info__container">
        <Icon icon="faUserCircle" class="profile-info__icon"/>
    </div>
    <Form ref="form" :model="form" :inline="true" class="profile-form">
        <FormItem :label="$t('Pages.Profile.description.usernameLabel')">
            <Input autosize :disabled="disabled" v-model="form.name"></Input>
            <span class="form-item__description">
                {{ $t('Pages.Profile.description.username') }}
            </span>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="editName">{{label}}</Button>
        </FormItem>
    </Form>
    <div class="profile-statistics__container">
        <div class="profile-statistics-icon__container">
            <h3>
                <Icon icon="faChartBar"/>
                <span class="statistics-icon__text">{{ $t('Pages.Profile.statistics.statistics') }}</span>
            </h3>
        </div>
        <Progress type="circle" :width="200" :percentage="percentageComplete" status="text">
            <span>{{ $t('Pages.Profile.statistics.finishedCourses', {finishedCourses, totalCourses}) }}</span>
        </Progress>
        <Progress type="circle" :width="200" :percentage="percentagePassed" status="text">
            <span>{{ $t('Pages.Profile.statistics.passedTests', {passedTests, totalTests}) }}</span>
        </Progress> 
        <CoursesOverview :groups="courseGroups" class="statistics-coursesoverview"/>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Collapse, CollapseItem, Progress } from 'element-ui'
import ProgressBar from '@/components/Elements/ProgressBar.vue'
import CoursesOverview from '@/components/Layout/Course/CoursesOverview'
import { faChartBar, faCheckSquare, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'

export default {
  name: 'Settings',
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Collapse,
    CollapseItem,
    ProgressBar,
    CoursesOverview,
    Progress
  },
  icons: {
    faUserCircle,
    faChartBar,
    faCheckSquare,
    faCheckCircle
  },
  beforeCreate() {
    this.$emit('pageTitle', this.$t('App.pages.settings'))
  },
  data() {
    //Mock course data
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

    //////

    let groups = {
      finished: {
        title: this.$t('Pages.Profile.groups.finishedCourses'),
        icon: faCheckCircle,
        items: getCourses(4),
        collapsed: true
      },
      enrolled: {
        title: this.$t('Pages.Profile.groups.enrolledCourses'),
        items: getCourses(3),
        showCount: true
      },
      passedTests: {
        title: this.$t('Pages.Profile.groups.passedTests'),
        icon: faCheckSquare,
        items: getCourses(5),
        collapsed: true
      },
      failedTests: {
        title: this.$t('Pages.Profile.groups.failedTests'),
        items: getCourses(2),
        collapsable: false,
        showCount: true
      }
    }  

    return {
      form: {
          name: 'John Doe'
      },
      disabled: true,
      label: 'Edit',
      totalCourses: 100,
      finishedCourses: 66,
      totalTests: 90,
      passedTests: 45,
      courseGroups: groups
    }
  },
  computed: {
      percentageComplete() {
          if (this.totalCourses === 0) {
              return 0
          }

          return Math.floor((this.finishedCourses / this.totalCourses) * 100)
      },

      percentagePassed() {
          if (this.totalTests === 0) {
              return 0
          }

          return Math.floor((this.passedTests / this.totalTests) * 100)
      }
  },
  methods: {

      editName() {
        if (this.disabled) {
            this.label = this.$t('Pages.Profile.description.actions.save')
            this.disabled = false
        } else {
            this.label = this.$t('Pages.Profile.description.actions.edit')
            this.disabled = true
        }
      }
  }
}
</script>

<style lang="scss">

.form-item__description {
    display: block;
    font-size: $--font-size-small;
    line-height: 1em;
    color: $--color-info;
    margin-top: 0.5em;
}

.el-input{
    max-width: 40em;
}

.el-icon-fa-user-circle {
    font-size: 14em;
    margin-bottom: .1em;
}

.profile-form {
    display: flex;
    justify-content: center
}

.profile-info__container {
    display: flex;
    justify-content: center;

    .fa-user-circle {
        width: 100%;
        height: auto;
        margin-bottom: 2em;
        color: lightgray;
    }
}

.statistics-coursesoverview {
    margin-top: 2em;
}

.profile-statistics-icon__container {
    display: flex;
    margin-bottom: 1em; 

    .statistics-icon__text {
        margin-left: .5em;
    }

    
}

.profile-statistics__container {
    .el-progress__text {
        font-size: inherit !important;
        margin: .5em !important;
    }

    .el-progress.el-progress--circle {
        margin-right: 1em;

        &:first-of-type {
            background-color: red !important;
        }

        &::last-of-type {
            margin-right: 0;
        }
    }
}


</style>
