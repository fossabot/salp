<template>
  <div id="page-profile">
    <div class="profile-info__container">
        <h3>
            <Icon icon="faUser"/>
            <span class="user-icon__text">{{ $t('Pages.Profile.description.user') }}</span>
        </h3>
        <Form ref="form" labelPosition="left" :model="form" :inline="true" class="profile-form">
            <FormItem :label="$t('Pages.Profile.description.usernameLabel')">
                <ElInput autosize v-model="form.name">
                    <Icon icon="faEdit" slot="suffix"/>
                </ElInput>
            </FormItem>
        </Form>
    </div>
    <div class="profile-statistics__container">
        <SectionHeader>
            <Icon icon="faChartBar"/>
            {{ $t('Pages.Profile.statistics.statistics') }}
        </SectionHeader>
        <Progress type="circle" :width="150" :percentage="percentageComplete" status="text">
            <span v-html="$t('Pages.Profile.statistics.finishedCourses', {finishedCourses, totalCourses})"/>
        </Progress>
        <Progress type="circle" :width="150" :percentage="percentagePassed" status="text">
            <span v-html="$t('Pages.Profile.statistics.passedTests', {passedTests, totalTests})"/>
        </Progress>
    </div>
</template>

<script>
import SectionHeader from '../Layout/Content/SectionHeader.vue'
import { Form, FormItem, Input } from 'element-ui'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faUser } from '@fortawesome/free-regular-svg-icons'

export default {
    name: 'Profile',
    components: {
        SectionHeader,

        Form,
        FormItem,
        /* eslint-disable-next-line vue/no-unused-components */
        [Input.name]: Input
    },
    icons: {
        faChartBar,
        faEdit,
        faUser
    },
    beforeCreate() {
        this.$emit('pageTitle', this.$t('App.pages.profile'))
    },
    data() {
        return {
            form: {
                name: 'John Doe'
            },
            label: 'Edit',
            totalCourses: 100,
            finishedCourses: 66,
            totalTests: 90,
            passedTests: 45
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

.user-icon__text {
    margin-left: .5em;
}

.el-input{
    max-width: 40em;
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
        padding: .5em !important;
        box-sizing: border-box;
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
