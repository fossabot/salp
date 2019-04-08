<template>
    <Card class="course-card course-card--full" shadow="none">
        <header slot="header" class="course-card__header">
            <h1 class="course-card__name">{{ name }}</h1>
        </header>

        <div class="course-card__info">
            <p>{{ description }}</p>

            <span class="course-card__info__text" v-t="{path: 'Course.info.shortDescription.authorAndVersion', args: {author, version}}"></span>

            <nav>
                <ul class="course-card__meta-menuicon-list">
                    <li v-if="repositoryUrl">
                        <ExternalLink :href="repositoryUrl">
                            <Icon icon="faGlobe"/> {{ $t('Course.actions.openProjectPage') }}
                        </ExternalLink>
                    </li>
                    <li v-if="issuesUrl">
                        <ExternalLink :href="issuesUrl">
                            <Icon icon="faExclamation"/> {{ $t('Course.actions.reportIssue') }}
                        </ExternalLink>
                    </li>
                    <li v-if="homepage">
                        <ExternalLink :href="homepage">
                            <Icon icon="faUser"/> {{ $t('Course.actions.visitAuthorPage') }}
                        </ExternalLink>
                    </li>
                </ul>
            </nav>

            <div class="course-card__tags">
                <span class="course-card__info__text">Tags: </span><Tag size="small" v-for="(keyword, index) in keywords" :key="index">{{ keyword }}</Tag>
            </div>
            <div class="course-card__start-button">
                <Button type="primary" :round="true" @click="handleStartClick">Go</Button>
            </div>
        </div>
    </Card>
</template>

<script>
import { Card, Tag, Button } from 'element-ui'
import { faGlobe, faExclamation, faUser } from '@fortawesome/free-solid-svg-icons'
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
        favourite: Boolean,
        repositoryUrl: String,
        homepage: String,
        issuesUrl: String
    },
    components: {
        Card,
        Tag,
        Button,

        ExternalLink
    },
    icons: {
        faGlobe,
        faExclamation,
        faUser
    },
    methods: {
        handleStartClick() {
            this.$router.push('content/chapter/')
        }
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

    .course-card__start-button {
        margin-top: 1em;
    }
}
</style>
