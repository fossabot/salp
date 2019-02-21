<template>
    <main :id="courseId" class="course">
        <router-view/>

        <footer class="course-page-footer">
            <ChapterPagination :chapters="chapters"/>
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
        chapters: Object
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
