<script>
export default {
    name: 'SimpleVideo',
    functional: true,
    props: {
        src: {
            type: String,
            required: true
        }
    },
    render(createElement, context) {
        const { props } = context

        return createElement(
            'video',
            {
                staticClass: `contentelement-video`,
                attrs: {
                    controls: true,
                    controlsList: 'nodownload'
                }
            },
            [
                createElement(
                    'source',
                    {
                        attrs: {
                            src: props.src
                        }
                    }
                )
            ]
        )
    }
}
</script>

<style lang="scss">
.contentelement-video {
    width: 100%;
}
</style>
