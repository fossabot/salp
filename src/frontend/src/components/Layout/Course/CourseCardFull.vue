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
                    <li v-if="repositoryUrl">
                        <ExternalLink :href="repositoryUrl">
                            <Icon icon="faGlobe"/> {{ $t('Layout.Course.actions.openProjectPage') }}
                        </ExternalLink>
                    </li>
                    <li v-if="issuesUrl">
                        <ExternalLink :href="issuesUrl">
                            <Icon icon="faExclamation"/> {{ $t('Layout.Course.actions.reportIssue') }}
                        </ExternalLink>
                    </li>
                    <li v-if="homepage">
                        <ExternalLink :href="homepage">
                            <Icon icon="faUser"/> {{ $t('Layout.Course.actions.visitAuthorPage') }}
                        </ExternalLink>
                    </li>
                </ul>
            </nav>

            <div class="course-card__tags">
                <span class="course-card__info__text">Tags: </span><Tag size="small" v-for="(keyword, index) in keywords" :key="index">{{ keyword }}</Tag>
            </div>
        </div>
    </Card>
</template>

<script>
import { Card, Button, Tag } from 'element-ui'
import { faGlobe, faExclamation, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import ExternalLink from '@/components/Elements/ExternalLink.vue'

export default {
    name: 'CourseCardFull',
    props: {
        id: String,
        name: String,
        description: String,
        author: String,
        version: String,
        chapters: Array,
        tests: Number,
        keywords: Array,
        progress: Number,
        favourite: Boolean,
        repositoryUrl: String,
        homepage: String,
        issuesUrl: String
    },
    components: {
        Card,
        Button,
        Tag,

        ExternalLink
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
