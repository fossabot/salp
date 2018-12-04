<script>
export default {
    name: 'SimpleImage',
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
            'img',
            {
                staticClass: `contentelement-image`,
                attrs: {
                    src: props.src
                }
            }
        )
    }
}
</script>
