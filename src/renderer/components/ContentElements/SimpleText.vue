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

<style lang="scss">
.contentelement-text {
    margin-top: 1em;
    margin-bottom: 0;
}
</style>
