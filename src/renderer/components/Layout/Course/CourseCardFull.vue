<template>
    <Card class="course-card course-card--full" shadow="none">
        <header slot="header" class="course-card__header">
            <h1 class="course-card__name">{{ name }}</h1>

            <div class="course-card__context-menu">
                <Button type="text" class="dropdown__trigger">
                    <Icon icon="faTrashAlt"/> {{ $t('Layout.Course.actions.delete') }}
                </Button>
            </div>
        </header>

        <div class="course-card__info">
            <p>{{ description }}</p>

            <span class="course-card__info__text" v-t="{path: 'Layout.Course.info.shortDescription.authorAndVersion', args: {author, version}}"></span>

            <nav>
                <ul class="course-card__meta-menuicon-list">
                    <li><a href="#"><Icon icon="faGlobe"/> {{ $t('Layout.Course.actions.openProjectPage') }}</a></li>
                    <li><a href="#"><Icon icon="faExclamation"/> {{ $t('Layout.Course.actions.reportIssue') }}</a></li>
                    <li><a href="#"><Icon icon="faUser"/> {{ $t('Layout.Course.actions.visitAuthorPage') }}</a></li>
                </ul>
            </nav>

            <div class="course-card__tags">
                <span class="course-card__info__text">Tags: </span><Tag size="small" v-for="(tag, index) in tags" :key="index">{{ tag }}</Tag>
            </div>
        </div>
    </Card>
</template>

<script>
import { Card, Button, Tag } from 'element-ui'
import { faGlobe, faExclamation, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'CourseCardFull',
    props: {
        id: String,
        name: String,
        description: String,
        author: String,
        version: String,
        chapters: Number,
        tests: Number,
        tags: Array,
        progress: Number,
        favourite: Boolean
    },
    components: {
        Card,
        Button,
        Tag
    },
    icons: {
        faGlobe,
        faExclamation,
        faTrashAlt,
        faUser
    }
}
</script>

<style lang="scss">
.course-card.course-card--full {
    .el-card__header {
        border-bottom: none;
    }

    .course-card__info__text {
        margin-right: 1em;
    }

    .course-card__info__text,
    .el-tag {
        display: inline-block;
    }

    .course-card__meta-menuicon-list {
        list-style: none;
        padding: 0 1em;
    }
}
</style>
