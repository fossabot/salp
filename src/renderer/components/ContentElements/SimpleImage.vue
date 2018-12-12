<script>
export default {
    name: 'SimpleImage',
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
        }
    },
    render(createElement, context) {
        const { props } = context

        return createElement(
            'img',
            {
                staticClass: `contentelement-image`,
                attrs: {
                    src: props.src
                },
                style: {
                    height: props.height
                }
            }
        )
    }
}
</script>
<style lang="scss">
.contentelement-image {
    object-fit: contain;
}
</style>
