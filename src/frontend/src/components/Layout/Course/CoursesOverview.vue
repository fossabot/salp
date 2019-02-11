<template>
    <div class="course-overview">
        <div class="course-overview__course-container" v-for="(group, groupId) in groups" :key="groupId">
            <SectionHeader>
                <Icon :icon="group.icon" v-if="group.icon"/>
                {{ group.title }}
                <small class="text-smaller" v-if="group.showCount">{{ group.items | count }}</small>
            </SectionHeader>

            <CourseList :courses="group.items"/>
        </div>
    </div>
</template>

<script>
import SectionHeader from '../Content/SectionHeader.vue'
import CourseList from './CourseList.vue'
import { faHistory } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'CoursesOverview',
    components: {
        SectionHeader,

        CourseList
    },
    data() {
        const recent = {
            title: this.$t('Layout.Course.overview.categories.recent'),
            icon: faHistory,
            items: []
        }

        return {
            groups: { recent }
        }
    },
    async created() {
        this.groups.recent.items = await this.$courses.loadCourses()
    },
    computed: {
        activeGroups() {
            return Object.entries(this.groups)
                .filter(group => !group[1].collapsed)
                .map(group => group[0])
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
