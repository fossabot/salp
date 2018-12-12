<script>
import { Card } from 'element-ui'
import SimpleImage from './SimpleImage.vue'
import SimpleText from './SimpleText.vue'

export default {
    name: 'AdvancedImage',
    functional: true,
    props: {
        src: {
            type: String,
            required: true
        },
        height: {
            type: String,
            default() {
                return 'auto'
            }
        },
        description: {
            type: String,
            required: true
        }
    },
    render(createElement, context) {
        const { props } = context

        return createElement(
            Card,
            {
                staticClass: `contentelement-advanced-image-card`,
                style: {
                    width: 'fit-content'
                },
                props: {
                    bodyStyle: {
                        width: 'min-content'
                    }
                }

            },
            [
                createElement(
                    SimpleImage,
                    {
                        staticClass: `contentelement-advanced-image`,
                        props: {
                            src: props.src,
                            height: props.height
                        }
                    }
                ),
                createElement(
                    SimpleText,
                    {
                        staticClass: `contentelement-advanced-image-text`
                    },
                    props.description
                )
            ]
        )
    }
}
</script>
