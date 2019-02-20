<template>
    <div id="chapter-pagination">
        <Pagination layout="prev, pager, next" :page-count="chaptersCount" @current-change="handleCurrentPageChange"/>
    </div>
</template>

<script>
import { Pagination } from 'element-ui'

export default {
    name: 'ChapterPagination',
    props: {
        chapters: Object
    },
    components: {
        Pagination
    },
    computed: {
        chapterNames() {
            return Object.keys(this.chapters)
        },
        chaptersCount() {
            return this.chapterNames.length
        }
    },
    methods: {
        handleCurrentPageChange(newPage) {
            const name = this.chapterNames[newPage - 1]
            this.$router.push({ name })
        }
    }
}
</script>

<style lang="scss">
#chapter-pagination {
    text-align: center
}
</style>
