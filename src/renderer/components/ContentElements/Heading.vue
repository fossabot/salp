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
                staticClass: `contentelement-heading contentelement-heading--h${props.level}`
            },
            children
        )
    }
}
</script>

<style lang="scss">
.contentelement-heading {
    margin-top: 1em;
    margin-bottom: 0;
}
</style>
