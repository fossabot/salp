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
                staticClass: `contentelement-video controls`
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
