<template>
    <main :id="courseId" class="course">
        <router-view/>

        <footer class="course-page-footer">
            <ChapterPagination :routes="routes"/>
        </footer>
    </main>
</template>

<script>
import ContentElements from '../mixins/content-elements'
import ChapterPagination from './ChapterPagination'

export default {
    name: 'Course',
    mixins: [ContentElements],
    props: {
        id: String,
        chapters: Object,
        assignments: Object,
        routes: Array
    },
    components: {
        ChapterPagination
    },
    computed: {
        courseId() {
            return this.id
        }
    }
}
</script>

<style lang="scss">
.course-page-footer {
    margin-top: 2rem;
}
</style>
