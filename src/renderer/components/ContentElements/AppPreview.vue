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
                        staticClass: `contentelement-app-preview-content-image__wrapper`,
                        style: {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }
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
                                staticClass: `contentelement-app-preview-content__wrapper`,
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    marginLeft: '1em'
                                }
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
