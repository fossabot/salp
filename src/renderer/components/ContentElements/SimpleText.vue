<script>
export default {
    name: 'SimpleText',
    functional: true,
    render(createElement, context) {
        const { children } = context

        return createElement(
            'p',
            {
                staticClass: `contentelement-text`
            },
            children
        )
    }
}
</script>
