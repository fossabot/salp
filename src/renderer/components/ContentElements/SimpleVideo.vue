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
                style: {
                    width: '100%'
                },
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
