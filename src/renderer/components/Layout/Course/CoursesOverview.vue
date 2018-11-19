<template>
     <div class="course-overview">
         <Collapse :value="activeGroups">
            <CollapseItem v-for="(group, groupId) in groups" :key="groupId" :name="groupId">
                <h3 slot="title">
                    <i :class="group.icon" v-if="group.icon"></i>
                    {{ group.title }}
                    <small class="text-smaller" v-if="group.showCount">{{ group.items | count }}</small>
                </h3>
                <CourseList :courses="group.items"/>
            </CollapseItem>
         </Collapse>
     </div>
</template>

<script>
import { Collapse, CollapseItem } from 'element-ui'
import CourseList from './CourseList.vue'

export default {
    name: 'CoursesOverview',
    props: {
        groups: Object
    },
    components: {
        Collapse,
        CollapseItem,

        CourseList
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
.course-overview {
    .el-collapse {
        &,
        .el-collapse-item:last-child .el-collapse-item__wrap {
            border-bottom: none;
        }
    }
}
</style>
