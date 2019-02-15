import { Card } from 'element-ui'
import Heading from './ContentElements/Heading.vue'
import SimpleImage from './ContentElements/SimpleImage.vue'
import AdvancedImage from './ContentElements/AdvancedImage.vue'
import SimpleLink from './ContentElements/SimpleLink.vue'
import SimpleText from './ContentElements/SimpleText.vue'
import AppPreview from './ContentElements/AppPreview.vue'
import SimpleVideo from './ContentElements/SimpleVideo.vue'
import SimpleList from './ContentElements/SimpleList.vue'
import SimpleListItem from './ContentElements/SimpleListItem.vue'
import Quote from './ContentElements/Quote.vue'
import YouTube from './ContentElements/YouTube.vue'
import Table from './ContentElements/Table.vue'
import InlineCode from './ContentElements/InlineCode.vue'
import Code from './ContentElements/Code'

// include actual course content
export default async function CourseContent() {
    const contentScript = await import(
        /* webpackChunkName: 'course-content' */
        /* webpackMode: 'lazy' */
        /* webpackPrefetch: true */
        'content.js'
    )

    const chapters = contentScript.default

    return {
        name: 'CourseContent',
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
            SimpleList,
            SimpleListItem,
            InlineCode,
            Code,

            Card
        },
        render(createElement) {
            const chaptersElements = Object.values(chapters).map(createElement)

            return createElement('div', chaptersElements)
        }
    }
}
