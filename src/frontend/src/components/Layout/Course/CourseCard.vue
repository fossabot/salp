<template>
    <a href="#" class="course-card--link" @click="handleCardClick">
        <Card class="course-card" shadow="hover">
            <header slot="header" class="course-card__header">
                <h3 class="course-card__name">{{ name }}</h3>

                <div class="course-card__context-menu">
                    <Dropdown trigger="click">
                        <Button type="text" class="dropdown__trigger ignore-click">
                            <Icon icon="faEllipsisV"/>
                        </Button>
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
                <p>{{ description | truncate(140) }}</p>

                <div class="course-card__tags">
                    <Tag size="small" v-for="(tag, index) in tags" :key="index">{{ tag }}</Tag>
                </div>

                <span class="course-card__info__text" v-t="{path: 'Layout.Course.info.shortDescription.chaptersAndAssignments', args: {chapters, assignments}}"></span>
                <span class="course-card__info__text" v-t="{path: 'Layout.Course.info.shortDescription.authorAndVersion', args: {author, version}}"></span>
            </div>

            <div class="course-card__footer">
                <ProgressBar :progress="progress" class="course-card__progress"/>
            </div>
        </Card>
    </a>
</template>

<script>
import { Card, Button, Dropdown, DropdownMenu, DropdownItem, Tag } from 'element-ui'
import { faEllipsisV, faGlobe, faExclamation, faRedo, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ProgressBar from '@/components/Elements/ProgressBar.vue'

export default {
    name: 'CourseCard',
    props: {
        id: String,
        name: String,
        description: String,
        author: String,
        version: String,
        chapters: Number,
        assignments: Number,
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
        Tag,
        ProgressBar
    },
    icons: {
        faEllipsisV,
        faGlobe,
        faExclamation,
        faRedo,
        faTrashAlt
    },
    methods: {
        handleCardClick(event) {
            if (event.target.closest('.ignore-click')) {
                return
            }

            this.$emit('click', this.id)
        }
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

    .dropdown__trigger {
        padding: 0;
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

.course-card__progress {
    flex: 1 0 auto;
}
</style>
