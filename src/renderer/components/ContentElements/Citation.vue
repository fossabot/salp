<script>
import SimpleText from './SimpleText.vue'
import SimpleLink from './SimpleLink.vue'

export default {
    name: 'Citation',
    functional: true,
    components: {
        SimpleText,
        SimpleLink
    },
    props: {
        cite: {
            type: String,
            required: true
        },
        source: {
            type: String,
            required: true
        }
    },
    render(createElement, context) {
        const { props } = context

        return createElement(
            'blockquote',
            {
                staticClass: `contentelement-cite`
            },
            [
                createElement(
                    'div',
                    {
                        staticClass: `contentelement-cite__flex-wrapper`
                    },
                    [
                        createElement(
                            'div',
                            {
                                staticClass: `contentelement-cite__left-border`
                            }
                        ),
                        createElement(
                            'div',
                            {
                                staticClass: `contentelement-cite-content__wrapper`
                            },
                            [
                                createElement(
                                    SimpleText,
                                    `"${props.cite}"`
                                ),
                                createElement(
                                    'cite',
                                    {
                                        staticClass: `contentelement-cite__cite`
                                    },
                                    [
                                        createElement(
                                            SimpleLink,
                                            {
                                                staticClass: `contentelement-cite__cite__link`,
                                                props: {
                                                    url: props.source
                                                }
                                            }
                                        )
                                    ]
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
.contentelement-cite {
    margin: 1em 0 1em 2em;

    .contentelement-cite__flex-wrapper {
        display: flex;
        flex-direction: row;

        .contentelement-cite__left-border {
            background-color: $--color-primary;
            flex-basis: 0.8%;
        }

        .contentelement-cite-content__wrapper {
            padding-left: 1em;

            .contentelement-cite__cite::before {
                display: inline-block;
                content: '—';
            }
        }
    }
}
</style>
