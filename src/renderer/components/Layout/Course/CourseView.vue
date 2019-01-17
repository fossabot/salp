<template>
    <div class="course-content__container">
        <component :is="currentChapter"></component>
        <div class="course-content__container__pagination__wrapper">
            <Pagination layout="prev, pager, next" :total="pagesCount" :page-size="1" @current-change="handlePageChange"/>
        </div>
    </div>
</template>

<script>
import Heading from '../../ContentElements/Heading.vue'
import SimpleImage from '../../ContentElements/SimpleImage.vue'
import AdvancedImage from '../../ContentElements/AdvancedImage.vue'
import SimpleLink from '../../ContentElements/SimpleLink.vue'
import SimpleText from '../../ContentElements/SimpleText.vue'
import AppPreview from '../../ContentElements/AppPreview.vue'
import SimpleVideo from '../../ContentElements/SimpleVideo.vue'
import SimpleList from '../../ContentElements/SimpleList.vue'
import SimpleListItem from '../../ContentElements/SimpleListItem.vue'
import Quote from '../../ContentElements/Quote.vue'
import YouTube from '../../ContentElements/YouTube.vue'
import Table from '../../ContentElements/Table.vue'
import InlineCode from '../../ContentElements/InlineCode.vue'
import Code from '../../Elements/Code.vue'
import TheCourse from '$src/../packages/salp-course-example'

import { Card, Pagination } from 'element-ui'

export default {
    name: 'CourseContent',
    props: {
        course: Object
    },
    components: {
        Heading,
        SimpleLink,
        SimpleText,
        SimpleImage,
        AdvancedImage,
        SimpleVideo,
        AppPreview,
        Quote,
        YouTube,
        Table,
        Code,
        SimpleList,
        SimpleListItem,
        InlineCode,

        Card,
        Pagination
    },
    data() {
        return {
            chapters: [
                TheCourse.chapter1,
                TheCourse.chapter2,
                TheCourse.chapter3
            ],
            currentChapterIndex: 0
        }
    },
    computed: {
        currentChapter: function() {
            return this.chapters[this.currentChapterIndex]
        },
        pagesCount: function() {
            return this.chapters.length
        }
    },
    methods: {
        handlePageChange(page) {
            this.currentChapterIndex = page - 1
        }
    }
}
</script>

<style lang="scss">
.course-content__container__pagination__wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1em;
}
</style>
