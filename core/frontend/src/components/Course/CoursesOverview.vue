<template>
    <div class="course-overview">
        <div class="course-overview__course-container" v-for="(group, groupId) in groups" :key="groupId">
            <SectionHeader>
                <Icon :icon="group.icon" v-if="group.icon"/>
                {{ group.title }}
                <small class="text-smaller" v-if="group.showCount">{{ group.items | count }}</small>
            </SectionHeader>

            <CourseList :courses="courses" @select="handleCourseSelect"/>
        </div>
    </div>
</template>

<script>
import SectionHeader from '../Elements/SectionHeader.vue'
import CourseList from './CourseList.vue'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { mapGetters } from 'vuex'
import { namespace, types } from '@/store/modules/Courses'

export default {
    name: 'CoursesOverview',
    components: {
        SectionHeader,

        CourseList
    },
    data() {
        const recent = {
            title: this.$t('Course.overview.categories.recent'),
            icon: faHistory,
            items: []
        }

        return {
            groups: { recent }
        }
    },
    computed: {
        ...mapGetters(namespace, {
            courses: types.GET_COURSES
        }),
        activeGroups() {
            return Object.entries(this.groups)
                .filter(group => !group[1].collapsed)
                .map(group => group[0])
        }
    },
    methods: {
        handleCourseSelect(courseId) {
            this.$router.push({
                name: 'coursedetail',
                params: {
                    courseId
                }
            })
        }
    },
    filters: {
        count(items) {
            return items.length
        }
    }
}
</script>

<style lang="scss">
.course-overview__course-container {
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
