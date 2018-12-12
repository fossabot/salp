<script>
import SimpleImage from './SimpleImage.vue'
import Heading from './Heading.vue'
import SimpleText from './SimpleText.vue'
import SimpleLink from './SimpleLink.vue'
import { Card } from 'element-ui'

export default {
    name: 'AppPreview',
    functional: true,
    components: {
        SimpleImage,
        Heading,
        SimpleText,
        SimpleLink,
        Card
    },
    props: {
        src: {
            type: String,
            default() {
                return 'image/default'
            }
        },
        height: {
            type: String
        },
        heading: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String,
            default() {
                return ''
            }
        }
    },
    render(createElement, context) {
        const { props } = context

        return createElement(
            Card,
            {
                staticClass: `contentelement-app-preview`
            },
            [
                createElement(
                    'div',
                    {
                        staticClass: `contentelement-app-preview-content-image__wrapper`
                    },
                    [
                        createElement(
                            SimpleImage,
                            {
                                staticClass: `contentelement-app-preview-image`,
                                props: {
                                    src: props.src,
                                    height: props.height
                                }
                            }
                        ),
                        createElement(
                            'div',
                            {
                                staticClass: `contentelement-app-preview-content__wrapper`
                            },
                            [
                                createElement(
                                    Heading,
                                    {
                                        staticClass: `contentelement-app-preview-content-heading`,
                                        props: {
                                            level: 2
                                        }
                                    },
                                    props.heading
                                ),
                                createElement(
                                    SimpleText,
                                    {
                                        staticClass: `contentelement-app-preview-content-description`
                                    },
                                    props.description
                                ),
                                createElement(
                                    SimpleLink,
                                    {
                                        staticClass: `contentelement-app-preview-content-link`,
                                        props: {
                                            url: props.url
                                        }
                                    }
                                )
                            ]
                        )
                    ]
                )
            ]
        )
    }
}
</script>
<style lang="scss">
.contentelement-app-preview {

    .contentelement-app-preview-content-image__wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .contentelement-app-preview-content__wrapper {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-left: 1em;
        }
    }
}
</style>
