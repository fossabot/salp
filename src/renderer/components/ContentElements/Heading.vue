<script>
export default {
    name: 'Heading',
    functional: true,
    props: {
        level: {
            type: Number,
            required: true
        }
    },
    render(createElement, context) {
        const { props, children } = context

        return createElement(
            'h' + props.level,
            {
                staticClass: `contentelement-heading contentelement-heading--h${props.level}`,
                style: {
                    marginBottom: 0
                }
            },
            children
        )
    }
}
</script>
