<template>
    <article :id="courseId" class="course">
        <router-view/>

        <footer class="course-page-footer">
            <ChapterPagination :chapters="chapters"/>
        </footer>
    </article>
</template>

<script>
import ContentElements from '../mixins/content-elements'
import ChapterPagination from './ChapterPagination'

export default {
    name: 'Course',
    mixins: [ContentElements],
    props: {
        name: String,
        chapters: Object
    },
    components: {
        ChapterPagination
    },
    computed: {
        courseId() {
            return 'course-' + this.name
        }
    }
}
</script>

<style lang="scss">
.course-page-footer {
    margin-top: 2rem;
}
</style>
