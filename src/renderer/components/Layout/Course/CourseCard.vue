<template>
    <Card class="course-card" shadow="hover">
        <header slot="header" class="course-card__header">
            <h3 class="course-card__name">{{ name }}</h3>

            <div class="course-card__context-menu">
                <Dropdown>
                    <Icon icon="faEllipsisV"></Icon>
                    <DropdownMenu slot="dropdown">
                        <DropdownItem>
                            <Icon icon="faGlobe"/> {{ $t('Layout.Course.actions.openProjectPage') }}
                        </DropdownItem>
                        <DropdownItem>
                            <Icon icon="faExclamation"/> {{ $t('Layout.Course.actions.reportIssue') }}
                        </DropdownItem>
                        <DropdownItem v-if="progress">
                            <Icon icon="faRedo"/> Reset
                        </DropdownItem>
                        <DropdownItem>
                            <Icon icon="faTrashAlt"/> {{ $t('Layout.Course.actions.delete') }}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>

        <div class="course-card__info">
            <p>{{ description }}</p>

            <div class="course-card__tags">
                <Tag size="small" v-for="(tag, index) in tags" :key="index">{{ tag }}</Tag>
            </div>

            <span class="course-card__info__text" v-t="{path: 'Layout.Course.info.shortDescription.lessonsAndTests', args: [lessons, tests]}"></span>
            <span class="course-card__info__text" v-t="{path: 'Layout.Course.info.shortDescription.authorAndVersion', args: [author, version]}"></span>
        </div>

        <div class="course-card__footer">
            <Button type="text" class="course-card__start-button">
                <Tooltip placement="bottom" content="Start">
                    <Icon icon="faPlay"/>
                </Tooltip>
            </Button>
            <ProgressBar :progress="progress" class="course-card__progress"/>
        </div>
    </Card>
</template>

<script>
import { Card, Button, Dropdown, DropdownMenu, DropdownItem, Tooltip, Tag } from 'element-ui'
import { faEllipsisV, faGlobe, faExclamation, faRedo, faTrashAlt, faPlay } from '@fortawesome/free-solid-svg-icons'
import ProgressBar from '@/components/Elements/ProgressBar.vue'

export default {
    name: 'CourseCard',
    props: {
        id: String,
        name: String,
        description: String,
        author: String,
        version: String,
        lessons: Number,
        tests: Number,
        tags: Array,
        progress: Number,
        favourite: Boolean
    },
    components: {
        Card,
        Button,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Tooltip,
        Tag,
        ProgressBar
    },
    icons: {
        faEllipsisV,
        faGlobe,
        faExclamation,
        faRedo,
        faTrashAlt,
        faPlay
    }
}
</script>

<style lang="scss">
.course-card {
    .el-card__body {
        padding: 0;
    }
}

.course-card__context-menu,
.course-card__name {
    display: inline-block;
}

.course-card__name {
    margin: 0;
}

.course-card__context-menu {
    float: right;

    &.el-menu.el-menu--horizontal {
        border: none;
    }

    .el-menu-item {
        border: none;
    }
}

.course-card__info {
    padding: $--card-padding;
}

.course-card__info__text {
    display: block;
    font-size: $--font-size-small;
    color: $--color-text-secondary;
}

.course-card__tags {
    margin-bottom: 0.5rem;

    .el-tag {
        margin-right: 0.5rem;

        &:last-child {
            margin-right: 0;
        }
    }
}

.course-card__footer {
    padding: $--card-padding;
    border-top: 1px solid $--card-border-color;
    display: flex;
}

.course-card__start-button {
    flex: 0 1 auto;

    &.el-button {
        padding: 0px 12px 0px 0px;
    }
}

.course-card__progress {
    flex: 1 0 auto;    
}
</style>
