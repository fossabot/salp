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
import TheCourse from '$src/../packages/salp-course-example/dist/course'

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

        Card,
        Pagination
    },
    data() {
        return {
            lectures: [
                TheCourse.chapter1,
                TheCourse.chapter2,
                TheCourse.chapter3
            ],
            currentLecture: 0
        }
    },
    computed: {
        getCurrentLecture: function() {
            return this.lectures[this.currentLecture]
        },
        pages: function() {
            return this.lectures.length
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
