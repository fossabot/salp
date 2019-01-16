<template>
    <div class="course-content__container">
        <component :is="getCurrentLecture"></component>
        <div class="course-content__container__pagination__wrapper">
            <Pagination layout="prev, pager, next" :total="pages" :page-size="1" @current-change="handlePageChange"/>
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
import Quote from '../../ContentElements/Quote.vue'
import YouTube from '../../ContentElements/YouTube.vue'
import Table from '../../ContentElements/Table.vue'
import Code from '../../Elements/Code.vue'
import Lecture1 from '@/__mocks__/lectures/lecture1.vue'
import Lecture2 from '@/__mocks__/lectures/lecture2.vue'

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

        Lecture1,
        Lecture2,

        Card,
        Pagination
    },
    data() {
        return {
            chapters: [
                'Lecture1',
                'Lecture2'
            ],
            currentLecture: 0
        }
    },
    computed: {
        getCurrentLecture: function() {
            return this.chapters[this.currentLecture]
        },
        pages: function() {
            return this.chapters.length
        }
    },
    methods: {
        handlePageChange(page) {
            this.currentLecture = page - 1
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
