<script>
import { links } from 'salp'

export default {
    name: 'SimpleLink',
    functional: true,
    props: {
        href: {
            type: String,
            required: true
        }
    },
    render(createElement, context) {
        const { props, children } = context

        return createElement(
            'a',
            {
                staticClass: `contentelement-link`,
                on: {
                    click: () => {
                        links.openExternalLink(props.href)
                    }
                }
            },
            children
        )
    }
}
</script>

<style lang="scss">
.contentelement-link {
    margin-top: auto;

    &:hover {
        cursor: pointer;
    }
}
</style>
