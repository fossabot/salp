<template>
  <div id="page-profile">
    <div class="profile-info__container">
        <Icon icon="faUserCircle" class="profile-info__icon"/>
    </div>
    <Form ref="form" :model="form" :inline="true" class="profile-form">
        <FormItem :label="$t('Pages.Profile.description.usernameLabel')">
            <Input autosize :disabled="disabled" v-model="form.name"/>
            <span class="form-item__description">
                {{ $t('Pages.Profile.description.username') }}
            </span>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="editName">{{label}}</Button>
        </FormItem>
    </Form>
    <div class="profile-statistics__container">
        <SectionHeader>
            <Icon icon="faChartBar"/>
            {{ $t('Pages.Profile.statistics.statistics') }}
        </SectionHeader>
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
import SectionHeader from '../Layout/Content/SectionHeader.vue'
import { Form, FormItem, Input, Button } from 'element-ui'
import CoursesOverview from '@/components/Layout/Course/CoursesOverview'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { groupsProfile } from '@/__mocks__/courses.js'

export default {
    name: 'Settings',
    components: {
        SectionHeader,

        Form,
        FormItem,
        Input,
        Button,
        CoursesOverview
    },
    icons: {
        faUserCircle,
        faChartBar
    },
    beforeCreate() {
        this.$emit('pageTitle', this.$t('App.pages.settings'))
    },
    data() {
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
            courseGroups: groupsProfile.call(this, this.$t)
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
