<template>
    <div id="chapter-pagination">
        <Pagination
            layout="prev, pager, next"
            :page-count="routesCount"
            :current-page="initialPage"
            @current-change="handleCurrentPageChange"/>
    </div>
</template>

<script>
import { Pagination } from 'element-ui'

export default {
    name: 'ChapterPagination',
    props: {
        routes: Array
    },
    components: {
        Pagination
    },
    data() {
        return {
            initialPage: 0
        }
    },
    beforeMount() {
        // +1 because page counting starts at 1
        this.initialPage = 1 + this.routes.findIndex(r => r.name === this.$route.name)
    },
    computed: {
        routesCount() {
            return this.routes.length
        }
    },
    methods: {
        handleCurrentPageChange(newPage) {
            const route = this.routes[newPage - 1]
            this.$router.push(route)
        }
    }
}
</script>

<style lang="scss">
#chapter-pagination {
    text-align: center
}
</style>
