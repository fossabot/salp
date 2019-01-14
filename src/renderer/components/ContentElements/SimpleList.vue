<script>
export default {
    name: 'SimpleList',
    functional: true,
    props: {
        ordered: {
            type: Boolean,
            required: true
        }
    },
    render(createElement, { props, children }) {
        return createElement(
            props.ordered ? 'ol' : 'ul',
            {
                staticClass: 'contentelement-list'
            },
            children
        )
    }
}
</script>

<style lang="scss">
.contentelement-list {
    margin-bottom: 0;
}
</style>
