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
                            <DropdownItem v-if="repositoryUrl">
                                <ExternalLink :href="repositoryUrl">
                                    <Icon icon="faGlobe"/>
                                    {{ $t('Course.actions.openProjectPage') }}
                                </ExternalLink>
                            </DropdownItem>
                            <DropdownItem v-if="issuesUrl">
                                <ExternalLink :href="issuesUrl">
                                    <Icon icon="faExclamation"/>
                                    {{ $t('Course.actions.reportIssue') }}
                                </ExternalLink>
                            </DropdownItem>
                            <DropdownItem v-if="homepage">
                                <ExternalLink :href="homepage">
                                    <Icon icon="faUser"/>
                                    {{ $t('Course.actions.visitAuthorPage') }}
                                </ExternalLink>
                            </DropdownItem>
                            <DropdownItem>
                                <Icon icon="faTrashAlt"/> {{ $t('Course.actions.delete') }}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </header>

            <div class="course-card__info">
                <p>{{ description | truncate(140) }}</p>

                <div class="course-card__tags">
                    <Tag size="small" v-for="(keyword, index) in keywords" :key="index">{{ keyword }}</Tag>
                </div>

                <span class="course-card__info__text"
                      v-t="{path: 'Course.info.shortDescription.chaptersAndAssignments', args: {chapters: chaptersCount, assignments: assignmentsCount}}">
                </span>
                <span class="course-card__info__text" v-t="{path: 'Course.info.shortDescription.authorAndVersion', args: {author, version}}"></span>
            </div>
        </Card>
    </a>
</template>

<script>
import { Card, Button, Dropdown, DropdownMenu, DropdownItem, Tag } from 'element-ui'
import { faEllipsisV, faGlobe, faExclamation, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import ExternalLink from '@/components/Elements/ExternalLink.vue'

export default {
    name: 'CourseCard',
    props: {
        id: String,
        name: String,
        description: String,
        author: String,
        version: String,
        chapters: Array,
        assignments: Object,
        keywords: Array,
        favourite: Boolean,
        repositoryUrl: String,
        homepage: String,
        issuesUrl: String
    },
    components: {
        Card,
        Button,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Tag,
        ExternalLink
    },
    icons: {
        faEllipsisV,
        faGlobe,
        faExclamation,
        faTrashAlt,
        faUser
    },
    computed: {
        chaptersCount() {
            return this.chapters.length
        },
        assignmentsCount() {
            return Object.keys(this.assignments).length
        }
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
</style>
