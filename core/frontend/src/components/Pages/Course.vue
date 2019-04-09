<template>
    <Container id="page-course">
        <Aside width="250" v-if="$route.name === 'coursecontent-default'">
            <Menu :router="true">
                <ElMenuItem index="backToDetail" :route="{ name: 'coursedetail' }">
                    <Icon icon="faBackward"/>
                    <span>{{ $t('Course.sidemenu.backToDetail') }}</span>
                </ElMenuItem>
            </Menu>
        </Aside>

        <Main>
            <router-view v-if="course" :course="course" @pageTitle="handlePageTitleChange"/>
        </Main>
    </Container>
</template>

<script>
import { Container, Main, Aside, Menu, MenuItem } from 'element-ui'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { namespace, types } from '@/store/modules/Courses'

export default {
    name: 'Course',
    pageTitleTranslationKey: 'App.pages.course',
    props: {
        courseId: String
    },
    components: {
        Container,
        Main,
        Aside,
        Menu,
        /* eslint-disable-next-line vue/no-unused-components */
        [MenuItem.name]: MenuItem
    },
    icons: {
        faBackward
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
    .el-menu {
        border: none;
    }

    .el-aside {
        border-right: solid 1px $--border-color-light;
    }
}

#app-content #page-course {
    margin: -1 * $--main-padding;
}
</style>
