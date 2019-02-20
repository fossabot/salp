// a mixin to import all content elements
import { Card } from 'element-ui'
import Heading from '../components/ContentElements/Heading.vue'
import SimpleImage from '../components/ContentElements/SimpleImage.vue'
import AdvancedImage from '../components/ContentElements/AdvancedImage.vue'
import SimpleLink from '../components/ContentElements/SimpleLink.vue'
import SimpleText from '../components/ContentElements/SimpleText.vue'
import AppPreview from '../components/ContentElements/AppPreview.vue'
import SimpleVideo from '../components/ContentElements/SimpleVideo.vue'
import SimpleList from '../components/ContentElements/SimpleList.vue'
import SimpleListItem from '../components/ContentElements/SimpleListItem.vue'
import Quote from '../components/ContentElements/Quote.vue'
import YouTube from '../components/ContentElements/YouTube.vue'
import Table from '../components/ContentElements/Table.vue'
import InlineCode from '../components/ContentElements/InlineCode.vue'
import Code from '../components/ContentElements/Code'

export default {
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
    }
}
